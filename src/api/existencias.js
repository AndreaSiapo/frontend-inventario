//src/api/exostencia.js
import { label } from "three/tsl";
import { apiGet, apiPost, apiPut, apiDelete } from "./http";

export async function getExistencias({ search = '', perPage = 10, page = 1, orderBy = 'id', orderDir = 'asc' } = {}) {
  const json = await apiGet("/existencias");
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

export function getExistencia(id) {
  return apiGet(`/existencias/${id}`);
}

export function createExistencia(data) {
  return apiPost("/existencias", data);
}

// si tuvieras editar
export function updateExistencia(id, data) {
  return apiPut(`/existencias/${id}`, data);
}

// si tuvieras eliminar
export function deleteExistencia(id) {
  return apiDelete(`/existencias/${id}`);
}

export function getColumns() {
  return [
    { key: 'id',              label: 'ID' },
    { key: 'bodegaId',        label: 'ID Bodega' },
    { key: 'bodega',          label: 'Bodega' },
    { key: 'loteId',          label: 'ID Lote'},
    { key: 'lote',            label: 'Lote'},
    { key: 'productoId',      label: 'ID Producto' },
    { key: 'producto',        label: 'Producto' },
    { key: 'stockMinimo',     label: 'Minimo'},
    { key: 'stockMaximo',     label: 'Maximo'},
    { key: 'costoPromedio',   label: 'Costo Promedio' },
    { key: 'fechaUltimoMovimiento', label: 'Fecha Ult. Mov.' },
    { key: 'cantidadActual',  label: 'Cantidad Actual' },
    { key: 'actualizadoEn',   label: 'Actualizado' },
    { key: 'creadoEn',        label: 'Creado' },
  ];
}

export function getDefaultVisibility() {
  return {
    id:              false,
    bodegaId:        false,
    bodega:          true,
    loteId:          false,
    lote:            true,
    productoId:      false,
    producto:        true,
    stockMinimo:     false,
    stockMaximo:     false,
    costoPromedio:   false,
    fechaUltimoMovimiento:  false,
    cantidadActual:   false,
    actualizadoEn:   false,
    creadoEn:        false,
  };
}