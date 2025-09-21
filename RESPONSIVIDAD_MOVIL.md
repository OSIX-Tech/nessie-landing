## Guía de Responsividad Móvil — Nessie Landing

Esta guía documenta el estado actual y las mejores prácticas para optimizar la experiencia móvil de la landing de Nessie. Incluye recomendaciones globales, pautas de rendimiento/accesibilidad y un enfoque detallado en la sección de Features.

### Objetivos (KPIs UX/Perf)
- Tiempo hasta interacción percibida bajo red móvil: < 2.5s en 4G.
- CLS estable (< 0.1) en primeras pantallas.
- Targets táctiles mínimos: ≥ 44x44 px.
- Inputs en iOS sin zoom inesperado (font-size ≥ 16px).
- Animaciones respetan `prefers-reduced-motion`.

## 1) Fundamentos y configuración base

### Viewport y tipografías
`index.html` ya declara un viewport correcto. Para evitar zoom en iOS cuando se enfoca un `input`, asegúrate de que el tamaño de letra sea ≥ 16px en móvil.

Ejemplo (Tailwind):
```tsx
// src/components/Wishlist.tsx — input email (ejemplo de clases)
<input
  className="text-[16px] sm:text-[15px] md:text-base ..."
  inputMode="email"
  autoComplete="email"
  // ...
/>
```

### Safe areas (notch iOS)
Aplicar `env(safe-area-inset-*)` a barras fijas y considerar un spacer acorde.
```css
/* index.css (o un css modular) */
@media (max-width: 640px) {
  .safe-top {
    padding-top: env(safe-area-inset-top);
  }
}
```
```tsx
// src/components/MobileNavbar.tsx
<nav className="md:hidden fixed top-0 left-0 right-0 z-50 safe-top" />
```

### Anclas con navbar fija (offset)
Evita que títulos queden ocultos al navegar con `scrollIntoView` usando `scroll-margin-top` en secciones ancladas.
```tsx
// Ejemplo aplicado a secciones con id
<section id="product" className="scroll-mt-16 md:scroll-mt-24 ..." />
<section id="features" className="scroll-mt-16 md:scroll-mt-24 ..." />
```

## 2) Rendimiento móvil

### Fondo con patrón (background-attachment)
`background-attachment: fixed` puede causar jank en iOS/Android. Usa `scroll` en móvil y reduce densidad del patrón.
```css
/* src/index.css */
@media (max-width: 640px) {
  body {
    background-attachment: scroll; /* en lugar de fixed */
    background-size: 80px 80px, 80px 80px, 100% 100%;
  }
}
```

### Blur/sombras costosas
Reduce `backdrop-filter: blur()` y sombras en móvil.
```css
@media (max-width: 640px) {
  .m-blur-soft { backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px); }
  .m-shadow-soft { box-shadow: 0 6px 18px rgba(0,0,0,0.25); }
}
```
Usa estas utilidades en navbar/tarjetas solo en móvil.

### Prefiere animaciones baratas y respeta reduced-motion
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation: none !important; transition: none !important; }
}
```

### Lazy-load de videos (sección Product)
Evita precargar videos en móvil. Carga `src` solo cuando la tarjeta sea visible (IntersectionObserver) y usa `preload="none"`.
```tsx
// Pseudocódigo simplificado
const canAutoplay = window.matchMedia('(min-width: 768px)').matches;

<video
  preload={canAutoplay ? 'metadata' : 'none'}
  ref={el => videoRefs.current[index] = el}
  playsInline
  muted
>
  {/* No establecer <source src> inicialmente en móvil */}
</video>

// En IO callback (visible >= 0.6):
if (!video.src) video.src = feature.video.src_mp4;
```

## 3) Accesibilidad táctil y formularios

### Targets táctiles ≥ 44x44
```tsx
// Botón hamburguesa — src/components/MobileNavbar.tsx
<button className="min-w-[44px] min-h-[44px] w-11 h-11 ..." />

// Iconos del footer: aumenta padding clicable
<a className="inline-flex items-center justify-center w-11 h-11" aria-label="GitHub"> ... </a>
```

### Inputs amigables para móvil
- `inputMode="email"`, `autoComplete="email"`.
- Evitar validaciones intrusivas; mostrar mensajes compactos.
- Tamaño de fuente ≥ 16px en iOS.

## 4) Sección de Features — Enfoque detallado

La sección de Features es un carrusel responsive que muestra 1/2/3 tarjetas según el viewport y autoavanza cada 7s. En móvil, el UX y la perf pueden mejorar con los siguientes ajustes.

### 4.1 UX de carrusel (móvil)

- Apilar controles e indicar claramente el swipe (ya hay hint). Mantener visible una “pista” de la siguiente tarjeta puede mejorar descubribilidad.
```tsx
// Cambiar el ancho de tarjeta en móvil para mostrar un peek
<div className="flex-shrink-0 w-[88%] sm:w-[calc(50%-8px)] lg:w-[calc(33.333%-16px)]" />

// Añadir padding lateral al carrusel para centrar la tarjeta
<div className="px-4">{/* contenedor del carrusel */}</div>
```

- Umbral de swipe sensible: distancia > 48px y opcionalmente velocidad.
```tsx
// Simplificado
const SWIPE_PX = 48;
const isLeft = distance > SWIPE_PX; const isRight = distance < -SWIPE_PX;
```

- Dots accesibles: ya existen, añade `aria-controls` hacia un `id` del carrusel y `aria-current`.
```tsx
<button aria-controls="features-carousel" aria-current={index===currentGroup} />
```

### 4.2 Accesibilidad de tarjetas

- Títulos como encabezados claros (`h3`) y descripciones con contraste AA.
- Foco visible en elementos interactivos dentro de la tarjeta.
- Roles/aria en controles (prev/next/dots):
```tsx
<button role="tab" aria-selected={index===currentGroup} aria-label={`Ir a grupo ${index+1}`} />
```

### 4.3 Rendimiento (móvil)

- Desactivar efectos 3D/hover en móviles (puntero grueso o sin hover). Actualmente `FeatureCard3D` siempre adjunta listeners de mouse; condicionar por media query.
```tsx
// src/components/FeatureCard3D.tsx — dentro de useEffect
useEffect(() => {
  const supportsHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (!supportsHover) return; // No adjuntar listeners en móvil
  // ... listeners mousemove/mouseleave
}, []);
```

- Reducir transformaciones y sombras en móvil:
```css
@media (max-width: 640px) {
  .card-3d-mobile { transform: none !important; box-shadow: 0 8px 18px rgba(0,0,0,0.25); }
}
```

- Auto-play y reduced-motion:
```tsx
// src/components/Features.tsx
const prefersReducedMotion = typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const [isAutoPlaying, setIsAutoPlaying] = useState(!prefersReducedMotion);
```

### 4.4 Alternativa simple: scroll-snap (solo móvil)

Para simplificar en móviles, puedes ofrecer una variante con `overflow-x: auto` + `scroll-snap`, manteniendo el sistema actual en tablet/desktop.
```tsx
// Contenedor móvil
<div className="md:hidden overflow-x-auto snap-x snap-mandatory px-4" style={{ WebkitOverflowScrolling: 'touch' }}>
  <div className="flex gap-3">
    {features.map((f, i) => (
      <div key={i} className="snap-center w-[88%] flex-shrink-0">
        <FeatureCard3D feature={f} />
      </div>
    ))}
  </div>
</div>
```

## 5) Anclas y navegación (Desktop/Móvil)

Para evitar que las secciones queden ocultas por la navbar fija cuando se usa `scrollIntoView`, añade margen de scroll en las secciones con `id` y/o usa un helper con offset si prefieres JS.

```ts
// Helper opcional (si decides usarlo)
export function scrollToIdWithOffset(id: string, offset = 96) {
  const el = document.getElementById(id);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top: y, behavior: 'smooth' });
}
```

## 6) Checklist de QA en dispositivos

- iPhone SE/8 (320–375px):
  - Inputs ≥ 16px, sin zoom al enfocar.
  - Botones ≥ 44x44 y fácilmente clicables.
  - Carrusel de Features muestra pista de la siguiente tarjeta.
  - Animaciones suaves sin stutter; reduced-motion respetado.
- Android gama media (360–412px):
  - Sin saltos de layout al abrir menú móvil.
  - Blur/sombras no penalizan scroll.
- iPad/Tablet (768px):
  - 2 tarjetas visibles correctamente alineadas.
  - Dots y flechas navegables con teclado.

## 7) Cambios sugeridos por archivo (resumen)

- `src/components/Wishlist.tsx`
  - `input` email: `text-[16px]` en móvil; `inputMode`, `autoComplete`.
  - Botón con altura ≥ 44px.

- `src/index.css`
  - En móvil: `background-attachment: scroll` y `background-size` mayor.
  - Media query para reducir blur/sombras.
  - Bloque `prefers-reduced-motion`.

- `src/components/MobileNavbar.tsx`
  - `safe-top` con `env(safe-area-inset-top)`.
  - Botón hamburguesa con `min-w/min-h` 44px.

- `src/components/Features.tsx`
  - Peek de tarjeta en móvil (`w-[88%]` + `px-4`).
  - Auto-play desactivado si `prefers-reduced-motion`.
  - Dots con `aria-controls` y `aria-current`.

- `src/components/FeatureCard3D.tsx`
  - Adjuntar listeners solo si `(hover: hover) and (pointer: fine)`.
  - Reducir transformaciones/sombras en móvil.

- `src/components/ProductSection.tsx`
  - Lazy-load real de videos (no `src` inicial en móvil, `preload="none"`).

---

Si quieres, puedo aplicar estos cambios en una rama con commits atómicos por archivo para que puedas revisarlos y hacer rollback selectivo.


