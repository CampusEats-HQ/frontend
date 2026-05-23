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
