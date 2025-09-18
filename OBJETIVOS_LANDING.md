# Especificación — Carrusel horizontal de features con video (mobile-first)

## Objetivo
Presentar las funcionalidades clave del SaaS en **tarjetas deslizables** (swipe) con **video corto** por feature, optimizado para móviles, claro, rápido y medible.

---

## User stories
- **US1 – Descubrimiento:** Como visitante móvil, quiero **deslizar** entre features para entender rápidamente qué hace el producto.
- **US2 – Profundizar:** Como visitante, quiero **reproducir un micro-video** por feature sin salir de la página.
- **US3 – Control:** Quiero **pausar/reanudar** el video fácilmente y **silenciar** por defecto.
- **US4 – Orientación:** Quiero ver **indicadores de progreso** (dots) y el **título** de la feature actual.
- **US5 – Conversión:** Quiero un **CTA visible** para probar la funcionalidad o pedir demo.
- **US6 – Rendimiento:** Quiero que los videos **carguen solo cuando los necesito** (lazy) para que no se trabe el scroll.

---

## Arquitectura de la sección
- **Header:** Título + subtítulo corto.
- **Controles:**  
  - Botones Prev/Next (opcional en mobile; visibles en tablet/desktop).  
  - **Dots** de paginación (mostrando la tarjeta activa).
- **Carrusel (scroll horizontal, snap):** Lista de tarjetas.
- **Tarjeta de feature (por ítem):**
  - Ícono/emoji o pictograma.
  - Título (H3) y **copy corto** (≤ 160 caracteres).
  - **Chips** de capacidades (3–5).
  - **Video preview** (muted, playsinline, loop, poster; 6–12s).
  - **CTA primario** (“Probar”, “Ver demo”, “Empezar gratis”) y CTA secundario (opcional).

---

## Comportamiento e interacción
- **Desplazamiento principal:** Scroll horizontal con **snap-center** (tarjeta centrada al soltar).
- **Autoplay de video:**  
  - Solo **la tarjeta visible** (≥60% en viewport) **se reproduce** (muted, loop).  
  - Al perder visibilidad, **pausa** y hace `currentTime = 0`.
- **Lazy load:**  
  - `loading="lazy"` en `<video poster>`.  
  - `preload="metadata"`; reemplazar `src` desde `data-src` cuando el ítem esté a ≤ 1 tarjeta de distancia (IntersectionObserver).
- **Gestos:** Swipe nativo. No bloquear el scroll vertical.
- **Dots:** Clic o tap salta a la tarjeta correspondiente (scroll suave).
- **Accesos directos:** Prev/Next desplazan **exactamente una tarjeta**.
- **Estados de video:**  
  - **Muted** por defecto; botón **unmute** dentro del video.  
  - Tap en el video → **pausa/reanuda** (mostrar overlay breve “Pausado/Reproduciendo”).

---

## Accesibilidad (a11y)
- **Roles/labels:**  
  - Contenedor: `role="region"`, `aria-label="Carrusel de funcionalidades"`.  
  - Dots: `role="tablist"`, cada dot `role="tab"` con `aria-selected`.  
  - Tarjeta activa: `aria-current="true"`.
- **Teclado:**  
  - Flechas izquierda/derecha → desplazan 1 tarjeta.  
  - Enter/Space sobre dot → activa tarjeta.  
- **Contraste:** ≥ 4.5:1 para texto/íconos.  
- **Texto alternativo:** `aria-label`/`title` para íconos; `aria-description` breve para el video.  
- **Reduce motion:** Si `prefers-reduced-motion`, desactivar auto-scroll/animaciones.

---

## Contenido y microcopy
- **Título de sección:** “Explora nuestras funcionalidades” (máx. 60 caracteres).  
- **Subtítulo:** “Desliza para ver demos cortas en vídeo.”  
- **Tarjetas (recomendado 4–6):**  
  - **H3:** 30–40 caracteres.  
  - **Descripción:** 120–160 caracteres, 1 frase de valor.  
  - **Chips:** sustantivos claros (2–3 palabras).  
  - **Video:** 6–12s, 9:16 o 4:5 para móvil, sin texto importante pegado a bordes.  
- **CTA primario:** “Probar esta funcionalidad” o “Empezar gratis”.

---

## Data model (contenido)
```yaml
section:
  title: "Explora nuestras funcionalidades"
  subtitle: "Desliza para ver demos cortas en vídeo."
  cta_global: null  # opcional

features:
  - id: "investigacion-instantanea"
    icon: "🔎"
    title: "Investigación Instantánea"
    description: "Analiza miles de documentos en segundos y encuentra conexiones ocultas."
    chips: ["Búsqueda semántica", "Referencias cruzadas", "Resúmenes automáticos"]
    video:
      poster: "/videos/investigacion/poster.jpg"
      src_mp4: "/videos/investigacion/preview.mp4"
      duration_s: 9
    cta:
      label: "Probar esta funcionalidad"
      href: "/demo/investigacion"
  - id: "compliance-automatizado"
    icon: "🛡️"
    title: "Compliance Automatizado"
    description: "Auditoría continua con alertas en tiempo real y audit trail completo."
    chips: ["Detección proactiva", "Alertas en tiempo 
    Velocidad extrema
    Respuestas en milisegundos con caché inteligente y arquitectura optimizada.
    
    Explorar
    real", "Audit trail"]
    video:
      poster: "/videos/compliance/poster.jpg"
      src_mp4: "/videos/compliance/preview.mp4"
      duration_s: 8
    cta:
      label: "Ver demo"
      href: "/demo/compliance"
