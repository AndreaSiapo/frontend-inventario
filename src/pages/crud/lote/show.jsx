// ModalShow.jsx
import { AppBtnX }              from "@form/btn";
import { useEffect, useState }  from "react";
import dayjs                    from 'dayjs';
import { useMoneda }            from "@/hook/useHandler";
import { getProducto }          from "@/api/productos";

export default function ModalShow({
  title,
  modules,
  value,
  handleClose }) {
      const [producto, setProducto]   = useState(null);
      const [loadingProducto, setLoadingProducto]     = useState(false);

    const Moneda = useMoneda();

    useEffect(() => {
      if (value?.productoId) {
        setLoadingProducto(true);
        getProducto(value.productoId)
          .then(res => setProducto(res.data ?? res))
          .finally(() => setLoadingProducto(false));
      }
    }, [value?.productoId]);

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
                <div className="row-start-2">Producto Id:</div>
                <div className="row-start-2 col-span-2 text-gray-500 dark:text-gray-400 ">{value.productoId}</div>
                <div className="row-start-2">Producto:</div>
                <div className="row-start-2 col-span-2 text-gray-500 dark:text-gray-400 ">
                  {loadingProducto
                      ? "Cargando..."
                      : producto?.nombre ?? "—"}</div>
                <div className="row-start-3">Codigo Lote:</div>
                <div className="row-start-3 col-span-2 text-gray-500 dark:text-gray-400">{value.codigoLote}</div>
                <div className="row-start-4">Fecha de Vencimiento:</div>
                <div className="row-start-4 col-span-2 text-gray-500 dark:text-gray-400">{dayjs(value.fechaVencimiento).format('YYYY/MM/DD')}</div>
                <div className="row-start-5">Cantidad Inicial</div>
                <div className="row-start-5 col-span-2 text-gray-500 dark:text-gray-400">{value.cantidadInicial}</div>
                <div className="row-start-6">Cantidad Actual:</div>
                <div className="row-start-6 col-span-2 text-gray-500 dark:text-gray-400 ">{value.cantidadActual}</div>
                <div className="row-start-7">Costo Unitario</div>
                <div className="row-start-7 col-span-2 text-gray-500 dark:text-gray-400 ">{Moneda(value.costoUnitario)}</div>
                <div className="row-start-8">Costo Total</div>
                <div className="row-start-8 col-span-2 text-gray-500 dark:text-gray-400 ">{Moneda(value.costoTotal)}</div>
                <div className="row-start-9">Fecha Ingreso:</div>
                <div className="row-start-9 col-span-2 text-gray-500 dark:text-gray-400">{dayjs(value.fechaIngreso).format('YYYY/MM/DD')}</div>
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
