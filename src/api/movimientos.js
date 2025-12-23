//src/api/movimientos.js
import { apiGet, apiPost, apiPut, apiDelete } from "./http";

export async function getMovimientos({ search = '', perPage = 10, page = 1, orderBy = 'id', orderDir = 'asc' } = {}) {
  const json = await apiGet("/movimientos");
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

export async function getMovimientosFull({ search = '', orderBy = 'id', orderDir = 'asc' } = {}) {
  const json = await apiGet("/movimientos");
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

export function getMovimiento(id) {
  return apiGet(`/movimientos/${id}`);
}

export function createMovimiento(data) {
  return apiPost("/movimientos", data);
}

// si tuvieras editar
export function updateMovimiento(id, data) {
  return apiPut(`/movimientos/${id}`, data);
}

// si tuvieras eliminar
export function deleteMovimiento(id) {
  return apiDelete(`/movimientos/${id}`);
}

export function getColumns() {
  return [
    { key: 'id',               label: 'ID' },
    { key: 'tipoMovimiento',   label: 'Tipo de Movimiento' },
    { key: 'tipoDocumentoId',  label: 'ID Tipo de Documentos' },
    { key: 'tipoDocumento',    label: 'Tipo de Documentos' },
    { key: 'bodegaId',         label: 'ID Bodega' },
    { key: 'bodega',           label: 'Bodega' },
    { key: 'proveedorId',      label: 'ID Proveedor' },
    { key: 'proveedor',        label: 'Proveedor' },
    { key: 'destinatarioId',   label: 'ID Destinatario' },
    { key: 'destinatario',     label: 'Destinatario' },
    { key: 'fecha',            label: 'Fecha' },
    { key: 'observacion',      label: 'Observación' },
    { key: 'naturaleza',       label: 'Naturaleza' },
    { key: 'creadoEn',         label: 'Creado' },
    { key: 'actualizadoEn',    label: 'Actualizado' },
  ];
}

export function getDefaultVisibility() {
  return {
    id:                 false,
    tipoMovimiento:     true,//
    tipoDocumentoId:    false,//
    tipoDocumento:      true,
    bodegaId:           false,//
    bodega:             true,
    proveedorId:        false,//
    proveedor:          true,
    destinatarioId:     false,//
    destinatario:       true,
    fecha:              true,
    observacion:        false,
    naturaleza:         true,
    actualizadoEn:      false,
    creadoEn:           false,
  };
}