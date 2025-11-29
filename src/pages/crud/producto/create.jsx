//Create.jsx
import { useEffect, useState }  from "react";
import { AppBtnCodeBarDownload, AppBtnCodeBar } from "../../../components/html/btn";
import { useForm, useResource } from "../../../hook/useHandler";
import { AppBtnX }            from "../../../components/form/btn";
import CheckboxBall           from "../../../components/form/check2";
import { getMarcas }          from "../../../api/marcas";
import { getUnidadesMedida }  from "../../../api/umedidas";
import { getCategorias }      from "../../../api/categorias";
import { getPresentaciones }  from "../../../api/presentaciones";

export default function ModalCreate( {
  modules,
  handleClose,
  title,
  classInput="",
  inert,
  onSuccess,
  }) {
    const { resource: medidas }        = useResource(getUnidadesMedida);
    const { resource: marcas }         = useResource(getMarcas);
    const { resource: categorias }     = useResource(getCategorias);
    const { resource: presentaciones } = useResource(getPresentaciones);
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    }, []);
    
    const { data, setData, post, processing, errors, reset } = useForm({
        codigoBarra:      "",
        nombre:           "",
        descripcion:      "",
        minimo:           "",
        maximo:           "",
        fecha:            "",
        activo:           "",
        precio:           "",
        medidaId:         "",
        marcaId:          "",
        categoriaID:      "",
        presentacionId:   "",
    });

    const handleSubmit = async (e) => {
      e.preventDefault();

      if (onSuccess) onSuccess(data);
      handleClose();
    };

    return (
      <div id="crud-modal" inert={inert} tabIndex="-1" className="crud-modal">
        <div className="relative p-4 w-full max-w-md max-h-full">
          {/* Modal content */}
          <div className="modal-content">
            {/* Modal header */}
            <div className="modal-header">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white"> Crear {title}: </h3>
              <AppBtnX $route={'/tablas/presentaciones'} handleClose={handleClose} />
            </div>
          {/* Modal body */}
            {data.codigoBarra && (
             <AppBtnCodeBar codigo={data.codigoBarra} />
            )}
            <form onSubmit={handleSubmit} className="p-4 md:p-5">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-x-4 gap-y-2">
                <div className="flex flex-col">
                  <label htmlFor="codigoBarra" className="block text-sm font-medium text-gray-900 dark:text-white">Código</label>
                  <input id="codigoBarra" name="codigoBarra" type="text"
                    placeholder="Codigo"
                    value={data.codigoBarra}
                    autoComplete="codigoBarra"
                    onChange={(e) => setData("codigoBarra", e.target.value)}
                    className={'input-modal focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500'+`${errors.nombre && ' ring-red-500 border-red-200'}`}
                  />
                {errors.codigoBarra && (
                  <div className="text-red-500 text-sm mt-1">{errors.codigoBarra}</div>
                )}
                </div>
                <div className="flex flex-col col-span-2">
                  <label htmlFor="nombre" className="block text-sm font-medium text-gray-900 dark:text-white">Nombre</label>
                  <input id="nombre" name="nombre" type="text"
                    placeholder="Nombre de la Producto"
                    value={data.nombre}
                    autoComplete="nombre"
                    onChange={(e) => setData("nombre", e.target.value)}
                    className={'input-modal focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500'+`${errors.nombre && ' ring-red-500 border-red-200'}`} />
                {errors.nombre && (
                  <div className="text-red-500 text-sm mt-1">{errors.nombre}</div>
                )}
                </div>
                <div className="flex flex-col h-max items-center">
                  <div>
                    <CheckboxBall name="activo" checked={data.activo} onChange={(e) => setData("activo", e.target.checked)} label="Activo"classLabel2="ml-2 text-sm font-medium text-gray-700 dark:text-gray-400" />
                  {errors.activo && (
                    <div className="text-red-500 text-sm mt-1">{errors.activo}</div>
                  )}
                  </div>
                </div>
                <div className="flex flex-col md:col-span-4 col-span-2">
                  <label htmlFor="descripcion" className="block text-sm font-medium text-gray-900 dark:text-white">Descripcion</label>
                  <textarea
                    id="descripcion"
                    name="descripcion"
                    placeholder="Descripcion de la Producto"
                    value={data.descripcion}
                    autoComplete="descripcion"
                    onChange={(e) => setData("descripcion", e.target.value)}
                    className={'input-modal '+classInput+`${errors.descripcion && ' ring-red-500 border-red-200'}`}
                  />
                {errors.descripcion && (
                  <div className="text-red-500 text-sm mt-1">{errors.descripcion}</div>
                )}
                </div>
                <div className="flex flex-col md:col-span-2">
                  <label htmlFor="minimo" className="block text-sm font-medium text-gray-900 dark:text-white">MIN - MAX</label>
                  <div className="col-span-2 flex gap-2">
                    <input
                      id="minimo"
                      name="minimo"
                      type="number"
                      placeholder="mínimo"
                      value={data.minimo}
                      autoComplete="minimo"
                      onChange={(e) => setData("minimo", e.target.value)}
                      className={'input-modal w-20 '+classInput+`${errors.minimo && ' ring-red-500 border-red-200'}`}
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
                      className={'input-modal w-20 '+classInput+`${errors.maximo && ' ring-red-500 border-red-200'}`}
                    />
                  {errors.maximo && (
                    <div className="text-red-500 text-sm mt-1">{errors.maximo}</div>
                    )}
                  </div>
                </div>
                <div className="flex flex-col col-span-2">
                  <label htmlFor="fecha" className="block text-sm font-medium text-gray-900 dark:text-white">Fecha</label>
                  <input
                    id="fecha"
                    name="fecha"
                    type="date"
                    placeholder="fecha"
                    value={data.fecha}
                    autoComplete="fecha"
                    onChange={(e) => setData("fecha", e.target.value)}
                    className={'input-modal '+classInput+`${errors.fecha && ' ring-red-500 border-red-200'}`}
                  />
                {errors.fecha && (
                  <div className="text-red-500 text-sm mt-1">{errors.fecha}</div>
                  )}
                </div>
                <div className="flex flex-col">
                  <div className="col-span-2">
                    <label htmlFor="precio" className="block text-sm font-medium text-gray-900 dark:text-white">Precio</label>
                    <input
                      id="precio"
                      name="precio"
                      type="number"
                      placeholder="precio"
                      value={data.precio}
                      autoComplete="precio"
                      onChange={(e) => setData("precio", e.target.value)}
                      className={'input-modal '+classInput+`${errors.precio && ' ring-red-500 border-red-200'}`}
                    />
                  {errors.precio && (
                    <div className="text-red-500 text-sm mt-1">{errors.precio}</div>
                    )}
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="col-span-2">
                    <label htmlFor="medidaId" className="block text-sm font-medium text-gray-900 dark:text-white">Und. Medida</label>
                    <select id="medidaId" name="medidaId"
                      value={data.medidaId}
                      onChange={(e) => setData("medidaId", e.target.value)}
                      className={'input-modal '+classInput+`${errors.medidaId && ' ring-red-500 border-red-200'}`}
                    >
                      <option value="">Seleccione una medida</option>
                      {medidas?.data?.map((medida) => (
                        <option key={medida.id} value={medida.id}>
                          {"("+medida.abreviado+") "+medida.nombre}
                        </option>
                      ))}
                    </select>
                  {errors.medidaId && (
                    <div className="text-red-500 text-sm mt-1">{errors.medidaId}</div>
                    )}
                  </div>
                </div>
                <div className="flex flex-col col-span-2">
                    <label htmlFor="marcaId" className="block text-sm font-medium text-gray-900 dark:text-white">Marca</label>
                    <select id="marcaId" name="marcaId"
                      value={data.marcaId}
                      onChange={(e) => setData("marcaId", e.target.value)}
                      className={'input-modal '+classInput+`${errors.marcaId && ' ring-red-500 border-red-200'}`}
                    >
                      <option value="">Seleccione la marca </option>
                      {marcas?.data?.map((marca) => (
                        <option key={marca.id} value={marca.id}>
                          {"("+marca.abreviado+") "+marca.nombre}
                        </option>
                      ))}
                    </select>
                  {errors.marcaId && (
                    <div className="text-red-500 text-sm mt-1">{errors.marcaId}</div>
                    )}
                </div>
                <div className="flex flex-col col-span-2">
                  <label htmlFor="categoriaId" className="block text-sm font-medium text-gray-900 dark:text-white">Categoria</label>
                  <select id="categoriaId" name="categoriaId"
                    value={data.categoriaId}
                    onChange={(e) => setData("categoriaId", e.target.value)}
                    className={'input-modal '+classInput+`${errors.categoriaId && ' ring-red-500 border-red-200'}`}
                  >
                    <option value="">Seleccione la categoria </option>
                    {categorias?.data?.map((categoria) => (
                      <option key={categoria.id} value={categoria.id}>
                        {categoria.nombre}
                      </option>
                    ))}
                  </select>
                {errors.categoriaId && (
                  <div className="text-red-500 text-sm mt-1">{errors.categoriaId}</div>
                  )}
                </div>
                <div className="flex flex-col col-span-2">
                  <label htmlFor="presentacionId" className="block text-sm font-medium text-gray-900 dark:text-white">Presentacion</label>
                  <select id="presentacionId" name="presentacionId"
                    value={data.presentacionId}
                    onChange={(e) => setData("presentacionId", e.target.value)}
                    className={'input-modal '+classInput+`${errors.presentacionId && ' ring-red-500 border-red-200'}`}
                  >
                    <option value="">Seleccione la presentacion </option>
                    {presentaciones?.data?.map((presentacion) => (
                      <option key={presentacion.id} value={presentacion.id}>
                        {presentacion.nombre}
                      </option>
                    ))}
                  </select>
                {errors.presentacionId && (
                  <div className="text-red-500 text-sm mt-1">{errors.presentacionId}</div>
                  )}
                </div>
              </div>
              <button type="submit" className="submit-modal mt-4">
                Crear {title.toLowerCase()}
              </button>
          </form>
        </div>
      </div>
    </div>
    );
}
