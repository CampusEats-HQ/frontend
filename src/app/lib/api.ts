const BASE_URL = (import.meta.env.VITE_API_URL as string) ?? 'https://staging-api.campus-eats.me/api/v1'

export const WS_URL = BASE_URL.replace(/^http/, 'ws').replace(/\/v1$/, '')

// Each portal stores its token independently so a customer session
// never bleeds into vendor/rider/admin requests.
const KEYS = {
  customer: 'ce_token',
  vendor:   'ce_vendor_token',
  rider:    'ce_rider_token',
  admin:    'ce_admin_token',
} as const

type Portal = keyof typeof KEYS

function portalFromPath(): Portal {
  const path = window.location.pathname
  if (path.startsWith('/vendor')) return 'vendor'
  if (path.startsWith('/rider'))  return 'rider'
  if (path.startsWith('/admin'))  return 'admin'
  return 'customer'
}

function getToken(): string | null {
  return localStorage.getItem(KEYS[portalFromPath()])
}

export function setToken(token: string, portal: Portal = 'customer'): void {
  localStorage.setItem(KEYS[portal], token)
}

export function clearToken(portal: Portal = 'customer'): void {
  localStorage.removeItem(KEYS[portal])
}

export function clearAllTokens(): void {
  Object.values(KEYS).forEach((k) => localStorage.removeItem(k))
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getToken()
  const headers: Record<string, string> = {
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers as Record<string, string>),
  }

  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json'
  }

  const res = await fetch(`${BASE_URL}${path}`, { ...options, headers })

  if (!res.ok) {
    if (res.status === 401) {
      clearToken(portalFromPath())
    }
    const err = await res.json().catch(() => ({}))
    const fallback: Record<number, string> = {
      401: 'Incorrect email or password.',
      403: 'You do not have permission to do that.',
      404: 'Not found.',
      409: 'This account already exists.',
      422: 'Please check your details and try again.',
      500: 'Something went wrong on our end. Please try again.',
    }
    throw new Error(err.error ?? err.message ?? fallback[res.status] ?? 'Something went wrong. Please try again.')
  }

  const text = await res.text()
  return text ? (JSON.parse(text) as T) : (null as T)
}

export const api = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, body?: unknown) =>
    request<T>(path, {
      method: 'POST',
      body: body instanceof FormData ? body : JSON.stringify(body),
    }),
  put: <T>(path: string, body?: unknown) =>
    request<T>(path, {
      method: 'PUT',
      body: body instanceof FormData ? body : JSON.stringify(body),
    }),
  patch: <T>(path: string, body?: unknown) =>
    request<T>(path, {
      method: 'PATCH',
      body: body instanceof FormData ? body : JSON.stringify(body),
    }),
  del: <T>(path: string) => request<T>(path, { method: 'DELETE' }),
}
