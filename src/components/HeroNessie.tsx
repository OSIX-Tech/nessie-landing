import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

const HeroNessie: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mountRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x87CEEB) // Sky blue
    
    // Camera setup
    const aspect = mountRef.current.clientWidth / mountRef.current.clientHeight
    const camera = new THREE.PerspectiveCamera(50, aspect, 0.1, 1000)
    camera.position.set(15, 10, 20)
    camera.lookAt(0, 2, 0)

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.shadowMap.enabled = true
    mountRef.current.appendChild(renderer.domElement)

    // Simple lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
    directionalLight.position.set(10, 20, 10)
    directionalLight.castShadow = true
    scene.add(directionalLight)

    // Water - opaque surface
    const waterGeometry = new THREE.BoxGeometry(50, 2, 50)
    const waterMaterial = new THREE.MeshPhongMaterial({
      color: 0x004466,
      shininess: 100,
      specular: 0x111122
    })
    const water = new THREE.Mesh(waterGeometry, waterMaterial)
    water.position.y = -1
    water.receiveShadow = true
    scene.add(water)

    // Nessie - Improved cartoon structure
    const nessie = new THREE.Group()
    
    // Better green material
    const nessieMaterial = new THREE.MeshToonMaterial({
      color: 0x2d5a3f
    })

    // Cola (tail) - mostly underwater, just tip showing
    const tailCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-12, -3, 0),
      new THREE.Vector3(-10, -2, 0),
      new THREE.Vector3(-8, -1, 0),
      new THREE.Vector3(-6, -1.5, 0)
    ])
    const tailGeometry = new THREE.TubeGeometry(tailCurve, 20, 1.5, 8, false)
    const tail = new THREE.Mesh(tailGeometry, nessieMaterial)
    tail.castShadow = true
    nessie.add(tail)
    
    // Tail tip - just breaking surface
    const tailTipGeometry = new THREE.ConeGeometry(1.5, 3, 8)
    const tailTip = new THREE.Mesh(tailTipGeometry, nessieMaterial)
    tailTip.position.set(-12, -2, 0)
    tailTip.rotation.z = -Math.PI / 4
    tailTip.castShadow = true
    nessie.add(tailTip)

    // Main body underwater (mostly hidden)
    const bodyGeometry = new THREE.SphereGeometry(5, 16, 12)
    const body = new THREE.Mesh(bodyGeometry, nessieMaterial)
    body.position.set(-3, -4, 0)
    body.scale.set(1.5, 1, 1.2)
    nessie.add(body)

    // Joroba (hump) - just the top showing
    const humpGeometry = new THREE.SphereGeometry(3.5, 20, 16)
    const hump = new THREE.Mesh(humpGeometry, nessieMaterial)
    hump.position.set(0, -1, 0)
    hump.scale.set(1.2, 1.5, 1.2)
    hump.castShadow = true
    nessie.add(hump)
    
    // Second smaller hump - barely visible
    const hump2Geometry = new THREE.SphereGeometry(2.5, 16, 12)
    const hump2 = new THREE.Mesh(hump2Geometry, nessieMaterial)
    hump2.position.set(-3, -2, 0)
    hump2.scale.set(1, 1.2, 1)
    hump2.castShadow = true
    nessie.add(hump2)

    // Cuello (neck) - shorter, mostly above water
    const neckCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(2, -1.5, 0),
      new THREE.Vector3(3, 0, 0),
      new THREE.Vector3(4, 1, 0),
      new THREE.Vector3(5, 2, 0),
      new THREE.Vector3(6, 2.5, 0)
    ])
    const neckGeometry = new THREE.TubeGeometry(neckCurve, 20, 1.8, 12, false)
    const neck = new THREE.Mesh(neckGeometry, nessieMaterial)
    neck.castShadow = true
    nessie.add(neck)

    // Cabeza (head) - lower position
    const headGeometry = new THREE.SphereGeometry(2.5, 16, 12)
    const head = new THREE.Mesh(headGeometry, nessieMaterial)
    head.position.set(6, 2.5, 0)
    head.scale.set(0.9, 1, 0.8)
    head.castShadow = true
    nessie.add(head)
    
    // Snout
    const snoutGeometry = new THREE.ConeGeometry(1, 2, 8)
    const snout = new THREE.Mesh(snoutGeometry, nessieMaterial)
    snout.position.set(7.5, 2.5, 0)
    snout.rotation.z = -Math.PI / 2
    snout.scale.set(0.7, 1, 0.8)
    nessie.add(snout)

    // Eyes - adjusted for lower head position
    const eyeMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff })
    const eyeGeometry = new THREE.SphereGeometry(0.4, 10, 8)
    
    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial)
    leftEye.position.set(6.8, 3, -0.9)
    nessie.add(leftEye)
    
    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial)
    rightEye.position.set(6.8, 3, 0.9)
    nessie.add(rightEye)

    // Pupils
    const pupilMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 })
    const pupilGeometry = new THREE.SphereGeometry(0.2, 8, 6)
    
    const leftPupil = new THREE.Mesh(pupilGeometry, pupilMaterial)
    leftPupil.position.set(7, 3, -0.9)
    nessie.add(leftPupil)
    
    const rightPupil = new THREE.Mesh(pupilGeometry, pupilMaterial)
    rightPupil.position.set(7, 3, 0.9)
    nessie.add(rightPupil)
    
    // Small nostrils
    const nostrilGeometry = new THREE.SphereGeometry(0.1, 6, 4)
    const nostrilMaterial = new THREE.MeshBasicMaterial({ color: 0x1a1a1a })
    
    const leftNostril = new THREE.Mesh(nostrilGeometry, nostrilMaterial)
    leftNostril.position.set(8.2, 2.7, -0.2)
    nessie.add(leftNostril)
    
    const rightNostril = new THREE.Mesh(nostrilGeometry, nostrilMaterial)
    rightNostril.position.set(8.2, 2.7, 0.2)
    nessie.add(rightNostril)

    scene.add(nessie)

    // Animation variables
    const clock = new THREE.Clock()
    
    const animate = () => {
      requestAnimationFrame(animate)
      
      const time = clock.getElapsedTime()
      
      // Floating motion like swimming
      nessie.position.y = Math.sin(time * 0.5) * 0.3
      nessie.rotation.y = Math.sin(time * 0.3) * 0.05
      
      // Head movement
      head.rotation.y = Math.sin(time * 0.8) * 0.2
      head.position.y = 2.5 + Math.sin(time * 0.7) * 0.2
      
      // Tail swaying
      tailTip.rotation.z = -Math.PI / 4 + Math.sin(time * 0.6) * 0.2
      
      renderer.render(scene, camera)
    }
    animate()

    // Handle window resize
    const handleResize = () => {
      if (!mountRef.current) return
      const width = mountRef.current.clientWidth
      const height = mountRef.current.clientHeight
      camera.aspect = width / height
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

  return <div ref={mountRef} className="h-screen w-full" />
}

export default HeroNessie