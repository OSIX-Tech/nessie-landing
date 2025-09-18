# Guía Rápida: Integración de Waitlist con Servicios Externos

## 🎯 Opciones de Integración (De más rápida a más completa)

### 1. **EmailJS** (10 minutos) - Sin Backend
**Mejor para**: MVP rápido, sin base de datos

```bash
npm install @emailjs/browser
```

**Pasos**:
1. Crear cuenta en [emailjs.com](https://www.emailjs.com/)
2. Configurar template de email
3. Obtener Service ID, Template ID y Public Key
4. Actualizar `.env`:
```env
VITE_EMAILJS_SERVICE_ID=service_xxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxx
VITE_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxx
```

**Pros**: Súper rápido, no necesitas backend
**Contras**: No guardas datos, solo recibes emails

---

### 2. **ConvertKit** (20 minutos) - Email Marketing
**Mejor para**: Marketing automation, newsletters

**Pasos**:
1. Cuenta en [convertkit.com](https://convertkit.com/)
2. Crear Form > Landing Page
3. Obtener Form ID y API Key
4. Usar componente `WishlistWithConvertKit.tsx`

**Pros**: Automation, sequences, segmentación
**Contras**: $29/mes después de 1000 suscriptores

---

### 3. **Waitlist API** (30 minutos) - Especializado
**Mejor para**: Features de waitlist completas

**Pasos**:
1. Registrarse en [getwaitlist.com](https://getwaitlist.com/)
2. Crear waitlist
3. Obtener Waitlist ID
4. Usar componente `WishlistWithWaitlistAPI.tsx`

**Pros**:
- Widget embebible listo
- Referral system incluido
- Analytics de waitlist
- Posición en cola

**Contras**: $19/mes después del trial

---

### 4. **Airtable + Zapier** (15 minutos) - No-Code
**Mejor para**: Gestión visual de datos

**Pasos**:
1. Crear tabla en Airtable con columnas: Email, Fecha, Source
2. Generar API key de Airtable
3. Integración directa:

```javascript
const AIRTABLE_API_KEY = 'keyxxxxxxxxx'
const AIRTABLE_BASE_ID = 'appxxxxxxxxx'
const AIRTABLE_TABLE_NAME = 'Waitlist'

const response = await fetch(
  `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}`,
  {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      fields: {
        Email: email,
        'Signup Date': new Date().toISOString(),
        Source: 'Landing Page'
      }
    })
  }
)
```

**Pros**: Base de datos visual, fácil exportación
**Contras**: Límite de 1200 registros gratis

---

## 🚀 Implementación Recomendada (EmailJS + Airtable)

### Paso 1: Instalar dependencias
```bash
npm install @emailjs/browser dotenv
```

### Paso 2: Configurar variables de entorno
```env
# .env.local
VITE_EMAILJS_SERVICE_ID=service_xxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxx
VITE_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxx
VITE_AIRTABLE_API_KEY=keyxxxxxxxxx
VITE_AIRTABLE_BASE_ID=appxxxxxxxxx
```

### Paso 3: Crear servicio unificado
```typescript
// src/services/waitlist.service.ts
import emailjs from '@emailjs/browser'

export class WaitlistService {
  // Enviar email de confirmación
  static async sendConfirmationEmail(email: string) {
    return emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      { user_email: email },
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    )
  }

  // Guardar en Airtable
  static async saveToDatabase(email: string) {
    return fetch(
      `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/Waitlist`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_AIRTABLE_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fields: {
            Email: email,
            'Fecha': new Date().toISOString(),
            'Fuente': window.location.href
          }
        })
      }
    )
  }

  // Método principal
  static async subscribe(email: string) {
    const results = await Promise.allSettled([
      this.sendConfirmationEmail(email),
      this.saveToDatabase(email)
    ])

    const errors = results.filter(r => r.status === 'rejected')
    if (errors.length > 0) {
      console.error('Algunos servicios fallaron:', errors)
    }

    return results.every(r => r.status === 'fulfilled')
  }
}
```

### Paso 4: Actualizar componente Wishlist
```typescript
import { WaitlistService } from '../services/waitlist.service'

// En handleSubmit:
try {
  const success = await WaitlistService.subscribe(email)
  if (success) {
    setIsSubscribed(true)
  }
} catch (error) {
  setEmailError('Error al registrar')
}
```

---

## ⚡ Script de Implementación Rápida (5 minutos)

```bash
# 1. Instalar EmailJS
npm install @emailjs/browser

# 2. Crear archivo de configuración
echo "VITE_EMAILJS_SERVICE_ID=
VITE_EMAILJS_TEMPLATE_ID=
VITE_EMAILJS_PUBLIC_KEY=" > .env.local

# 3. Actualizar gitignore
echo ".env.local" >> .gitignore

# 4. Implementar
# - Ir a emailjs.com
# - Crear cuenta gratis
# - Email Services > Add New Service > Gmail
# - Email Templates > Create Template
# - Copiar IDs a .env.local
# - Reemplazar Wishlist.tsx con la versión integrada

# 5. Deploy
npm run build
# Subir a Vercel/Netlify con las variables de entorno
```

---

## 📊 Comparación Rápida

| Servicio | Tiempo Setup | Costo | Límite Gratis | Best For |
|----------|--------------|-------|---------------|----------|
| EmailJS | 10 min | Gratis | 200/mes | MVP rápido |
| ConvertKit | 20 min | $29/mes | 1000 subs | Marketing |
| Waitlist API | 30 min | $19/mes | 1000 users | Features completas |
| Airtable | 15 min | Gratis | 1200 rows | Gestión visual |
| Mailchimp | 25 min | Gratis | 500 contacts | Email campaigns |

## 🎯 Mi Recomendación

Para empezar rápido: **EmailJS + Airtable**
- EmailJS para confirmaciones automáticas
- Airtable para almacenar y gestionar la lista
- Total setup: 25 minutos
- Costo: $0 hasta 1200 usuarios

Cuando crezcas, migrar a: **ConvertKit** o **Waitlist API**