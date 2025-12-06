//src/api/detalle_movimientos.js
import { apiGet, apiPost, apiPut, apiDelete } from "./http";

export async function getDetalleMovimientos({ search = '', perPage = 10, page = 1, orderBy = 'id', orderDir = 'asc' } = {}) {
  const json = await apiGet("/detalle_movimientos");
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

export function getDetalleMovimiento(id) {
  return apiGet(`/detalle_movimientos/${id}`);
}

export function createDetalleMovimiento(data) {
  return apiPost("/detalle_movimientos", data);
}

// si tuvieras editar
export function updateDetalleMovimiento(id, data) {
  return apiPut(`/detalle_movimientos/${id}`, data);
}

// si tuvieras eliminar
export function deleteDetalleMovimiento(id) {
  return apiDelete(`/detalle_movimientos/${id}`);
}

export function getColumns() {
  return [
    { key: 'id',            label: 'ID' },
    { key: 'id_movimiento', label: 'ID Movimiento' },
    { key: 'movimiento',    label: 'Movimiento' },
    { key: 'id_producto',   label: 'ID Producto' },
    { key: 'producto',      label: 'Producto' },
    { key: 'detalle',       label: 'Detalle' },
    { key: 'cantidad',      label: 'Cantidad' },
    { key: 'valor',         label: 'Valor' },
    { key: 'subtotal',      label: 'Sub Total' },
    { key: 'fecha',         label: 'Fecha' },
    { key: 'created_at',    label: 'Creado' },
    { key: 'updated_at',    label: 'Actualizado' },
  ];
}

export function getDefaultVisibility() {
  return {
    id:             false,
    id_movimiento:  true,
    movimiento:     true,
    id_producto:    true,
    producto:       true,
    detalle:        false,
    cantidad:       false,
    valor:          false,
    subtotal:       false,
    fecha:          false,
    updated_at:     false,
    created_at:     false,
  };
}