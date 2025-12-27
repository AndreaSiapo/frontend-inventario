// ModalShow.jsx
import { AppBtnX } from "@form/btn";
import dayjs from 'dayjs';
import { useEffect, useState } from "react";
import { getMarca }         from "@/api/marcas"
import { getUnidadMedida }  from "@/api/umedidas"
import { getCategoria }     from "@/api/categorias"
import { getPresentacion }  from "@/api/presentaciones"

export default function ModalShow({
  title,
  modules,
  value,
  handleClose }) {
    const [marca, setMarca]         = useState(null);
    const [medida, setMedida]       = useState(null);
    const [categoria, setCategoria] = useState(null);
    const [presentacion, setPresentacion]         = useState(null);
    const [loadingMarca, setLoadingMarca]         = useState(false);
    const [loadingMedida, setLoadingMedida]       = useState(false);
    const [loadingCategoria, setLoadingCategoria] = useState(false);
    const [loadingPresentacion, setLoadingPresentacion] = useState(false);

    useEffect(() => {
      if (value?.marcaId) {
        setLoadingMarca(true);
        getMarca(value.marcaId)
          .then(res => setMarca(res.data ?? res))
          .finally(() => setLoadingMarca(false));
      }
      
      if (value?.medidaId) {
        setLoadingMedida(true);
        getUnidadMedida(value.medidaId)
          .then(res => setMedida(res.data ?? res))
          .finally(() => setLoadingMedida(false));
      }

      if (value?.categoriaId) {
        setLoadingCategoria(true);
        getCategoria(value.categoriaId)
          .then(res => setCategoria(res.data ?? res))
          .finally(() => setLoadingCategoria(false));
      }

      if (value?.presentacionId) {
        setLoadingPresentacion(true);
        getPresentacion(value.presentacionId)
          .then(res => setPresentacion(res.data ?? res))
          .finally(() => setLoadingPresentacion(false));
      }
    }, [value?.productoId, value?.presentacionId, value?.categoriaId, value?.medidaId, value?.marcaId]);

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
                <div className="row-start-6 col-span-2 text-gray-500 dark:text-gray-400">{value.fecha==null ? "Error sin fecha": dayjs(value.fecha).format('YYYY/MM/DD')}</div>
                <div className="row-start-7">Activo</div>
                <div className="row-start-7 col-span-2 text-gray-500 dark:text-gray-400">{value?.activo? "Disponible" : "No Disponible"}</div>
                <div className="row-start-8">Precio</div>
                <div className="row-start-8 col-span-2 text-gray-500 dark:text-gray-400">S/. {value.precio}</div>
                <div className="row-start-9">Medida</div>
                <div className="row-start-9 col-span-2 text-gray-500 dark:text-gray-400">
                    { loadingMedida
                      ? "Cargando..."
                      : medida?.nombre ?? "—"}</div>
                <div className="row-start-10">Marca</div>
                <div className="row-start-10 col-span-2 text-gray-500 dark:text-gray-400">
                    { loadingMarca
                      ? "Cargando..."
                      : marca?.nombre ?? "—"}</div>
                <div className="row-start-11">Categoría</div>
                <div className="row-start-11 col-span-2 text-gray-500 dark:text-gray-400">
                    { loadingCategoria
                      ? "Cargando..."
                      : categoria?.nombre ?? "—"}</div>
                <div className="row-start-12">Presentación</div>
                <div className="row-start-12 col-span-2 text-gray-500 dark:text-gray-400">
                    { loadingPresentacion
                      ? "Cargando..."
                      : presentacion?.nombre ?? "—"}</div>
              </div>
              <div className="grid gap-4 mb-4 grid-cols-2">
                <div className="grid grid-cols-2">
                  <div className="block mb-2 mr-2 text-sm font-medium">Actualizado En: </div>
                  <div className="text-gray-500 dark:text-gray-400">{value.actualizadoEn==null ? "Error sin fecha": dayjs(value.actualizadoEn).format('YYYY/MM/DD HH:mm:ss')}</div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="block mb-2 mr-2 text-sm font-medium">Creado En: </div>
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
