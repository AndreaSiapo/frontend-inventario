//src/api/productoLotes.js
import { apiGet, apiPost, apiPut, apiDelete } from "./http";

export async function getProductoLotes({ search = '', perPage = 10, page = 1, orderBy = 'id', orderDir = 'asc' } = {}) {
  const json = await apiGet("/producto_lotes");
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

export async function getProductoLotesFull({ search = '', orderBy = 'id', orderDir = 'asc' } = {}) {
  const json = await apiGet("/producto_lotes");
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

export function getProductoLote(id) {
  return apiGet(`/producto_lotes/${id}`);
}

export function createProductoLote(data) {
  return apiPost("/producto_lotes", data);
}

// si tuvieras editar
export function updateProductoLote(id, data) {
  return apiPut(`/producto_lotes/${id}`, data);
}

// si tuvieras eliminar
export function deleteProductoLote(id) {
  return apiDelete(`/producto_lotes/${id}`);
}

export function getColumns() {
  return [
    { key: 'id',               label: 'ID' },
    { key: 'loteId',           label: 'ID Lote' },
    { key: 'codigoLote',       label: 'Codigo Lote' },
    { key: 'codigoBar',        label: 'Codigo de Barras' },
    { key: 'productoId',       label: 'ID Producto' },
    { key: 'producto',         label: 'Producto' },
    { key: 'cantidadInicial',  label: 'Cant. Inicial' },
    { key: 'cantidadActual',   label: 'Cant. Actual' },
    { key: 'fechaVencimiento', label: 'fechaVencimiento' },
    { key: 'costoUnitario',    label: 'Costo Unitario' },
    { key: 'actualizadoEn',    label: 'Actualizado' },
    { key: 'creadoEn',         label: 'Creado' },
  ];
}

export function getDefaultVisibility() {
  return {
    id:               false,
    loteid:           true,
    codigoLote:       false,
    codigoBar:        true,
    productoId:       false,
    producto:         true,
    cantidadInicial:  true,
    cantidadActual:   true,
    fechaVencimiento: true,
    costoUnitario:    true,
    actualizadoEn:    false,
    creadoEn:         false,
  };
}