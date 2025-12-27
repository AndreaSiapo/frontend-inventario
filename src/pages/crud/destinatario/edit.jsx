//edit.jsx
import Barcode from "react-barcode";
import { useEffect, useState } from "react";
import { useForm } from "@/hook/useHandler";
import { AppBtnX } from "@form/btn";

export default function ModalEdit({
    title,
    modules,
    value,
    handleClose,
    handleEdit,
    inert
 }) {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    }, []);
    
     const { data, setData, processing, errors, setErrors } = useForm({
         codigo: value?.codigo || "",
         nombre: value?.nombre || "",
         descripcion: value?.descripcion || "",
         plazo: value?.plazo || ""
     });
    
    const onSubmit = (e) => {
      e.preventDefault();
      const newErrors = {};

      if (!data.codigo?.trim()) 
        newErrors.codigo = "El codigo es obligatorio";
      if (!data.nombre?.trim()) 
        newErrors.nombre = "El nombre es obligatorio"; /*
      if (!data.descripcion?.trim()) 
        newErrors.descripcion = "La descripcion es necesaria.";
      if (!data.plazo?.trim()) 
        newErrors.plazo = "El plazo es necesario.";*/

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }
      
      handleEdit(value.id, data);
     };

  return (
    <div id="crud-modal" inert={inert} tabIndex="-1" className="crud-modal">
      <div className="relative p-4 w-full max-w-md max-h-full">
        {/* Modal content */}
        <div className="modal-content">
          {/* Modal header */}
          <div className="modal-header">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white"> Editar {title}: </h3>
            <AppBtnX $route={modules+'.index'} handleClose={handleClose} />
          </div>
          {/* Modal body */}
          <form className="p-4 md:p-5" onSubmit={onSubmit}>
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
                  <label htmlFor="codigo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Código</label>
                  <input
                    type="text"
                    name="codigo"
                    id="codigo"
                    className={'input-modal '+classInput+`${errors.descripcion && ' ring-red-500 border-red-200'}`}
                    placeholder={"Ponga el codigo de " + title}
                    value={data.codigo}
                    onChange={(e) => setData("codigo", e.target.value)}
                    required
                  />
                {errors.codigo && (
                  <div className="error">{errors.codigo}</div>
                )}
                </div>
              </div>
              <div className="flex flex-col">
                <div className="col-span-2">
                  <label htmlFor="nombre" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre</label>
                  <input
                    type="text"
                    name="nombre"
                    id="nombre"
                    className={'input-modal '+classInput+`${errors.descripcion && ' ring-red-500 border-red-200'}`}
                    placeholder={"Ponga el nombre de " + title}
                    value={data.nombre}
                    onChange={(e) => setData("nombre", e.target.value)}
                    required
                  />
                {errors.nombre && (
                  <div className="error">{errors.nombre}</div>
                )}
                </div>
              </div>
              <div className="flex flex-col">
                <div className="col-span-2">
                  <label htmlFor="plazo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Plazo</label>
                  <input
                    type="text"
                    name="plazo"
                    id="plazo"
                    className={'input-modal '+classInput+`${errors.descripcion && ' ring-red-500 border-red-200'}`}
                    placeholder={"Plazos de entrega estimados del Proveedor"}
                    value={data.plazo}
                    onChange={(e) => setData("plazo", e.target.value)}
                  />
                {errors.plazo && (
                  <div className="error">{errors.plazo}</div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-col col-span-2">
              <label htmlFor="descripcion" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Descripcion</label>
              <textarea
                name="descripcion"
                id="descripcion"
                placeholder={"Descripcion"}
                value={data.descripcion}
                onChange={(e) => setData("descripcion", e.target.value)}
                className={'input-modal '+classInput+`${errors.descripcion && ' ring-red-500 border-red-200'}`}
              />
              {errors.descripcion && (
                <div className="error">{errors.descripcion}</div>
              )}
            </div>
            <button type="submit" className="submit-modal mt-4">
              Editar {title.toLowerCase()}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
