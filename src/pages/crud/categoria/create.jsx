//Create.jsx
import { useForm, useResource } from "../../../hook/useHandler";
import { AppBtnX } from "../../../components/form/btn";
import { getCategoriasFull } from "../../../api/categorias";
import RadioTree from "../../../components/form/radioTree";

export default function ModalCreate( {
  modules,
  handleClose,
  title,
  classInput="",
  inert,
  onSuccess,
  categoria = [],
  }) {
    const { data, setData, post, processing, errors, reset} = useForm({
        nombre: "",
        detalle: "",
        categoriaPadreId: "",
    });

    const handleSubmit = async (e) => {
      e.preventDefault();

      if (onSuccess) onSuccess(data);
      handleClose();
    };

    const { resource: categoriasFull }     = useResource(getCategoriasFull);

  return (
    <div id="crud-modal" inert={inert} tabIndex="-1" className="crud-modal">
      <div className="relative p-4 w-full max-w-md max-h-full">
        {/* Modal content */}
        <div className="modal-content">
          {/* Modal header */}
          <div className="modal-header">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white"> Crear {title}: </h3>
            <AppBtnX $route={modules+'.index'} handleClose={handleClose} />
          </div>
          {/* Modal body */}
          <form onSubmit={handleSubmit} className="p-4 md:p-5">
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
                  {errors.categoriaPadreId && (
                    <div className="text-red-500 text-sm mt-1">{errors.categoriaPadreId}</div>
                  )}
                </div>
              </div>
              <div className="">
                <div>
                  <label htmlFor="nombre" className="block text-sm font-medium text-gray-900 dark:text-white">Nombre</label>
                  <input
                    id="nombre"
                    name="nombre"
                    type="text"
                    placeholder="Nombre de la Unidad de Medida"
                    value={data.nombre}
                    autoComplete="nombre"
                    onChange={(e) => setData("nombre", e.target.value)}
                    className={'input-modal focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500'+`${errors.nombre && ' ring-red-500 border-red-200'}`}
                  />
                  {errors.nombre && (
                    <div className="text-red-500 text-sm mt-1">{errors.nombre}</div>
                  )}
                </div>
                <div>
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
                    <div className="text-red-500 text-sm mt-1">{errors.detalle}</div>
                  )}
                </div>
              </div>
              <div className="colspan-2 ">
                <button type="submit" className="submit-modal mt-4 col-span-2">
                  Crear {title.toLowerCase()}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
