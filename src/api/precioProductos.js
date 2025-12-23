//src/api/precioProductos.js
import { apiGet, apiPost, apiPut, apiDelete } from "./http";

export async function getPrecioProductos({ search = '', perPage = 10, page = 1, orderBy = 'id', orderDir = 'asc' } = {}) {
  const json = await apiGet("/precio_producto");
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

export async function getPrecioProductosFull({ search = '', orderBy = 'id', orderDir = 'asc' } = {}) {
  const json = await apiGet("/precio_producto");
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

export function getPrecioProducto(id) {
  return apiGet(`/precio_producto/${id}`);
}

export function createPrecioProducto(data) {
  return apiPost("/precio_producto", data);
}

// si tuvieras editar
export function updatePrecioProducto(id, data) {
  return apiPut(`/precio_producto/${id}`, data);
}

// si tuvieras eliminar
export function deletePrecioProducto(id) {
  return apiDelete(`/precio_producto/${id}`);
}

export function getColumns() {
  return [
    { key: 'id',                  label: 'ID' },
    { key: 'idProductoProveedor', label: 'ID Producto Proveedor' },
    { key: 'productoProveedor',   label: 'Producto Proveedor' },
    { key: 'fechaDesde',          label: 'Desde' },
    { key: 'fechaHasta',          label: 'Hasta' },
    { key: 'precioCompra',        label: 'Precio de Compra' },
    { key: 'precioVenta',         label: 'Precio de Venta' },
    { key: 'actualizadoEn',      label: 'Actualizado' },
    { key: 'creadoEn',           label: 'Creado' },
  ];
}

export function getDefaultVisibility() {
  return {
    id:             false,
    idProductoProveedor: true,
    productoProveedor:   true,
    fechaDesde:     false,
    fechaHasta:     false,
    precioCompra:   false,
    precioVenta:    false,
    actualizadoEn:  false,
    creadoEn:       false,
  };
}