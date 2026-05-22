const BASE_URL = (import.meta.env.VITE_API_URL as string) ?? 'https://staging-api.campus-eats.me/api/v1'

export const WS_URL = BASE_URL.replace(/^http/, 'ws').replace(/\/v1$/, '')

export function setToken(token: string): void {
  localStorage.setItem('ce_token', token)
}

export function getToken(): string | null {
  return localStorage.getItem('ce_token')
}

export function clearToken(): void {
  localStorage.removeItem('ce_token')
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
      clearToken()
    }
    const err = await res.json().catch(() => ({ message: res.statusText }))
    throw new Error(err.message ?? `Request failed with status ${res.status}`)
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
