//Create.jsx
import { useEffect, useState } from "react";
import { useForm }             from "../../../hook/useHandler";
import { AppBtnX }             from "../../../components/form/btn";
import { AppBtnCodeBarDownload, AppBtnCodeBar } from "../../../components/html/btn";
import { appRoutes }           from "../../../routes/appRoutes";

export default function ModalCreate( {
  modules,
  handleClose,
  title,
  classInput="",
  inert,
  onSuccess
  }) {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    }, []);
    
    const { data, setData, post, processing, errors, reset } = useForm({
        nombre: "",
        codigo: "",
        referencia: "",
        descripcion: "",
        plazo: "",
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
              <AppBtnX $route={appRoutes.proveedor} handleClose={handleClose} />
            </div>
          {/* Modal body */}
            {data.codigoBarra && (
            <AppBtnCodeBarDownload modules={modules} codigo={data.codigoBarra} />
            )}
            <form onSubmit={handleSubmit} className="p-4 md:p-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <div className="col-span-2">
                    <label htmlFor="codigo" className="block text-sm font-medium text-gray-900 dark:text-white">Código</label>
                    <input id="codigo" name="codigo" type="text"
                      placeholder="Codigo de la Proveedor"
                      value={data.codigo}
                      autoComplete="codigo"
                      onChange={(e) => setData("codigo", e.target.value)}
                      className={'input-modal focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500'+`${errors.nombre && ' ring-red-500 border-red-200'}`}
                    />
                  {errors.codigo && (
                    <div className="error">{errors.codigo}</div>
                  )}
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="col-span-2">
                    <label htmlFor="nombre" className="block text-sm font-medium text-gray-900 dark:text-white">Nombre</label>
                    <input id="nombre" name="nombre" type="text"
                      placeholder="Nombre de la Proveedor"
                      value={data.nombre}
                      autoComplete="nombre"
                      onChange={(e) => setData("nombre", e.target.value)}
                      className={'input-modal focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500'+`${errors.nombre && ' ring-red-500 border-red-200'}`}
                    />
                  {errors.nombre && (
                    <div className="error">{errors.nombre}</div>
                  )}
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="col-span-2">
                    <label htmlFor="referencia" className="block text-sm font-medium text-gray-900 dark:text-white">Referencia</label>
                    <input
                      id="referencia"
                      name="referencia"
                      type="text"
                      placeholder="Referencias"
                      value={data.referencia}
                      autoComplete="referencia"
                      onChange={(e) => setData("referencia", e.target.value)}
                      className={'input-modal '+classInput+`${errors.referencia && ' ring-red-500 border-red-200'}`}
                    />
                  {errors.referencia && (
                    <div className="error">{errors.referencia}</div>
                    )}
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="col-span-2">
                    <label htmlFor="descripcion" className="block text-sm font-medium text-gray-900 dark:text-white">Descripcion</label>
                    <input
                      id="descripcion"
                      name="descripcion"
                      type="text"
                      placeholder="Descripcion de la Proveedor"
                      value={data.descripcion}
                      autoComplete="descripcion"
                      onChange={(e) => setData("descripcion", e.target.value)}
                      className={'input-modal '+classInput+`${errors.descripcion && ' ring-red-500 border-red-200'}`}
                    />
                  {errors.descripcion && (
                    <div className="error">{errors.descripcion}</div>
                    )}
                  </div>
                </div>
                <div className="flex flex-col col-span-2">
                  <div className="col-span-2">
                    <label htmlFor="plazo" className="block text-sm font-medium text-gray-900 dark:text-white">Plazo</label>
                    <input
                      id="plazo"
                      name="plazo"
                      type="number"
                      placeholder="Plazos de entrega estimados del Proveedor"
                      value={data.plazo}
                      autoComplete="plazo"
                      onChange={(e) => setData("plazo", e.target.value)}
                      className={'input-modal '+classInput+`${errors.plazo && ' ring-red-500 border-red-200'}`}
                    />
                  {errors.plazo && (
                    <div className="error">{errors.plazo}</div>
                    )}
                  </div>
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
