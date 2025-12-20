//src/api/productos.js
import { apiGet, apiPost, apiPut, apiDelete } from "./http";

export async function getProductos({ search = '', perPage = 10, page = 1, orderBy = 'id', orderDir = 'asc' } = {}) {
  const json = await apiGet("/productos");
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

export async function getProductosFull({ search = '', orderBy = 'id', orderDir = 'asc' } = {}) {
  const json = await apiGet("/productos");
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

export function getProducto(id) {
  return apiGet(`/productos/${id}`);
}

export function createProducto(data) {
  return apiPost("/productos", data);
}

// si tuvieras editar
export function updateProducto(id, data) {
  return apiPut(`/productos/${id}`, data);
}

// si tuvieras eliminar
export function deleteProducto(id) {
  return apiDelete(`/productos/${id}`);
}

export function getColumns() {
  return [
    { key: 'id',               label: 'ID' },
    { key: 'codigo',           label: 'Codigo' },
    { key: 'codigoBarra',      label: 'Codigo de Barra' },
    { key: 'nombre',           label: 'Nombre' },
    { key: 'descripcion',      label: 'Descripción' },
    { key: 'minimo',           label: 'Mínimo' },
    { key: 'maximo',           label: 'Máximo' },
    { key: 'fecha',            label: 'Fecha' },
    { key: 'activo',           label: 'Activo' },
    { key: 'precio',           label: 'Precio' },
    { key: 'medidaId',         label: 'ID Unidad de Medida' },
    { key: 'medida',           label: 'Und.Medida' },
    { key: 'medidaAbreviado', label: 'U.M.' },
    { key: 'marcaId',          label: 'ID Marca' },
    { key: 'marca',            label: 'Marca' },
    { key: 'categoriaId',      label: 'ID Categoría' },
    { key: 'categoria',        label: 'Categoría' },
    { key: 'presentacionId',   label: 'ID Presentación' },
    { key: 'presentacion',     label: 'Presentación' },
    { key: 'created_at',       label: 'Creado' },
    { key: 'updated_at',       label: 'Actualizado' },
  ];
}

export function getDefaultVisibility() {
  return {
    id:               false,
    codigo:           false,
    codigoBarra:      true,
    nombre:           true,
    descripcion:      false,
    minimo:           false,
    maximo:           false,
    fecha:            false,
    activo:           false,
    precio:           false,
    medidaId:         false,
    medida:           false,
    medidaAbreviado:  false,
    marcaId:          false,
    marca:            false,
    categoriaId:      false,
    categoria:        false,
    presentacionId:   false,
    presentacion:     false,
    updated_at:       false,
    created_at:       false,
  };
}