const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:4002/api/v1';

export async function fetchFromApi<T>(path: string): Promise<T | null> {
  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      cache: 'force-cache',
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
