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
    { key: 'productoId',       label: 'ID Producto' },
    { key: 'producto',         label: 'Producto' },
    { key: 'codigoLote',       label: 'Codigo de Lote' },
    { key: 'codigoBar',        label: 'Codigo de Barras' },
    { key: 'fechaVencimiento', label: 'fechaVencimiento' },
    { key: 'cantidadInicial',  label: 'Cant. Inicial' },
    { key: 'cantidadActual',   label: 'Cant. Actual' },
    { key: 'costoUnitario',    label: 'Costo Unitario' },
    { key: 'costoTotal',       label: 'Costo Total' },
    { key: 'fechaIngreso',     label: 'Fecha Ingreso' },
    { key: 'actualizadoEn',    label: 'Actualizado' },
    { key: 'creadoEn',         label: 'Creado' },
  ];
}

export function getDefaultVisibility() {
  return {
    id:               false,
    productoId:       false,
    producto:         false,
    codigoLote:       true,
    codigoBar:        true,
    fechaVencimiento: true,
    cantidadInicial:  true,
    cantidadActual:   true,
    costoUnitario:    true,
    costoTotal:       true,
    fechaIngreso:     true,
    actualizadoEn:    false,
    creadoEn:         false,
  };
}