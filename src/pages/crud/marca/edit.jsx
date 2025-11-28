//edit.jsx
import { useForm } from "../../../hook/useHandler";
import { AppBtnX } from "../../../components/form/btn";

export default function ModalEdit({
    title,
    modules,
    value,
    handleClose,
    handleEdit,
    inert
 }) {
     const { data, setData, processing, errors } = useForm({
         nombre: value?.nombre || "",
         abreviado: value?.abreviado || "",
         ruc: value?.ruc || "",
         descripcion: value?.descripcion || "",
         tipo: value?.tipo || ""
     });
    
     const onSubmit = (e) => {
         e.preventDefault();
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
                </div>
              </div>
              <div className="flex flex-col">
                <div className="col-span-2">
                  <label htmlFor="ruc" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">RUC</label>
                  <input
                    type="text"
                    name="ruc"
                    id="ruc"
                    className="input-modal"
                    placeholder={"Ponga el ruc de " + title}
                    value={data.ruc}
                    onChange={(e) => setData("ruc", e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <div className="col-span-2">
                  <label htmlFor="tipo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tipo</label>
                  <input
                    type="text"
                    name="tipo"
                    id="tipo"
                    className="input-modal"
                    placeholder={"Tipo"}
                    value={data.tipo}
                    onChange={(e) => setData("tipo", e.target.value)}
                    required
                  />
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
