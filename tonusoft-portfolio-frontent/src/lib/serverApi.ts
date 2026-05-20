const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'https://api.tonusoft.com/api/v1';

export async function fetchFromApi<T>(path: string): Promise<T | null> {
  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      cache: 'no-store',
      headers: {
        'cache-control': 'no-cache',
      },
    });

    if (!response.ok) {
      return null;
    }

    const json = await response.json().catch(() => null);
    if (!json) {
      return null;
    }

    return (json.data ?? json) as T;
  } catch {
    return null;
  }
}
