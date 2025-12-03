//edit.jsx
import { useEffect, useState, useMemo } from "react";
import { AppBtnCodeBarDownload, AppBtnCodeBar } from "../../../components/html/btn";
import { useForm, useResource } from "../../../hook/useHandler";
import { AppBtnX }            from "../../../components/form/btn";
import CheckboxBall           from "../../../components/form/check2";
import IconVRight             from "../../../components/icons/actions/v-right";
import { getMarcasFull }          from "../../../api/marcas";
import { getUnidadesMedidaFull }  from "../../../api/umedidas";
import { getCategoriasFull }      from "../../../api/categorias";
import { getPresentacionesFull }  from "../../../api/presentaciones";

export default function ModalEdit({
    title,
    modules,
    value,
    handleClose,
    handleEdit,
    inert
 }) {
  const { resource: medidas }        = useResource(getUnidadesMedidaFull);
  const { resource: marcas }         = useResource(getMarcasFull);
  const { resource: categorias }     = useResource(getCategoriasFull);
  const { resource: presentaciones } = useResource(getPresentacionesFull);
  const [ isDark, setIsDark ] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);
  
  const { data, setData, processing, errors, setErrors } = useForm({
    codigoBarra:  value?.codigoBarra || "",
    nombre:       value?.nombre || "",
    descripcion:  value?.descripcion || "",
    minimo:       value?.minimo || "",
    maximo:       value?.maximo || "",
    fecha:        value?.fecha || "",
    activo:       value?.activo || "",
    precio:       value?.precio || "",
    medidaId:     value?.medidaId || "",
    marcaId:      value?.marcaId || "",
    categoriaID:  value?.categoriaId || "",
    presentacionId:   value?.presentacionId || "",
  });
  
  const onSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    const min = data.minimo !== "" ? Number(data.minimo) : null;
    const max = data.maximo !== "" ? Number(data.maximo) : null;

    if (!data.codigoBarra?.trim()) 
      newErrors.codigoBarra = "El código es obligatorio";
    if (!data.nombre?.trim())
      newErrors.nombre = "El nombre es obligatorio";
    if (min !== null && max !== null) {
      if (max < min) {
        newErrors.maximo = "El máximo debe ser mayor que el mínimo";
      }
    }
    if (!data.precio)
      newErrors.precio = "El precio es obligatorio";
    if (!data.medidaId)
      newErrors.medidaId = "Seleccione la unidad de medida";
    if (!data.marcaId)
      newErrors.marcaId = "Seleccione una marca";
    if (!data.presentacionId)
      newErrors.presentacionId = "Seleccione la presentación";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);  // <-- IMPORTANTE
      return;
    }
    handleEdit(value.id, data);
  };
  
  function buildHierarchy(list) {
    const safeList = Array.isArray(list) ? list : [];

    const map = new Map(
      safeList.map(c => [c.id, { ...c, children: [], level: 0 }])
    );

    let rootItems = [];

    map.forEach(item => {
      if (item.categoriaPadreId) {        // 👈 FIX
        const parent = map.get(item.categoriaPadreId); // 👈 FIX
        if (parent) {
          item.level = parent.level + 1;
          parent.children.push(item);
        }
      } else {
        rootItems.push(item);
      }
    });

    map.forEach(item => {
      item.hasChildren = item.children.length > 0;
    });

    const result = [];
    const traverse = (node) => {
      result.push(node);
      node.children.forEach(traverse);
    };

    rootItems.forEach(traverse);
    return result;
  }

  const categoriasOrdenadas = useMemo(() => {
    return buildHierarchy(categorias.data || []);
  }, [categorias.data]);

  return (
    <div id="crud-modal" inert={inert} tabIndex="-1" className="crud-modal">
      <div className="relative p-4 w-full max-w-md max-h-full">
        {/* Modal content */}
        <div className="modal-content">
          {/* Modal header */}
          <div className="modal-header">
            <h3 className="h3-modal"> Editar {title}: </h3>
            <AppBtnX $route={modules+'.index'} handleClose={handleClose} />
          </div>
          {/* Modal body */}
          {data.codigoBarra && (
            <AppBtnCodeBarDownload codigo={data.codigoBarra} modules={modules} />
          )}
          <form className="p-4 md:p-5" onSubmit={onSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-x-4 gap-y-2">
              <div className="flex flex-col">
                <label htmlFor="codigoBarra" className="block text-label">Código</label>
                <input id="codigoBarra" name="codigoBarra" type="text"
                  placeholder="Codigo"
                  value={data.codigoBarra}
                  autoComplete="codigoBarra"
                  onChange={(e) => setData("codigoBarra", e.target.value)}
                  className={'input-modal focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500'+`${errors.nombre && ' ring-red-500 border-red-200'}`}
                />
                {errors.codigoBarra && (
                  <div className="error">{errors.codigoBarra}</div>
                )}
              </div>
              <div className="flex flex-col col-span-2">
                <label htmlFor="nombre" className="block text-label">Nombre</label>
                <input id="nombre" name="nombre" type="text"
                  placeholder="Nombre de la Producto"
                  value={data.nombre}
                  autoComplete="nombre"
                  onChange={(e) => setData("nombre", e.target.value)}
                  className={'input-modal focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500'+`${errors.nombre && ' ring-red-500 border-red-200'}`} />
                {errors.nombre && (
                  <div className="error">{errors.nombre}</div>
                )}
              </div>
              <div className="flex flex-col h-max items-center">
                <div>
                  <CheckboxBall name="activo" checked={data.activo} onChange={(e) => setData("activo", e.target.checked)} label="Activo"classLabel2="ml-2 text-sm font-medium text-gray-700 dark:text-gray-400" />
                {errors.activo && (
                  <div className="error">{errors.activo}</div>
                )}
                </div>
              </div>
              <div className="flex flex-col md:col-span-4 col-span-2">
                <label htmlFor="descripcion" className="block mb-2 text-label">Descripcion</label>
                <input
                  type="text"
                  name="descripcion"
                  id="descripcion"
                  className="input-modal"
                  placeholder={"Descripcion de entrega estimados del Proveedor"}
                  value={data.descripcion}
                  onChange={(e) => setData("descripcion", e.target.value)}
                  required
                />
              {errors.descripcion && (
                <div className="error">{errors.descripcion}</div>
              )}
              </div>
              <div className="flex flex-col md:col-span-2">
                <label htmlFor="minimo" className="block text-label">MIN - MAX</label>
                <div className="col-span-2 flex gap-2">
                  <input
                    id="minimo"
                    name="minimo"
                    type="number"
                    placeholder="mínimo"
                    value={data.minimo}
                    autoComplete="minimo"
                    onChange={(e) => setData("minimo", e.target.value)}
                    className={'input-modal w-20 '+`${errors.minimo && ' ring-red-500 border-red-200'}`}
                  />
                  <label htmlFor="minimo" className="block text-sm text-gray-900 dark:text-gray-400"> - </label>
                  <input
                    id="maximo"
                    name="maximo"
                    type="number"
                    placeholder="maximo"
                    value={data.maximo}
                    autoComplete="maximo"
                    onChange={(e) => setData("maximo", e.target.value)}
                    className={'input-modal w-20 '+`${errors.maximo && ' ring-red-500 border-red-200'}`}
                  />
                </div>
                <div>
                {errors.minimo && (
                  <div className="error">{errors.minimo}</div>
                )}
                {errors.maximo && (
                  <div className="error">{errors.maximo}</div>
                )}
                </div>
              </div>
              <div className="flex flex-col">
                <div className="col-span-2">
                  <label htmlFor="precio" className="block text-label">Precio</label>
                  <input
                    id="precio"
                    name="precio"
                    type="number"
                    placeholder="precio"
                    value={data.precio}
                    autoComplete="precio"
                    onChange={(e) => setData("precio", e.target.value)}
                    className={'input-modal '+`${errors.precio && ' ring-red-500 border-red-200'}`}
                  />
                {errors.precio && (
                  <div className="error">{errors.precio}</div>
                  )}
                </div>
              </div>
              <div className="flex flex-col">
                <div className="col-span-2">
                  <label htmlFor="medidaId" className="block text-label">Und. Medida</label>
                  <select id="medidaId" name="medidaId"
                    value={data.medidaId}
                    onChange={(e) => setData("medidaId", e.target.value)}
                    className={'input-modal '+`${errors.medidaId && ' ring-red-500 border-red-200'}`}
                  >
                    <option value="">Seleccione una medida</option>
                    {medidas?.data?.map((medida) => (
                      <option key={medida.id} value={medida.id}>
                        {"("+medida.abreviado+") "+medida.nombre}
                      </option>
                    ))}
                  </select>
                {errors.medidaId && (
                  <div className="error">{errors.medidaId}</div>
                  )}
                </div>
              </div>
              <div className="flex flex-col col-span-2">
                <div className="block text-label">Categoría</div>
                <ul className="radio-select-ul scrollbar-thin ">
                  <li key="0">
                    <input type="radio" id="opcion_0" name="categoriaId" value="" className="peer hidden" onChange={(e) => setData("categoriaId", "")}/>
                    <label htmlFor="opcion_0" className="radio-select-ul-li-label rounded-t-lg"
                    >( Sin categoria ) </label>
                  </li>
                  {categoriasOrdenadas.map((c, index) => (
                  <li key={c.id}>
                    <input type="radio" id={"opcion_"+c.id} name="categoriaId" value={c.id} className="peer hidden" onChange={(e) => setData("categoriaId", e.target.value)}/>
                    <label htmlFor={"opcion_"+c.id} className={`radio-select-ul-li-label ${index === categoriasOrdenadas.length - 1 ? " rounded-b-lg " : ""}`}
                    >
                      <div className={`pl-2`} style={{ paddingLeft: `${c.level * 12 + 2}px` }}>
                        {c.hasChildren ? (
                          <IconVRight className="inline-block w-4 text-gray-500 dark:text-gray-300" />
                        ) : null}
                      {c.nombre}</div>
                    </label>
                  </li>
                  ))}
                </ul>
                {errors.categoriaId && (
                  <div className="error">{errors.categoriaId}</div>
                )}
              </div>
              <div className="flex flex-col col-span-2">
                <div>
                  <label htmlFor="marcaId" className="block text-label">Marca</label>
                  <select id="marcaId" name="marcaId"
                    value={data.marcaId}
                    onChange={(e) => setData("marcaId", e.target.value)}
                    className={'input-modal '+`${errors.marcaId && ' ring-red-500 border-red-200'}`}
                  >
                    <option value="">Seleccione la marca </option>
                    {marcas?.data?.map((marca) => (
                      <option key={marca.id} value={marca.id}>
                        {"("+marca.abreviado+") "+marca.nombre}
                      </option>
                    ))}
                  </select>
                {errors.marcaId && (
                  <div className="error">{errors.marcaId}</div>
                  )}
                </div>
                <div className="flex flex-col col-span-2">
                  <label htmlFor="presentacionId" className="block text-label">Presentacion</label>
                  <select id="presentacionId" name="presentacionId"
                    value={data.presentacionId}
                    onChange={(e) => setData("presentacionId", e.target.value)}
                    className={'input-modal '+`${errors.presentacionId && ' ring-red-500 border-red-200'}`}
                  >
                    <option value="">Seleccione la presentacion </option>
                    {presentaciones?.data?.map((presentacion) => (
                      <option key={presentacion.id} value={presentacion.id}>
                        {presentacion.nombre}
                      </option>
                    ))}
                  </select>
                {errors.presentacionId && (
                  <div className="error">{errors.presentacionId}</div>
                  )}
                </div>
                <div className="flex flex-col col-span-2">
                  <label htmlFor="fecha" className="block text-label">Fecha</label>
                  <input
                    id="fecha"
                    name="fecha"
                    type="date"
                    placeholder="fecha"
                    value={data.fecha}
                    autoComplete="fecha"
                    onChange={(e) => setData("fecha", e.target.value)}
                    className={'input-modal '+`${errors.fecha && ' ring-red-500 border-red-200'}`}
                  />
                {errors.fecha && (
                  <div className="error">{errors.fecha}</div>
                  )}
                </div>
              </div>
            </div>
            <div className="modal-footer mt-4">
              <button type="submit" className="submit-modal">
                Editar {title.toLowerCase()}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
