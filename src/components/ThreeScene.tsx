import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

const ThreeScene: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mountRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x000000)

    // Camera setup - Isometric view
    const aspect = mountRef.current.clientWidth / mountRef.current.clientHeight
    const d = 15
    const camera = new THREE.OrthographicCamera(
      -d * aspect,
      d * aspect,
      d,
      -d,
      0.1,
      1000
    )
    
    // Position camera for isometric view with better angle
    camera.position.set(30, 25, 30)
    camera.lookAt(0, 0, 0)

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    mountRef.current.appendChild(renderer.domElement)

    // Create multiple grid layers for depth
    const gridSize = 60
    const divisions = 30
    
    // Main grid
    const gridHelper = new THREE.GridHelper(gridSize, divisions, 0xffffff, 0xffffff)
    gridHelper.material.opacity = 0.15
    gridHelper.material.transparent = true
    scene.add(gridHelper)
    
    // Secondary grid below for depth effect
    const gridHelper2 = new THREE.GridHelper(gridSize * 0.8, divisions * 0.8, 0xffffff, 0xffffff)
    gridHelper2.material.opacity = 0.05
    gridHelper2.material.transparent = true
    gridHelper2.position.y = -10
    scene.add(gridHelper2)

    // Add stronger lines for main axes
    const axisMaterial = new THREE.LineBasicMaterial({ color: 0xffffff, opacity: 0.8, transparent: true })
    const fadeMaterial = new THREE.LineBasicMaterial({ color: 0xffffff, opacity: 0.3, transparent: true })
    
    // X axis line
    const xGeometry = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(-gridSize/2, 0, 0),
      new THREE.Vector3(gridSize/2, 0, 0)
    ])
    const xLine = new THREE.Line(xGeometry, axisMaterial)
    scene.add(xLine)
    
    // Z axis line (appears as Y in grid view)
    const zGeometry = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 0, -gridSize/2),
      new THREE.Vector3(0, 0, gridSize/2)
    ])
    const zLine = new THREE.Line(zGeometry, axisMaterial)
    scene.add(zLine)
    
    // Add vertical lines for more depth
    for (let i = -20; i <= 20; i += 10) {
      if (i !== 0) {
        const vertGeometry = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(i, -5, 0),
          new THREE.Vector3(i, 5, 0)
        ])
        const vertLine = new THREE.Line(vertGeometry, fadeMaterial)
        scene.add(vertLine)
        
        const vertGeometry2 = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(0, -5, i),
          new THREE.Vector3(0, 5, i)
        ])
        const vertLine2 = new THREE.Line(vertGeometry2, fadeMaterial)
        scene.add(vertLine2)
      }
    }

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)
      renderer.render(scene, camera)
    }
    animate()

    // Handle window resize
    const handleResize = () => {
      if (!mountRef.current) return
      const width = mountRef.current.clientWidth
      const height = mountRef.current.clientHeight
      const aspect = width / height
      camera.left = -d * aspect
      camera.right = d * aspect
      camera.top = d
      camera.bottom = -d
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }
    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      mountRef.current?.removeChild(renderer.domElement)
      renderer.dispose()
    }
  }, [])

  return <div ref={mountRef} className="absolute inset-0" />
}

export default ThreeScene