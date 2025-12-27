//Create.jsx
import { useEffect, useState } from "react";
import { useForm }             from "@/hook/useHandler";
import { AppBtnX }             from "@form/btn";
import { appRoutes }           from "@/routes/appRoutes";


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
    
    const { data, setData, post, processing, errors, setErrors, reset } = useForm({
        codigo:      "",
        nombre:      "",
        abreviado:   "",
        descripcion: "",
        naturaleza:  "",
    });

    const handleSubmit = async (e) => {
      e.preventDefault();
      const newErrors = {};

      if (!data.codigo?.trim()) 
        newErrors.codigo = "El código es obligatorio";
      if (!data.nombre?.trim())
        newErrors.nombre = "El nombre es obligatorio";
      if (!data.abreviado)
        newErrors.abreviado = "El abreviado es obligatorio";
/*      if (!data.descripcion)
        newErrors.descripcion = "La descripción es obligatoria";
      if (!data.naturaleza)
        newErrors.naturaleza = "La descripción es obligatoria";*/
      
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);  // <-- IMPORTANTE
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
              <AppBtnX $route={appRoutes.tipoDocumento} handleClose={handleClose} />
            </div>
          {/* Modal body */}
            <form onSubmit={handleSubmit} className="p-4 md:p-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <div className="col-span-2">
                    <label htmlFor="codigo" className="block text-sm font-medium text-gray-900 dark:text-white">Código</label>
                    <input id="codigo" name="codigo" type="text"
                      placeholder="Codigo del Tipo de Documento"
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
                      placeholder="Nombre de la Tipo_documento"
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
                    <label htmlFor="abreviado" className="block text-sm font-medium text-gray-900 dark:text-white">Abreviatura</label>
                    <input
                      id="abreviado"
                      name="abreviado"
                      type="text"
                      placeholder="Abreviado"
                      value={data.abreviado}
                      autoComplete="abreviado"
                      onChange={(e) => setData("abreviado", e.target.value)}
                      className={'input-modal '+classInput+`${errors.abreviado && ' ring-red-500 border-red-200'}`}
                    />
                  {errors.abreviado && (
                    <div className="error">{errors.abreviado}</div>
                    )}
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-800 dark:text-gray-300">Naturaleza</label>
                    <ul className="w-full border border-gray-600 rounded-md">
                      <li className="w-full border-b border-gray-600 flex items-center ps-3">
                        <input id="naturaleza_true" name="naturaleza" type="radio" value={true} autoComplete="naturaleza" onChange={(e) => setData("naturaleza", e.target.value)} className={'w-4 h-4 border-gray-600 rounded-full '+`${errors.naturaleza && ' ring-red-500 border-red-200'}`} />
                        <label htmlFor="naturaleza_true" className="w-full py-3 select-none ms-2 text-sm font-medium text-gray-800 dark:text-gray-300">Entrada </label>
                      </li>
                      <li className="w-full flex items-center ps-3">
                        <input id="naturaleza_false" name="naturaleza" type="radio" value={false} autoComplete="naturaleza" onChange={(e) => setData("naturaleza", e.target.value)} className={'w-4 h-4 border-gray-600 rounded-full '+`${errors.naturaleza && ' ring-red-500 border-red-200'}`} />
                        <label htmlFor="naturaleza_false" className="w-full py-3 select-none ms-2 text-sm font-medium text-gray-800 dark:text-gray-300">Salida</label>
                      </li>
                    </ul>
                    {errors.naturaleza && (
                      <div className="error">{errors.naturaleza}</div>
                    )}
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
