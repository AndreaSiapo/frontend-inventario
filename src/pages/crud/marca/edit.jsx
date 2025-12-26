//edit.jsx
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
    const { data, setData, processing, errors, setErrors } = useForm({
         nombre:      value?.nombre      || "",
         abreviado:   value?.abreviado   || "",
         ruc:         value?.ruc         || "",
         descripcion: value?.descripcion || "",
         tipo:        value?.tipo        || ""
    });
    
    const onSubmit = (e) => {
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
                  <label htmlFor="nombre" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre</label>
                  <input id="nombre" name="nombre" type="text"
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
                  <label htmlFor="abreviado" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Abreviado</label>
                  <input
                    type="text"
                    name="abreviado"
                    id="abreviado"
                    className="input-modal"
                    placeholder={"Abreviaruta "}
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
                  <label htmlFor="ruc" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">RUC</label>
                  <input
                    id="ruc"
                    name="ruc"
                    type="number"
                    inputMode="numeric"
                    maxLength={11}
                    pattern="[0-9]*"
                    className="input-modal"
                    placeholder={"Ponga el ruc de " + title}
                    value={data.ruc}
                    onChange={(e) => { const onlyNums = e.target.value.replace(/\D/g, "").slice(0, 11);
                      setData("ruc", onlyNums);}}
                    required
                  />
                  {errors.ruc && (
                    <div className="error">{errors.ruc}</div>
                    )}
                </div>
              </div>
              <div className="flex flex-col">
                <div className="col-span-2">
                  <label htmlFor="tipo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tipo</label>
                  <input
                    id="tipo"
                    name="tipo"
                    type="text"
                    maxLength={50}
                    className="input-modal"
                    placeholder={"Tipo"}
                    value={data.tipo}
                    onChange={(e) => setData("tipo", e.target.value)}
                    required
                  />
                  {errors.tipo && (
                    <div className="error">{errors.tipo}</div>
                    )}
                </div>
              </div>
            </div>
            <div className="flex flex-col mt-2">
              <div className="col-span-2">
                <label htmlFor="descripcion" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Descripcion</label>
                <textarea
                  name="descripcion"
                  id="descripcion"
                  className="input-modal"
                  placeholder={"Descripcion"}
                  value={data.descripcion}
                  onChange={(e) => setData("descripcion", e.target.value)}
                  required
                />
                {errors.descripcion && (
                  <div className="error">{errors.descripcion}</div>
                  )}
              </div>
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
