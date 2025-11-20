//src/api/umedidas.js
import { apiGet, apiPost, apiPut, apiDelete } from "./http";

export function getUnidadesMedida() {
  return apiGet("/umedidas");
}

export function getUnidadMedida(id) {
  return apiGet(`/umedidas/${id}`);
}

export function createUnidadMedida(data) {
  return apiPost("/umedidas", data);
}

// si tuvieras editar
export function updateUnidadMedida(id, data) {
  return apiPut(`/umedidas/${id}`, data);
}

// si tuvieras eliminar
export function deleteUnidadMedida(id) {
  return apiDelete(`/umedidas/${id}`);
}

export function getColumns() {
  return [
    { key: 'id',         label: 'ID' },
    { key: 'nombre',     label: 'Nombre' },
    { key: 'abreviado',  label: 'Abreviado' },
    { key: 'created_at', label: 'Creado' },
    { key: 'updated_at', label: 'Actualizado' },
  ];
}

export function getDefaultVisibility() {
  return {
    id: false,
    nombre: true,
    abreviado: true,
    updated_at: false,
    created_at: false,
  };
}