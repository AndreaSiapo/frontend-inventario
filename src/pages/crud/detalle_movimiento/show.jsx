// ModalShow.jsx
import { AppBtnX } from "@form/btn";
import dayjs from 'dayjs';
import { getMovimiento } from "@/api/movimientos";
import { getProducto }   from "@/api/productos";
import { useMoneda }     from "@/hook/useHandler";

export default function ModalShow({
  title,
  modules,
  value,
  handleClose }) {
    const [movimiento, setMovimiento] = useState(null);
    const [producto, setProducto]     = useState(null);
    const [loadingMovimiento, setMovimientoLoading] = useState(false);
    const [loadingProducto, setProductoLoading]     = useState(false);
    const Moneda = useMoneda();

    useEffect(() => {
      if (value?.movimientoId) {
        setMovimientoLoading(true);
        getMovimiento(value.movimientoId)
          .then(res => setMovimiento(res.data ?? res))
          .finally(() => setMovimientoLoading(false));
      }
      if (value?.productoId) {
        setProductoLoading(true);
        getProducto(value.productoId)
          .then(res => setProducto(res.data ?? res))
          .finally(() => setProductoLoading(false));
      }
    }, [value?.movimientoId, value?.productoId]);

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
                  <div className="block mb-2 mr-2 text-sm font-medium">Movimiento Id: </div>
                  <div className="text-gray-500 dark:text-gray-400">{value.movimientoId}</div>
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
                <div className="grid grid-cols-2 col-span-2">
                  <div className="block mb-2 mr-2 text-sm font-medium">Detalle:</div>
                  <br></br>
                  <div className="text-gray-500 dark:text-gray-400">{value.detalle}</div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="block mb-2 mr-2 text-sm font-medium">Cantidad:</div>
                  <div className="text-gray-500 dark:text-gray-400">{value.cantidad}</div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="block mb-2 mr-2 text-sm font-medium">Valor: </div>
                  <div className="text-gray-500 dark:text-gray-400">{Moneda(value.valor)}</div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="block mb-2 mr-2 text-sm font-medium">Subtotal: </div>
                  <br></br>
                  <div className="text-gray-500 dark:text-gray-400">{Moneda(value.subtotal)}</div>
                </div>
                <div className="col-span-2 grid grid-cols-2">
                  <div className="block mb-2 mr-2 text-sm font-medium">Fecha: </div>
                  <div className="text-gray-500 dark:text-gray-400">{value.fecha==null ? "Error sin fecha": dayjs(value.fecha).format('YYYY/MM/DD HH:mm:ss')}</div>
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
