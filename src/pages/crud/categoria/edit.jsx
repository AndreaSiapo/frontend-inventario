//edit.jsx
import { useForm, useResource  } from "@/hook/useHandler";
import { getCategoriasFull } from "@/api/categorias";
import { AppBtnX }           from "@form/btn";
import RadioTree             from "@form/radioTree";

export default function ModalEdit({
    title,
    modules,
    value,
    handleClose,
    handleEdit,
    inert
 }) {
    const { data, setData, processing, errors, setErrors } = useForm({
      nombre:           value?.nombre || "",
      detalle:          value?.detalle || "",
      categoriaPadreId: value?.categoriaPadreId || "",
    });
    
    const onSubmit = (e) => {
      e.preventDefault();
      const newErrors = {};

      if (!data.nombre?.trim()) 
        newErrors.nombre = "El nombre es obligatorio.";
        handleEdit(value.id, data);
    };

    const { resource: categoriasFull }     = useResource(getCategoriasFull);

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
                  <div className="block text-sm font-medium text-gray-900 dark:text-white">Categoría Padre</div>
                    <RadioTree
                    data={categoriasFull.data || []}
                    idField="id"
                    parentField="categoriaPadreId"
                    labelField="nombre"
                    value={data.categoriaPadreId || ""}
                    onChange={(val) => setData("categoriaPadreId", val)}
                    rootLabel="(Sin categoría)"
                    />
                  </div>
                </div>
              <div className="">
                <div>
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
                <div className="">
                  <label htmlFor="detalle" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Detalle</label>
                  <textarea
                    id="detalle"
                    name="detalle"
                    placeholder={"Ponga el detalle de " + title}
                    value={data.detalle}
                    autoComplete="detalle"
                    onChange={(e) => setData("detalle", e.target.value)}
                    className={'input-modal focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500'+`${errors.detalle && ' ring-red-500 border-red-200'}`}
                  />
                </div>
              </div>
              <div className="colspan-2 items-center">
                <button type="submit" className="submit-modal">
                  Editar {title.toLowerCase()}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
