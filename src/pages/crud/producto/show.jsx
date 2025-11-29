// ModalShow.jsx
import { AppBtnX } from "../../../components/form/btn";
import dayjs from 'dayjs';

export default function ModalShow({
  title,
  modules,
  value,
  handleClose }) {

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
              <div className="grid grid-cols-3 gap-y-1 gap-x-4">
                <div className="text-sm font-medium" >ID:</div>
                <div className="col-span-2 text-gray-500 dark:text-gray-400">{value.id}</div>
                <div className="row-start-2">Codigo:</div>
                <div className="row-start-2 col-span-2 text-gray-500 dark:text-gray-400 ">{value.codigoBarra}4</div>
                <div className="row-start-3">Nombre:</div>
                <div className="row-start-3 col-span-2 text-gray-500 dark:text-gray-400">{value.nombre}</div>
                <div className="row-start-4">Descripcion:</div>
                <div className="row-start-4 col-span-2 text-gray-500 dark:text-gray-400">{value.descripcion}8</div>
                <div className="row-start-5">MIN - MAX</div>
                <div className="row-start-5 col-span-2 text-gray-500 dark:text-gray-400">{value.minimo+" - "+value.maximo}</div>
                <div className="row-start-6">Fecha</div>
                <div className="row-start-6 col-span-2 text-gray-500 dark:text-gray-400">{dayjs(value.fecha).format('YYYY/MM/DD')}</div>
                <div className="row-start-7">Activo</div>
                <div className="row-start-7 col-span-2 text-gray-500 dark:text-gray-400">{value?.activo? "Disponible" : "No Disponible"}</div>
                <div className="row-start-8">Precio</div>
                <div className="row-start-8 col-span-2 text-gray-500 dark:text-gray-400">S/. {value.precio}</div>
                <div className="row-start-9">Medida</div>
                <div className="row-start-9 col-span-2 text-gray-500 dark:text-gray-400">S/. {value.medidaId}</div>
                <div className="row-start-10">Marca</div>
                <div className="row-start-10 col-span-2 text-gray-500 dark:text-gray-400">{value.marcaId}</div>
                <div className="row-start-11">Categoría</div>
                <div className="row-start-11 col-span-2 text-gray-500 dark:text-gray-400">{value.categoriaID}</div>
                <div className="row-start-12">Presentación</div>
                <div className="row-start-12 col-span-2 text-gray-500 dark:text-gray-400">{value.presentacionId}</div>
              </div>
                
              <div className="grid gap-4 mb-4 grid-cols-2">
                <div className="grid grid-cols-2">
                  <div className="block mb-2 mr-2 text-sm font-medium">Updated At: </div>
                  <div className="text-gray-500 dark:text-gray-400">{dayjs(value.updated_at).format('YYYY/MM/DD HH:mm:ss')}</div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="block mb-2 mr-2 text-sm font-medium">Created At: </div>
                  <div className="text-gray-500 dark:text-gray-400">{dayjs(value.created_at).format('YYYY/MM/DD HH:mm:ss')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
