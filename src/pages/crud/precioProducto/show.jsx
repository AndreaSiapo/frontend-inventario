// ModalShow.jsx
import dayjs                    from 'dayjs';
import { useEffect, useState }  from "react";
import { AppBtnX }              from "@form/btn";
import { getProducto }          from "@/api/productos";
import { getProveedor }         from "@/api/proveedores";
import { getProductoProveedor } from "@/api/productoProveedores";
import { useMoneda }            from "@/hook/useHandler";

export default function ModalShow({
  title,
  modules,
  value,
  handleClose }) {
    const [producto, setProducto]   = useState(null);
    const [proveedor, setProveedor] = useState(null);
    const [productoProveedor, setProductoProveedor] = useState(null);
    const [loadingProducto, setLoadingProducto]     = useState(false);
    const [loadingProveedor, setLoadingProveedor]   = useState(false);
    const [loadingProductoProveedor, setLoadingProductoProveedor] = useState(false);
    const Moneda = useMoneda();

    useEffect(() => {
      if (value?.productoProveedorId) {
        setLoadingProductoProveedor(true);
        getProductoProveedor(value.productoProveedorId)
          .then(res => setProductoProveedor(res.data ?? res))
          .finally(() => setLoadingProductoProveedor(false));
      }
      if (productoProveedor?.productoId) {
        setLoadingProducto(true);
        getProducto(productoProveedor.productoId)
          .then(res => setProducto(res.data ?? res))
          .finally(() => setLoadingProducto(false));
      }
      if (productoProveedor?.proveedorId) {
        setLoadingProveedor(true);
        getProveedor(productoProveedor.proveedorId)
          .then(res => setProveedor(res.data ?? res))
          .finally(() => setLoadingProveedor(false));
      }
    }, [value?.productoId, value?.proveedorId, value?.productoProveedorId, productoProveedor?.productoId, productoProveedor?.proveedorId]);
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
                  <div className="block mb-2 mr-2 text-sm font-medium">Id ProductoProveedor: </div>
                  <div className="text-gray-500 dark:text-gray-400">
                    {value.productoProveedorId}</div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="block mb-2 mr-2 text-sm font-medium">Id Producto: </div>
                  <div className="text-gray-500 dark:text-gray-400">
                    {loadingProducto
                      ? "Cargando..."
                      : producto?.id ?? "—"}</div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="block mb-2 mr-2 text-sm font-medium">Producto: </div>
                  <div className="text-gray-500 dark:text-gray-400">
                    {loadingProducto
                      ? "Cargando..."
                      : producto?.nombre ?? "—"}
                  </div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="block mb-2 mr-2 text-sm font-medium">Id Proveedor: </div>
                  <div className="text-gray-500 dark:text-gray-400">
                    {loadingProducto
                      ? "Cargando..."
                      : proveedor?.id ?? "—"}</div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="block mb-2 mr-2 text-sm font-medium">Proveedor: </div>
                  <div className="text-gray-500 dark:text-gray-400">
                    {loadingProveedor
                      ? "Cargando..."
                      : proveedor?.nombre ?? "—"}
                  </div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="block mb-2 mr-2 text-sm font-medium">Desde: </div>
                  <div className="text-gray-500 dark:text-gray-400">{value.fechaDesde}</div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="block mb-2 mr-2 text-sm font-medium">Hasta: </div>
                  <div className="text-gray-500 dark:text-gray-400">{value.fechaHasta}</div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="block mb-2 mr-2 text-sm font-medium">Precio Compra: </div>
                  <div className="text-gray-500 dark:text-gray-400">{Moneda(value.precioCompra)}</div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="block mb-2 mr-2 text-sm font-medium">Precio Venta: </div>
                  <div className="text-gray-500 dark:text-gray-400">{Moneda(value.precioVenta)}</div>
                </div>
                <div className="grid grid-cols-2 col-span-2">
                  <div className="block mb-2 mr-2 text-sm font-medium">Descripcion: </div>
                  <br></br>
                  <div className="text-gray-500 dark:text-gray-400">{value.descripcion}</div>
                </div>
                <div className="col-span-2 grid grid-cols-2">
                  <div className="block mb-2 mr-2 text-sm font-medium">Actualizado En: </div>
                  <div className="text-gray-500 dark:text-gray-400">{value.actualizadoEn==null ? "Error sin fecha": dayjs(value.actualizadoEn).format('YYYY/MM/DD HH:mm:ss')}</div>
                </div>
                <div className="col-span-2 grid grid-cols-2">
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
