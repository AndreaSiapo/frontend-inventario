//edit.jsx
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
    
     const { data, setData, processing, errors } = useForm({
        codigo:     value?.codigo || "",
        nombre:     value?.nombre || "",
        abreviado:  value?.abreviado || "",
        descripcion: value?.descripcion || "",
        naturaleza: value?.naturaleza || "",
     });
    
     const onSubmit = (e) => {
        e.preventDefault();
         
        const newErrors = {};

        if (!data.codigoBarra?.trim()) 
          newErrors.codigoBarra = "El código es obligatorio";
        if (!data.nombre?.trim())
          newErrors.nombre = "El nombre es obligatorio";
        if (!data.abreviado)
          newErrors.abreviado = "El abreviado es obligatorio";
        if (!data.descripcion)
          newErrors.descripcion = "La descripción es obligatoria";
        
        if (Object.keys(newErrors).length > 0) {
          setErrors(newErrors);  // <-- IMPORTANTE
          return;
        }
        6
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
              <div className="flex flex-col">
                <div className="col-span-2">
                  <label htmlFor="codigo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Código</label>
                  <input id="codigo" name="codigo" type="text" placeholder={"Ponga el codigo de " + title}
                    value={data.codigo}
                    onChange={(e) => setData("codigo", e.target.value)}
                    className="input-modal"
                    required
                  />
                </div>
                {errors.codigo && (
                  <div className="error">{errors.codigo}</div>
                )}
              </div>
              <div className="flex flex-col">
                <div className="col-span-2">
                  <label htmlFor="nombre" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre</label>
                  <input
                    type="text"
                    name="nombre"
                    id="nombre"
                    className="input-modal"
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
                  <label htmlFor="abreviado" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Abreviatura</label>
                  <input
                    type="text"
                    name="abreviado"
                    id="abreviado"
                    className="input-modal"
                    placeholder={"Abreviatura"}
                    value={data.abreviado}
                    onChange={(e) => setData("abreviado", e.target.value)}
                    required
                  />
                  {errors.abreviado && (
                  <div className="error">{errors.abreviado}</div>
                  )}
                </div>
              </div>
              <div className="flex flex-col">
                <div className="col-span-2">
                  <label htmlFor="naturaleza" className="block text-sm font-medium text-gray-900 dark:text-white">Naturaleza</label>
                  <ul class="w-48 bg-neutral-primary-soft border border-gray-600 rounded-md">
                    <li class="w-full border-b border-gray-600 flex items-center ps-3">
                      <input id="naturaleza" name="naturaleza" type="radio" value={true} autoComplete="naturaleza" onChange={(e) => setData("naturaleza", e.target.value)} className={'w-4 h-4 text-neutral-primary border-gray-600 rounded-full '+classInput+`${errors.naturaleza && ' ring-red-500 border-red-200'}`} />
                      <label for="planaturalezazo" class="w-full py-3 select-none ms-2 text-sm font-medium text-gray-400">Entrada </label>
                    </li>
                    <li class="w-full flex items-center ps-3">
                      <input id="naturaleza" name="naturaleza" type="radio" value={false} autoComplete="naturaleza" onChange={(e) => setData("naturaleza", e.target.value)} className={'w-4 h-4 text-neutral-primary border-gray-600 rounded-full '+classInput+`${errors.naturaleza && ' ring-red-500 border-red-200'}`} />
                      <label for="list-radio-id" class="w-full py-3 select-none ms-2 text-sm font-medium text-gray-400">Salida</label>
                    </li>
                  </ul>
                  {errors.naturaleza && (
                    <div className="error">{errors.naturaleza}</div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-col col-span-2">
              <label htmlFor="descripcion" className="block text-sm font-medium text-gray-900 dark:text-white">Descripcion</label>
              <textarea
                id="descripcion"
                name="descripcion"
                placeholder="Descripcion de la Tipo_documento"
                value={data.descripcion}
                autoComplete="descripcion"
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
