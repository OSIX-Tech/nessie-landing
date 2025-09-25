# Configuración de Vercel

## Variables de Entorno Requeridas

Para que el frontend funcione correctamente en producción, configura esta variable de entorno en Vercel:

### 1. En el Panel de Vercel:
- Ve a tu proyecto
- **Settings** → **Environment Variables**
- Agrega nueva variable:

```
Name: VITE_API_BASE_URL
Value: https://tu-backend.railway.app
Environment: Production (o todas)
```

### 2. Ejemplo de URL:
Si tu backend de Railway está en: `https://nessie-backend-production.up.railway.app`

Entonces configuras:
```
VITE_API_BASE_URL=https://nessie-backend-production.up.railway.app
```

### 3. Redeploy:
Después de configurar la variable, haz un redeploy del proyecto en Vercel.

## Endpoints que se usarán:
- `POST ${VITE_API_BASE_URL}/api/waitlist/register`
- `GET ${VITE_API_BASE_URL}/api/waitlist/count`
- `GET ${VITE_API_BASE_URL}/api/waitlist/confirm`

## Configuración de CORS en el Backend:
Tu backend Express debe permitir solicitudes desde el dominio de Vercel:

```javascript
app.use(cors({
  origin: [
    'https://tu-dominio.vercel.app',
    'https://*.vercel.app'
  ],
  credentials: true
}));
```