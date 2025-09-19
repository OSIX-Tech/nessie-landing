# Encargo: Adaptación Mobile-Only — Sección “Casos de uso” (SaaS técnico)

**IMPORTANTE:**  
- **No modifiques el diseño de escritorio (≥ 1024px).**  
- La adaptación es **exclusiva para móviles** (≤ 768px).  
- Mantén intacta la API de datos, props y estructura general usada en desktop.  
- Si necesitas estilos, condicionalos con breakpoints (`md:`, `lg:`) para no afectar desktop.

---

## Objetivo
Convertir la sección “Casos de uso” en **móvil** a un **carrusel de tarjetas swipeables** con **scroll-snap**, mostrando **un perfil por pantalla** (tipo slides/stories), con navegación fluida y CTA claro. En **desktop** debe verse **exactamente igual que hoy**.

---

## UX (Mobile)
- **Estructura por card (1 por perfil):**
  1) Badge + highlight (beneficio corto),  
  2) H2 del caso,  
  3) Copy breve (2–3 líneas),  
  4) Bullets (máx. 6, textos cortos),  
  5) Tarjeta de métricas (placeholder de gráfico + 3 KPIs),  
  6) CTA ancho (botón primario).
- **Carrusel horizontal** con **scroll-snap** (nativo, sin librerías):  
  - 1 card visible por vez (min-width ~ 90–100% del viewport).  
  - **Dots** de paginación (abajo) que reflejan la card activa.  
  - **Swipe** nativo; flechas **opcionales** y ocultas en mobile por defecto.
- **Deep-link**: `?usecase=<id>` abre la card correspondiente (scroll hasta ella).  
- **Sticky header opcional (mobile)**: label + título/subtítulo compactos.

---

## Comportamiento
- **Autofoco visual**: card centrada en el viewport al soltar (scroll-snap).  
- **Activación por visibilidad**: cuando una card está ≥ 60% visible →  
  - activar estado “activa” (para dots y animaciones leves),  
  - **lazy-load** de métricas (renderizar KPIs/gráfico).  
- **Dots**: tap salta a la card (scroll suave).  
- **History**: al cambiar card, usar `history.replaceState` para actualizar `?usecase=` (opcional).

---

## Accesibilidad (a11y)
- El carrusel: `role="region"` + `aria-label="Casos de uso"`.  
- Dots: `role="tablist"`, cada dot `role="tab"` con `aria-selected`.  
- Card activa: `aria-current="true"`.  
- Teclado (si aplica): ← → cambia card; Enter/Space activa dot.  
- **Contraste** ≥ 4.5:1; respetar `prefers-reduced-motion` (sin animaciones).

---

## Rendimiento
- **Lazy-load** de métricas (IntersectionObserver, umbral 0.5–0.6).  
- Diferir cualquier animación pesada; usar opacidad/translate suave solo si no hay reduced-motion.  
- Evitar reflow forzado y listeners en scroll continuo; usar IO.

---

## Restricciones (críticas)
- **No tocar desktop**: nada en ≥ `lg:` debe cambiar.  
- **Mobile-only**: usa utilidades `md:hidden`/`md:flex` o clases condicionadas para mostrar la **vista swipeable** solo en mobile y mantener la vista actual para desktop.  
- **Sin dependencias** externas (no libs de carrusel).  
- Mantener props/contratos existentes del componente.

---

## Data model (referencia)
*(Usa el modelo actual. Si hace falta ejemplo para pruebas, sigue este esquema)*

```yaml
use_cases:
  - id: "estudiantes"
    badge: { text: "Personal", highlight: "87% menos tiempo" }
    h2: "Estudio inteligente con IA"
    copy: "Transforma PDFs largos en resúmenes estructurados con citas verificables."
    bullets:
      - "Resúmenes jerárquicos"
      - "Citas trazables"
      - "Fichas por tema"
      - "Conceptos clave"
      - "Integración gestores"
      - "Preguntas de repaso"
    kpis:
      - { value: "87%", label: "Tiempo ahorrado" }
      - { value: "156", label: "Papers procesados" }
      - { value: "340", label: "Notas generadas" }
    cta: { label: "Probar demo estudiantil", href: "/demo/estudiantes" }
