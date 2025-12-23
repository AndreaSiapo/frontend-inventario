//Create.jsx
import { useForm }   from "../../../hook/useHandler";
import { AppBtnCodeBarDownload, AppBtnCodeBar } from "../../../components/html/btn";
import { AppBtnX }   from "../../../components/form/btn";
import { appRoutes } from "../../../routes/appRoutes";

export default function ModalCreate( {
  modules,
  handleClose,
  title,
  classInput="",
  inert,
  onSuccess
  }) {
    const { data, setData, post, processing, errors, setErrors, reset} = useForm({
        codigoBarra: "",
        nombre:      "",
        detalle:     "",
    });

    const handleSubmit = async (e) => {
      e.preventDefault();
      const newErrors = {};

      if (!data.codigoBarra?.trim()) 
        newErrors.codigoBarra = "El código es obligatorio";
      if (!data.nombre?.trim())
        newErrors.nombre = "El nombre es obligatorio";

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
            <AppBtnX $route={appRoutes.presentacion} handleClose={handleClose} />
          </div>
          {/* Modal body */}
          {data.codigoBarra && (
            <AppBtnCodeBar codigo={data.codigoBarra} />
          )}
          <form onSubmit={handleSubmit} className="p-4 w-full flex">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              <div className="flex flex-col">
                <div className="col-span-2">
                  <label htmlFor="nombre" className="block text-sm font-medium text-gray-900 dark:text-white">Nombre</label>
                  <input
                    id="nombre"
                    name="nombre"
                    type="text"
                    placeholder="Nombre"
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
              <div className="flex flex-col col-span-2">
                <label htmlFor="detalle" className="block text-sm font-medium text-gray-900 dark:text-white">Detalle</label>
                <textarea
                  id="detalle"
                  name="detalle"
                  placeholder="Detalle de presentación"
                  value={data.detalle}
                  autoComplete="detalle"
                  onChange={(e) => setData("detalle", e.target.value)}
                  className={'input-modal focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500'+`${errors.detalle && ' ring-red-500 border-red-200'}`}
                />
                {errors.detalle && (
                  <div className="error">{errors.detalle}</div>
                )}
              </div>
              <div className="flex flex-col">
                <div className="col-span-2">
                  <button type="submit" className="submit-modal mt-4 col-span-2">
                    Crear {title.toLowerCase()}
                  </button>
                </div>
              </div>
            </div>
            <br></br>
          </form>
        </div>
      </div>
    </div>
  );
}
