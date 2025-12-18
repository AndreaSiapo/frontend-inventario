//src/api/lotes.js
import { apiGet, apiPost, apiPut, apiDelete } from "./http";

export async function getLotes({ search = '', perPage = 10, page = 1, orderBy = 'id', orderDir = 'asc' } = {}) {
  const json = await apiGet("/lotes");
  const allData = json.data ?? json;

  // Filtro simple por search (si quieres puedes mejorarlo)
  let filtered = allData.filter(item => 
    item.nombre.toLowerCase().includes(search.toLowerCase())
  );

  // Ordenamiento simple
  filtered.sort((a, b) => {
    const valA = a[orderBy];
    const valB = b[orderBy];
    if (valA < valB) return orderDir === 'asc' ? -1 : 1;
    if (valA > valB) return orderDir === 'asc' ? 1 : -1;
    return 0;
  });

  const totalCount = filtered.length;

  // Paginación
  const start = (page - 1) * perPage;
  const end = start + perPage;
  const pagedData = filtered.slice(start, end);

  // Construir links para la paginación
  const totalPages = Math.ceil(totalCount / perPage);
  const links = [];
  if (page > 1) links.push({ label: "pagination.previous", url: page - 1, active: false });
  for (let p = 1; p <= totalPages; p++) {
    links.push({ label: p.toString(), url: p, active: p === page });
  }
  if (page < totalPages) links.push({ label: "pagination.next", url: page + 1, active: false });

  return {
    data: pagedData,
    total: totalCount,
    from: start + 1,
    to: Math.min(end, totalCount),
    links,
    filters: { search, perPage, page, orderBy, orderDir },
    columns: getColumns(),
    defaultVisibility: getDefaultVisibility()
  };
}

export async function getLotesFull({ search = '', orderBy = 'id', orderDir = 'asc' } = {}) {
  const json = await apiGet("/lotes");
  const allData = json.data ?? json;
  const normalize = (v) => (v ?? "").toString().toLowerCase();

  // Filtro por search (opcional)
  let filtered = allData.filter(item =>
    normalize(item.nombre).includes(normalize(search)),
  );

  // Ordenamiento
  filtered.sort((a, b) => {
    const valA = a[orderBy];
    const valB = b[orderBy];
    if (valA < valB) return orderDir === 'asc' ? -1 : 1;
    if (valA > valB) return orderDir === 'asc' ? 1 : -1;
    return 0;
  });

  return {
    data: filtered,
    total: filtered.length,
    filters: { search, orderBy, orderDir }
  };
}

export function getLote(id) {
  return apiGet(`/lotes/${id}`);
}

export function createLote(data) {
  return apiPost("/lotes", data);
}

// si tuvieras editar
export function updateLote(id, data) {
  return apiPut(`/lotes/${id}`, data);
}

// si tuvieras eliminar
export function deleteLote(id) {
  return apiDelete(`/lotes/${id}`);
}

export function getColumns() {
  return [
    { key: 'id',               label: 'ID' },
    { key: 'codigo',           label: 'Codigo de Barra' },
    { key: 'nombre',           label: 'Nombre' },
    { key: 'detalle',          label: 'Detalle' },
    { key: 'ubicacion',        label: 'Ubicación' },
    { key: 'referencia',       label: 'Referencias' },
    { key: 'capacidad',        label: 'capacidad' },
    { key: 'tamano',           label: 'Tamaño' },
    { key: 'created_at',       label: 'Creado' },
    { key: 'updated_at',       label: 'Actualizado' },
  ];
}

export function getDefaultVisibility() {
  return {
    id:         false,
    codigo:     true,
    nombre:     true,
    detalle:    false,
    ubicacion:  false,
    referencia: false,
    capacidad:  false,
    tamano:     false,
    updated_at: false,
    created_at: false,
  };
}