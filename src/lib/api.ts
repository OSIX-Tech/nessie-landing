// Configuración de la API del backend
const API_BASE_URL = 'http://localhost:3002'

export const API_ENDPOINTS = {
  register: `${API_BASE_URL}/api/waitlist/register`,
  count: `${API_BASE_URL}/api/waitlist/count`,
  confirm: `${API_BASE_URL}/api/waitlist/confirm`
}

// Función helper para realizar peticiones a la API
export const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  const response = await fetch(endpoint, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  })

  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`)
  }

  return response.json()
}