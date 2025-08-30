export function getApiBaseUrl(): string {
  if (typeof window !== 'undefined') {
    const fromEnv = process.env.NEXT_PUBLIC_API_BASE_URL;
    if (fromEnv && fromEnv.length > 0) return fromEnv;
  }
  return 'http://54.206.125.253:5000';
}

export function getStoredAuthToken(): string | null {
  if (typeof window === 'undefined') return null;
  try {
    return localStorage.getItem('auth_token');
  } catch {
    return null;
  }
}

export async function apiFetch<T = any>(path: string, options: RequestInit = {}): Promise<T> {
  const baseUrl = getApiBaseUrl();
  const url = path.startsWith('http') ? path : `${baseUrl}${path.startsWith('/') ? '' : '/'}${path}`;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  };

  const token = getStoredAuthToken();
  if (token) {
    (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
  }

  // Only log in development
  if (process.env.NODE_ENV === 'development') {
    console.log('Making request to:', url);
    console.log('Headers:', headers);
    console.log('Options:', options);
  }

  try {
    const resp = await fetch(url, {
      ...options,
      headers,
      mode: 'cors'
    });

    if (process.env.NODE_ENV === 'development') {
      console.log('Response status:', resp.status);
      console.log('Response headers:', Object.fromEntries(resp.headers.entries()));
    }

    const contentType = resp.headers.get('content-type') || '';
    const isJson = contentType.includes('application/json');
    const payload = isJson ? await resp.json() : await resp.text();

    if (!resp.ok) {
      const message = (isJson && payload && (payload.error || payload.message)) || resp.statusText || 'Request failed';
      throw new Error(message);
    }

    return payload as T;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Fetch error:', error);
    }
    throw error;
  }
}


