// ModalShow.jsx
import { AppBtnX } from "@form/btn";
import dayjs from 'dayjs';
import { getBodega }        from "@/api/bodegas";
import { getLote }          from "@/api/lotes";
import { getProducto }      from "@/api/productos";
import { useMoneda }        from "@/hook/useHandler";

export default function ModalShow({
  title,
  modules,
  value,
  handleClose }) {
    const [bodega,   setBodega]   = useState(null);
    const [lote,     setLote]     = useState(null);
    const [producto, setProducto] = useState(null);
    const [loadingBodega,   setLoadingBodega]   = useState(false);
    const [loadingLote,     setLoadingLote]     = useState(false);
    const [loadingProducto, setLoadingProducto] = useState(false);
    const Moneda = useMoneda();

    useEffect(() => {
      if (value?.bodegaId) {
        setLoadingBodega(true);
        getBodega(value.bodegaId)
          .then(res => setBodega(res.data ?? res))
          .finally(() => setLoadingBodega(false));
      }
      if (value?.loteId) {
        setLoadingLote(true);
        getLote(value.loteId)
          .then(res => setLote(res.data ?? res))
          .finally(() => setLoadingLote(false));
      }
      if (value?.productoId) {
        setLoadingProducto(true);
        getProducto(value.productoId)
          .then(res => setProducto(res.data ?? res))
          .finally(() => setLoadingProducto(false));
      }
    }, [value?.bodegaId, value?.loteId, value?.productoId]);

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
                  <div className="block mb-2 mr-2 text-sm font-medium">Bodega Id: </div>
                  <div className="text-gray-500 dark:text-gray-400">{value.bodegaId}</div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="block mb-2 mr-2 text-sm font-medium">Bodega: </div>
                  <div className="text-gray-500 dark:text-gray-400">
                    {loadingBodega
                      ? "Cargando..."
                      : bodega?.nombre ?? "—"}</div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="block mb-2 mr-2 text-sm font-medium">Lote Id: </div>
                  <div className="text-gray-500 dark:text-gray-400">{value.loteId}</div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="block mb-2 mr-2 text-sm font-medium">Lote: </div>
                  <div className="text-gray-500 dark:text-gray-400">
                    {loadingLote
                      ? "Cargando..."
                      : lote?.codigoLote ?? "—"}</div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="block mb-2 mr-2 text-sm font-medium">Producto Id: </div>
                  <div className="text-gray-500 dark:text-gray-400">{value.productoId}</div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="block mb-2 mr-2 text-sm font-medium">Producto: </div>
                  <div className="text-gray-500 dark:text-gray-400">
                    {loadingProducto
                      ? "Cargando..."
                      : producto?.nombre ?? "—"}</div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="block mb-2 mr-2 text-sm font-medium">Stock Minimo: </div>
                  <div className="text-gray-500 dark:text-gray-400">{value.stockMinimo}</div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="block mb-2 mr-2 text-sm font-medium">Stock Maximo: </div>
                  <div className="text-gray-500 dark:text-gray-400">{value.stockMaximo}</div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="block mb-2 mr-2 text-sm font-medium">Costo Promedio: </div>
                  <div className="text-gray-500 dark:text-gray-400">{value.costoPromedio}</div>
                </div>
                <div className="grid grid-cols-2 col-span-2">
                  <div className="block mb-2 mr-2 text-sm font-medium">Fecha Último Movimiento: </div>
                  <br></br>
                  <div className="text-gray-500 dark:text-gray-400">{value.fechaUltimoMovimiento==null ? "Error sin fecha": dayjs(value.fechaUltimoMovimiento).format('YYYY/MM/DD HH:mm:ss')}</div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="block mb-2 mr-2 text-sm font-medium">Costo Promedio: </div>
                  <div className="text-gray-500 dark:text-gray-400">{value.costoPromedio}</div>
                </div>
                <div className="col-span-2 grid grid-cols-2">
                  <div className="block mb-2 mr-2 text-sm font-medium">Actualizado En: </div>
                  <div className="text-gray-500 dark:text-gray-400">{value.actualizadoEn==null ? "Error sin fecha": dayjs(value.actualizadoEn).format('YYYY/MM/DD HH:mm:ss')}</div>
                </div>
                <div className="col-span-2 grid grid-cols-2">
                  <div className="block mb-2 mr-2 text-sm font-medium">Creado  En: </div>
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
