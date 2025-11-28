//Create.jsx
import { useEffect, useState } from "react";
import { useForm } from "../../../hook/useHandler";
import { AppBtnX } from "../../../components/form/btn";
import IconVRight from "../../../components/icons/actions/v-right";
import { getCategoriasFull } from "../../../api/categorias";

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

    const [categoriasFull, setCategoriasFull] = useState([]);

    useEffect(() => {
      async function fetchCategorias() {
        const res = await getCategoriasFull();
        setCategoriasFull(res.data ?? []); // 👈 aquí está la magia
      }
      fetchCategorias();
    }, []);


    function buildHierarchy(list) {
      const safeList = Array.isArray(list) ? list : []; // 👈 protección

      const map = new Map(safeList.map(c => [c.id, { ...c, children: [], level: 0 }]));

      let rootItems = [];

      map.forEach(item => {
        if (item.categoriaPadreId) {
          const parent = map.get(item.categoriaPadreId);
          if (parent) {
            item.level = parent.level + 1;
            parent.children.push(item);
          }
        } else {
          rootItems.push(item);
        }
      });

      // ✅ marcar si tiene hijos
      map.forEach(item => {
        item.hasChildren = item.children.length > 0;
      });

      // flatten preserving tree order
      const result = [];
      const traverse = (node) => {
        result.push(node);
        node.children.forEach(traverse);
      };
      rootItems.forEach(traverse);
      return result;
    }

    const categoriasOrdenadas = buildHierarchy(categoriasFull || []);

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
                  <ul className="border border-gray-600 rounded-lg max-h-40 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800">
                    <li key="0">
                      <input type="radio" id="opcion0" name="categoriaPadreId" value="" className="peer hidden" onChange={(e) => setData("categoriaPadreId", "")}/>
                      <label htmlFor="opcion0" className="w-full pl-2 cursor-pointer 
                        border-gray-300 bg-white transition
                        text-gray-700 hover:bg-gray-200
                        peer-checked:bg-blue-50 peer-checked:border-blue-500 peer-checked:text-blue-700
                        peer-has-checked:ring-2 peer-has-checked:ring-blue-300
                        dark:border-gray-600 dark:bg-gray-700
                        dark:text-gray-200 dark:hover:bg-gray-800
                        dark:peer-checked:bg-blue-900 dark:peer-checked:border-blue-400 dark:peer-checked:text-blue-300
                        dark:peer-has-checked:ring-blue-600
                        rounded-t-lg"
                      > (Sin categoria)</label>
                    </li>
                    {categoriasOrdenadas.map((c, index) => (
                    <li key={c.id}>
                      <input type="radio" id={"padre_"+c.id} name="categoriaPadreId" value={c.id} className="peer hidden" onChange={(e) => setData("categoriaPadreId", e.target.value)}/>
                      <label htmlFor={"padre_"+c.id} 
                        className={`flex w-full cursor-pointer border-gray-300 bg-white transition text-gray-700 hover:bg-gray-200 peer-checked:bg-blue-50 peer-checked:border-blue-500 peer-checked:text-blue-700 peer-has-checked:ring-2 peer-has-checked:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 dark:peer-checked:bg-blue-900 dark:peer-checked:border-blue-400 dark:peer-checked:text-blue-300 dark:peer-has-checked:ring-blue-600 ${index === categoriasOrdenadas.length - 1 ? "rounded-b-lg" : ""}`}
                      >
                        <div className={`pl-2`} style={{ paddingLeft: `${c.level * 12 + 8}px` }}>

                          {c.hasChildren ? (
                            <IconVRight className="inline-block w-4 text-gray-500 dark:text-gray-300" />
                          ) : null}
                        {c.nombre}</div>
                      </label>
                    </li>
                    ))}
                  </ul>
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
