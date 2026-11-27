const BASE_URL = "/api";

interface Envelope<T> {
  data: T;
  requestId: string;
}

function envelopeId(): string {
  return Math.random().toString(36).slice(2);
}

/** Minimal JSON fetch wrapper used by every typed API module. */
export async function apiGet<T>(path: string): Promise<Envelope<T>> {
  const response = await fetch(`${BASE_URL}${path}`);
  if (!response.ok) {
    throw new Error(`GET ${path} failed with ${response.status}`);
  }
  const data = (await response.json()) as T;
  return { data, requestId: envelopeId() };
}

export async function apiPost<T>(path: string, body: unknown): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    throw new Error(`POST ${path} failed with ${response.status}`);
  }
  return (await response.json()) as T;
}

export async function apiPatch<T>(path: string, body: unknown): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    throw new Error(`PATCH ${path} failed with ${response.status}`);
  }
  return (await response.json()) as T;
}

export async function apiDelete(path: string): Promise<void> {
  const response = await fetch(`${BASE_URL}${path}`, { method: "DELETE" });
  if (!response.ok) {
    throw new Error(`DELETE ${path} failed with ${response.status}`);
  }
}
