# Configuración CORS para Backend de Railway

## Problema Actual
```
Access to fetch at 'https://nessie-landingpage-waitlist-backend-production.up.railway.app/api/waitlist/*' 
from origin 'https://nessie-landing-git-feature-backend-i-c8d0eb-osix-techs-projects.vercel.app' 
has been blocked by CORS policy
```

## Solución Requerida

En tu **backend Express de Railway**, configura CORS con estos orígenes:

### Configuración Completa:
```javascript
const cors = require('cors');

app.use(cors({
  origin: [
    // Rama actual de feature
    'https://nessie-landing-git-feature-backend-i-c8d0eb-osix-techs-projects.vercel.app',
    
    // Patrón para todas las ramas de Vercel
    'https://nessie-landing-*.vercel.app',
    
    // Desarrollo local
    'http://localhost:5173',
    'http://localhost:3000'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

### Configuración Simplificada (Recomendada):
```javascript
const cors = require('cors');

app.use(cors({
  origin: function (origin, callback) {
    // Permite requests sin origin (mobile apps, postman, etc.)
    if (!origin) return callback(null, true);
    
    // Lista de dominios permitidos
    const allowedOrigins = [
      'https://nessie-landing-git-feature-backend-i-c8d0eb-osix-techs-projects.vercel.app',
      'http://localhost:5173',
      'http://localhost:3000'
    ];
    
    // Permite cualquier subdominio de vercel.app que contenga "nessie-landing"
    if (origin.includes('.vercel.app') && origin.includes('nessie-landing')) {
      return callback(null, true);
    }
    
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true
}));
```

### Configuración Temporal para Testing:
```javascript
// ⚠️ SOLO PARA TESTING - No usar en producción
app.use(cors({
  origin: '*',
  credentials: false
}));
```

## Pasos para Implementar:

1. **Actualizar tu backend de Railway** con una de las configuraciones de arriba
2. **Hacer deploy** del backend actualizado
3. **Probar** el formulario en Vercel

## Verificación:

Después de actualizar el backend, estos endpoints deberían funcionar:
- `GET https://nessie-landingpage-waitlist-backend-production.up.railway.app/api/waitlist/count`
- `POST https://nessie-landingpage-waitlist-backend-production.up.railway.app/api/waitlist/register`

## Endpoint Adicional Requerido:

El frontend también necesita este endpoint para guardar datos de la encuesta:
- `PUT https://nessie-landingpage-waitlist-backend-production.up.railway.app/api/waitlist/:id`

### Body esperado para PUT:
```json
{
  "user_type": "estudiante|investigador|profesional|empresa|otros",
  "expected_price": "5-15|15-30|30-60|60-100|100-150|150+"
}
```

### Respuesta esperada del POST /register:
```json
{
  "id": 123,
  "message": "Usuario registrado exitosamente"
}
```

## Notas Importantes:

- El error ocurre en el **preflight request** (OPTIONS)
- Asegúrate de que tu backend responde correctamente a peticiones OPTIONS
- El header `Access-Control-Allow-Origin` debe incluir exactamente el dominio de Vercel