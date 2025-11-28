// src/api/https.js
const BASE_URL = "http://localhost:8080/api";

async function request(method, endpoint, data = null) {
  try {
    const options = {
      method,
      headers: { "Content-Type": "application/json" },
    };

    if (data) options.body = JSON.stringify(data);

    const res = await fetch(`${BASE_URL}${endpoint}`, options);

    // ❌ Si el endpoint no existe (404)
    if (res.status === 404) {
      throw new Error(`El API ${endpoint} no existe o no está disponible.`);
    }

    // ❌ Otros errores del servidor
    if (!res.ok) {
      throw new Error(`Error en el API: ${res.status}`);
    }

    // Si no hay body
    const text = await res.text();
    return text ? JSON.parse(text) : {};
  } 
  catch (error) {
    // 💥 ESTE error se va a atrapar en tus modales y tablas
    throw error;
  }
}

// Funciones finales
export const apiGet    = (e)       => request("GET", e);
export const apiPost   = (e, d)    => request("POST", e, d);
export const apiPut    = (e, d)    => request("PUT", e, d);
export const apiDelete = (e)       => request("DELETE", e);
