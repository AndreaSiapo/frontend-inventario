//edit.jsx
import { useForm } from "@/hook/useHandler";
import { AppBtnCodeBarDownload, AppBtnCodeBar } from "@html/btn";
import { AppBtnX } from "@form/btn";
import { appRoutes } from "@route";

export default function ModalEdit({
    title,
    modules,
    value,
    handleClose,
    handleEdit,
    inert
 }) {
     const { data, setData, processing, errors, setErrors } = useForm({
        codigoBarra: "",
        nombre: value?.nombre || "",
        detalle: value?.detalle || "",
     });
    
     const onSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};

        if (!data.codigoBarra?.trim()) 
          newErrors.codigoBarra = "El código es obligatorio";
        if (!data.nombre?.trim())
          newErrors.nombre = "El nombre es obligatorio";

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
            <AppBtnX $route={appRoutes.presentacion} handleClose={handleClose} />
          </div>
          {/* Modal body */}
          {data.codigoBarra && (
            <AppBtnCodeBar codigo={data.codigoBarra} />
          )}
          <form className="p-4 md:p-5" onSubmit={onSubmit}>
            <div className="grid gap-4 mb-4 grid-cols-2">
              <div className="flex flex-col">
                <div className="col-span-2">
                  <label htmlFor="codigoBarra" className="block text-label">Código</label>
                  <input id="codigoBarra" name="codigoBarra" type="text"
                    placeholder="Codigo"
                    value={data.codigoBarra}
                    autoComplete="codigoBarra"
                    onChange={(e) => setData("codigoBarra", e.target.value)}
                    className={'input-modal focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500'+`${errors.codigoBarra && ' ring-red-500 border-red-200'}`}
                  />
                  {errors.codigoBarra && (
                    <div className="error">{errors.codigoBarra}</div>
                  )}
                </div>
              </div>
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
              </div>
            </div>
            <div className="grid gap-4 mb-4 grid-cols-2">
              <div className="col-span-2">
                <label htmlFor="detalle" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Detalle</label>
                <input
                  type="text"
                  name="detalle"
                  id="detalle"
                  className="input-modal"
                  placeholder={"Ponga el detalle de " + title}
                  value={data.detalle}
                  onChange={(e) => setData("detalle", e.target.value)}
                  required
                />
              </div>
            </div>
            <button type="submit" className="submit-modal">
              Editar {title.toLowerCase()}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
