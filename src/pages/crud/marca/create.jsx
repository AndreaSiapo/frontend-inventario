//Create.jsx
import { useEffect, useState, useMemo } from "react";
import { useForm }                      from "@/hook/useHandler";
import { AppBtnX }                      from "@form/btn";
import { appRoutes }                    from "@route";

export default function ModalCreate( {
  modules,
  handleClose,
  title,
  classInput="",
  inert,
  onSuccess
  }) {
    const { data, setData, post, processing, errors, setErrors, reset } = useForm({
        nombre:    "",
        abreviado: "",
        ruc:       "",
        descripcion: "",
        tipo:      "",
    });

    const now = new Date().toISOString();

    const handleSubmit = async (e) => {
      e.preventDefault();
      const newErrors = {};
     
      if (!data.nombre?.trim())
      newErrors.nombre = "El nombre es obligatorio";
      if (!data.abreviado?.trim()) {
      newErrors.abreviado = "La abreviatura es obligatoria";
      } else if (data.abreviado.trim().length > 50) {
        newErrors.abreviado = "La abreviatura no puede tener más de 50 caracteres";
      }
      if (!data.ruc.length == 11)
      newErrors.ruc = "Debe tener 11 dígitos y comenzar con 20"
      if (!/^(20)\d{9}$/.test(data.ruc)) {
        newErrors.ruc = "El RUC debe tener 11 dígitos y comenzar con 20";
      }
      if (data.descripcion.trim().length > 400)
        newErrors.descripcion = "La descripcion no puede tener más de 400 caracteres";
      if (data.tipo.trim().length > 50)
        newErrors.tipo = "El tipo no puede tener más de 50 caracteres";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

      if (onSuccess) await onSuccess(data, setErrors);
//      handleClose();
    };

    return (
      <div id="crud-modal" inert={inert} tabIndex="-1" className="crud-modal">
        <div className="relative p-4 w-full max-w-md max-h-full">
          {/* Modal content */}
          <div className="modal-content">
            {/* Modal header */}
            <div className="modal-header">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white"> Crear {title}: </h3>
              <AppBtnX $route={appRoutes.marca} handleClose={handleClose} />
            </div>
          {/* Modal body */}
            <form onSubmit={handleSubmit} className="p-4 md:p-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <div className="col-span-2">
                    <label htmlFor="nombre" className="block text-sm font-medium text-gray-900 dark:text-white">Nombre</label>
                    <input id="nombre" name="nombre" type="text"
                      placeholder="Nombre de la Marca"
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
                      placeholder="Abreviatura"
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
                    <label htmlFor="ruc" className="block text-sm font-medium text-gray-900 dark:text-white">RUC</label>
                    <input
                      id="ruc"
                      name="ruc"
                      type="number"
                      inputMode="numeric"
                      maxLength={11}
                      pattern="[0-9]*"
                      placeholder="RUC"
                      value={data.ruc}
                      autoComplete="ruc"
                      onChange={(e) => { const onlyNums = e.target.value.replace(/\D/g, "").slice(0, 11);
                        setData("ruc", onlyNums);}}
                      className={'input-modal '+classInput+`${errors.ruc && ' ring-red-500 border-red-200'}`}
                    />
                  {errors.ruc && (
                    <div className="error">{errors.ruc}</div>
                    )}
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="col-span-2">
                    <label htmlFor="tipo" className="block text-sm font-medium text-gray-900 dark:text-white">Tipo</label>
                    <input
                      id="tipo"
                      name="tipo"
                      type="text"
                      maxLength={50}
                      placeholder="Tipo"
                      value={data.tipo}
                      autoComplete="tipo"
                      onChange={(e) => {
                        setData("tipo", e.target.value)}}
                      className={'input-modal '+classInput+`${errors.tipo && ' ring-red-500 border-red-200'}`}
                    />
                  {errors.tipo && (
                    <div className="error">{errors.tipo}</div>
                    )}
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="col-span-2">
                    <label htmlFor="descripcion" className="block text-sm font-medium text-gray-900 dark:text-white">Descripcion</label>
                    <textarea
                      id="descripcion"
                      name="descripcion"
                      placeholder="Descripcion de la Marca"
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
