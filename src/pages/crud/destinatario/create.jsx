//Create.jsx
import Barcode from "react-barcode";
import { useEffect, useState } from "react";
import { useForm } from "../../../hook/useHandler";
import { AppBtnX } from "../../../components/form/btn";


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
      codigo: "",
      nombre: "",
      descripcion: "",
      plazo: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!data.codigo?.trim()) 
      newErrors.codigo = "El código es obligatorio";
    if (!data.nombre?.trim()) 
      newErrors.nombre = "El nombre es obligatorio";
/*    if (!data.descripcion?.trim()) 
      newErrors.descripcion = "La descripcion es obligatoria";
    if (!data.plazo?.trim()) 
      newErrors.plazo = "El plazo es obligatorio";*/

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

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
          <form onSubmit={handleSubmit} className="p-4 md:p-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.codigo && (
                <div className="mt-2 p-2 border rounded bg-white dark:bg-sky-900 overflow-auto col-span-2 flex justify-center text-gray-900 dark:text-white">
                  <Barcode
                    value={data.codigo}
                    background="transparent"
                    lineColor={isDark ? "#fff" : "#000"}      // puedes cambiarlo si usas modo oscuro
                    textColor={isDark ? "#fff" : "#000"} 
                    height={50}
                    width={2}
                    displayValue={true}   // muestra el texto debajo
                    fontSize={14}
                  />
                </div>
              )}
              <div className="flex flex-col">
                <div className="col-span-2">
                  <label htmlFor="codigo" className="block text-sm font-medium text-gray-900 dark:text-white">Código</label>
                  <input id="codigo" name="codigo" type="text"
                    placeholder="Codigo del Destinatario"
                    value={data.codigo}
                    autoComplete="codigo"
                    onChange={(e) => setData("codigo", e.target.value)}
                    className={'input-modal focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500'+`${errors.nombre && ' ring-red-500 border-red-200'}`}
                  />
                {errors.codigo && (
                  <div className="text-red-500 text-sm mt-1">{errors.codigo}</div>
                )}
                </div>
              </div>
              <div className="flex flex-col">
                <div className="col-span-2">
                  <label htmlFor="nombre" className="block text-sm font-medium text-gray-900 dark:text-white">Nombre</label>
                  <input id="nombre" name="nombre" type="text"
                    placeholder="Nombre del Destinatario"
                    value={data.nombre}
                    autoComplete="nombre"
                    onChange={(e) => setData("nombre", e.target.value)}
                    className={'input-modal focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500'+`${errors.nombre && ' ring-red-500 border-red-200'}`}
                  />
                {errors.nombre && (
                  <div className="text-red-500 text-sm mt-1">{errors.nombre}</div>
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
                    placeholder="Descripcion de la Destinatario"
                    value={data.descripcion}
                    autoComplete="descripcion"
                    onChange={(e) => setData("descripcion", e.target.value)}
                    className={'input-modal '+classInput+`${errors.descripcion && ' ring-red-500 border-red-200'}`}
                  />
                {errors.descripcion && (
                  <div className="text-red-500 text-sm mt-1">{errors.descripcion}</div>
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
                    placeholder="Plazos de entrega estimados del Destinatario"
                    value={data.plazo}
                    autoComplete="plazo"
                    onChange={(e) => setData("plazo", e.target.value)}
                    className={'input-modal '+classInput+`${errors.plazo && ' ring-red-500 border-red-200'}`}
                  />
                {errors.plazo && (
                  <div className="text-red-500 text-sm mt-1">{errors.plazo}</div>
                  )}
                </div>
              </div>
            </div>
            <div className="modal-footer mt-4">
              <button type="submit" className="submit-modal">
                Crear {title.toLowerCase()}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    );
}
