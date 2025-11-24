// src/pages/crud/u_medida/edit.jsx
import AppBtnX from "../../../components/form/btnX";
import useForm from "../../../hook/useForm";

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
            <div className="grid gap-4 mb-4 grid-cols-2">
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
                <label htmlFor="abreviado" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Abreviado</label>
                <input
                  type="text"
                  name="abreviado"
                  id="abreviado"
                  className="input-modal"
                  placeholder={"Ponga el abreviado de " + title}
                  value={data.abreviado}
                  onChange={(e) => setData("abreviado", e.target.value)}
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
