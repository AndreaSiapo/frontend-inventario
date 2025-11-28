//Create.jsx
import { useForm } from "../../../hook/useHandler";
import { AppBtnX } from "../../../components/form/btn";

export default function ModalCreate( {
  modules,
  handleClose,
  title,
  classInput="",
  inert,
  onSuccess
  }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        nombre: "",
        abreviado: "",
        ruc: "",
        descripcion: "",
        tipo: ""
    });

    const handleSubmit = async (e) => {
      e.preventDefault();

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
              <AppBtnX $route={'/tablas/presentaciones'} handleClose={handleClose} />
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
                    <div className="text-red-500 text-sm mt-1">{errors.nombre}</div>
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
                    <div className="text-red-500 text-sm mt-1">{errors.abreviado}</div>
                    )}
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="col-span-2">
                    <label htmlFor="ruc" className="block text-sm font-medium text-gray-900 dark:text-white">RUC</label>
                    <input
                      id="ruc"
                      name="ruc"
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      placeholder="RUC"
                      value={data.ruc}
                      autoComplete="ruc"
                      onChange={(e) => { const onlyNums = e.target.value.replace(/\D/g, "");
                        setData("ruc", onlyNums);}}
                      className={'input-modal '+classInput+`${errors.ruc && ' ring-red-500 border-red-200'}`}
                    />
                  {errors.ruc && (
                    <div className="text-red-500 text-sm mt-1">{errors.ruc}</div>
                    )}
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="col-span-2">
                    <label htmlFor="descripcion" className="block text-sm font-medium text-gray-900 dark:text-white">Descripcion</label>
                    <input
                      id="descripcion"
                      name="descripcion"
                      type="text"
                      placeholder="Descripcion de la Marca"
                      value={data.descripcion}
                      autoComplete="descripcion"
                      onChange={(e) => setData("descripcion", e.target.value)}
                      className={'input-modal '+classInput+`${errors.descripcion && ' ring-red-500 border-red-200'}`}
                    />
                  {errors.descripcion && (
                    <div className="text-red-500 text-sm mt-1">{errors.descripcion}</div>
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
                      placeholder="Tipo de Marca"
                      value={data.tipo}
                      autoComplete="tipo"
                      onChange={(e) => setData("tipo", e.target.value)}
                      className={'input-modal '+classInput+`${errors.tipo && ' ring-red-500 border-red-200'}`}
                    />
                  {errors.tipo && (
                    <div className="text-red-500 text-sm mt-1">{errors.tipo}</div>
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
