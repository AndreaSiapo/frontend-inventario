//src/api/marcas.js
import { apiGet, apiPost, apiPut, apiDelete } from "./http";

export async function getMarcas({ search = '', perPage = 10, page = 1, orderBy = 'id', orderDir = 'asc' } = {}) {
  const json = await apiGet("/marcas");
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

export async function getMarcasFull({ search = '', orderBy = 'id', orderDir = 'asc' } = {}) {
  const json = await apiGet("/marcas");
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

export function getMarca(id) {
  return apiGet(`/marcas/${id}`);
}

export function createMarca(data) {
  return apiPost("/marcas", data);
}

// si tuvieras editar
export function updateMarca(id, data) {
  return apiPut(`/marcas/${id}`, data);
}

// si tuvieras eliminar
export function deleteMarca(id) {
  return apiDelete(`/marcas/${id}`);
}

export function getColumns() {
  return [
    { key: 'id',            label: 'ID' },
    { key: 'nombre',        label: 'Nombre' },
    { key: 'abreviado',     label: 'Abreviado' },
    { key: 'ruc',           label: 'RUC' },
    { key: 'descripcion',   label: 'Descripcion' },
    { key: 'tipo',          label: 'Tipo' },
    { key: 'actualizadoEn', label: 'Actualizado' },
    { key: 'creadoEn',      label: 'Creado' },
  ];
}

export function getDefaultVisibility() {
  return {
    id:            false,
    nombre:        true,
    abreviado:     false,
    ruc:           false,
    descripcion:   false,
    tipo:          false,
    creadoEn:      false,
    actualizadoEn: false,
  };
}