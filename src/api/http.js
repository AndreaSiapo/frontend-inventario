const BASE_URL = "http://localhost:8080/api";

export async function apiGet(endpoint) {
  const res = await fetch(`${BASE_URL}${endpoint}`);
  if (!res.ok) throw new Error("Error en petición GET");
  return res.json();
}

export async function apiPost(endpoint, data) {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error en petición POST");
  return res.json();
}

export async function apiPut(endpoint, data) {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error en petición PUT");
  return res.json();
}

export async function apiDelete(endpoint) {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Error en petición DELETE");
  const text = await res.text();
  return text ? JSON.parse(text) : { success: true };
}
