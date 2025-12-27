// ModalShow.jsx
import { AppBtnX } from "@form/btn";
import dayjs from 'dayjs';
import { getDetalleMovimientos } from "@/api/detalleMovimientos";
import { useForm, useResource } from "@/hook/useHandler";

export default function ModalShow({
  title,
  modules,
  value,
  handleClose }) {

  const [detalleMovimiento, setDetalleMovimiento] = useState(null);
  const [ loadingDetalleMovimiento, setLoadingDetalleMovimiento] = useState(false);

  const { resource: detalleMovimientos, fetchResource: fetchDetalleMovimientos, error  } = useResource(getDetalleMovimientos);

  const currentFilters = detalleMovimientos.filters;

  return (
    <>
      <div id="crud-modal" tabIndex="-1" className="crud-modal">
        <div className="relative p-4 w-full max-w-md max-h-full">
          {/* Modal content */}
          <div className="modal-content">
          {/* Modal header */}
           <div className="modal-header">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white"> Ver {title}: </h3>
            <AppBtnX $route={modules+'.index'} handleClose={handleClose} />
          </div>
          {/* Modal body */}
          <div className="p-4 md:p-5 text-gray-900 dark:text-white">
            <div className="grid gap-4 mb-4 grid-cols-2">
              <div className="grid grid-cols-2">
                <div className="block mb-2 mr-2 text-sm font-medium ">Id: </div>
                  <div className="text-gray-500 dark:text-gray-400">{value.id}</div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="block mb-2 mr-2 text-sm font-medium">Codigo: </div>
                  <div className="text-gray-500 dark:text-gray-400">{value.codigo}</div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="block mb-2 mr-2 text-sm font-medium">Nombre: </div>
                  <div className="text-gray-500 dark:text-gray-400">{value.nombre}</div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="block mb-2 mr-2 text-sm font-medium">Referencia: </div>
                  <div className="text-gray-500 dark:text-gray-400">{value.referencia}</div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="block mb-2 mr-2 text-sm font-medium">Plazo: </div>
                  <div className="text-gray-500 dark:text-gray-400">{value.plazo}</div>
                </div>
                <div className="grid grid-cols-2 col-span-2">
                  <div className="block mb-2 mr-2 text-sm font-medium">Descripcion: </div>
                  <br></br>
                  <div className="text-gray-500 dark:text-gray-400">{value.descripcion}</div>
                </div>
                <div className="col-span-2 grid grid-cols-2">
                  <div className="block mb-2 mr-2 text-sm font-medium">Updated At: </div>
                  <div className="text-gray-500 dark:text-gray-400">{value.actualizadoEn==null ? "Error sin fecha": dayjs(value.actualizadoEn).format('YYYY/MM/DD HH:mm:ss')}</div>
                </div>
                <div className="col-span-2 grid grid-cols-2">
                  <div className="block mb-2 mr-2 text-sm font-medium">Created At: </div>
                  <div className="text-gray-500 dark:text-gray-400">{value.creadoEn==null ? "Error sin fecha": dayjs(value.creadoEn).format('YYYY/MM/DD HH:mm:ss')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
