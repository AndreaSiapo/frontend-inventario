//edit.jsx
import Barcode from "react-barcode";
import { useEffect, useState } from "react";
import { useForm, useResource } from "@/hook/useHandler";
import { AppBtnX } from "@form/btn";
import { getProductosFull }           from "@/api/productos";
import { getProveedoresFull }         from "@/api/proveedores";
import { getProductoProveedoresFull } from "@/api/productoProveedores";

export default function ModalEdit({
    title,
    modules,
    value,
    handleClose,
    handleEdit,
    inert
 }) {
    const { resource: productoProveedores }    = useResource(getProductoProveedoresFull);
    const { resource: productos }    = useResource(getProductosFull);
    const { resource: proveedores }    = useResource(getProveedoresFull);
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    }, []);
    
     const { data, setData, processing, errors } = useForm({
        productoProveedorId: value?.productoProveedorId || "",
        fechaDesde:          value?.fechaDesde || "",
        fechaHasta:          value?.fechaHasta || "",
        precioCompra:        value?.precioCompra || "",
        precioVenta:         value?.precioVenta || "",
     });
    
     const onSubmit = (e) => {
         e.preventDefault();
         const newErrors = {};

        if (!data.productoProveedorId?.trim()) 
          newErrors.productoProveedorId = "El ProductoProveedor es obligatorio";
        if (!data.fechaDesde?.trim()) 
          newErrors.fechaDesde = "La fecha desde es obligatoria";
        if (!data.fechaHasta?.trim()) 
          newErrors.fechaHasta = "La fecha hasta es obligatoria";
        if (!data.cantidad?.trim()) 
          newErrors.precioCompra = "El precio de compra es obligatoria";
        if (!data.precioCompra?.trim())
          newErrors.precioVenta = "El precio de venta es obligatorio."

        if (Object.keys(newErrors).length > 0) {
          setErrors(newErrors);
          return;
        }
         handleEdit(value.id, data);
     };

  return (
    <div id="crud-modal" inert={inert} tabIndex="-1" className="crud-modal">
      <div className="relative p-4 w-full max-w-md max-h-full">
        {/* Modal content */}
        <div className="modal-content">
          {/* Modal header */}
          <div className="modal-header">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white"> Editar {title}: </h3>
            <AppBtnX $route={modules+'.index'} handleClose={handleClose} />
          </div>
          {/* Modal body */}
          <form className="p-4 md:p-5" onSubmit={onSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <div className="col-span-2">
                  <label htmlFor="idProveedor" className="block text-sm font-medium text-gray-900 dark:text-white">Proveedor</label>
                  <select id="idProveedor" name="idProveedor"
                    value={data.idProveedor ?? ""}
                    onChange={(e) => setData("idProveedor", e.target.value)}
                    className={'input-modal '+classInput+`${errors.idProveedor && ' ring-red-500 border-red-200'}`}
                  >
                    <option value="">Seleccione un proveedor</option>
                    {proveedores?.data?.map((proveedor) => (
                      <option key={proveedor.id} value={proveedor.id}>
                        {proveedor.nombre}
                      </option>
                    ))}
                  </select>
                {errors.idProveedor && (
                  <div className="error">{errors.idProveedor}</div>
                )}
                </div>
              </div>
              <div className="flex flex-col">
                <div className="col-span-2">
                  <label htmlFor="idProducto" className="block text-sm font-medium text-gray-900 dark:text-white">Producto</label>
                  <select id="idProducto" name="idProducto"
                    value={data.idProducto ?? ""}
                    onChange={(e) => setData("idProducto", e.target.value)}
                    className={'input-modal '+classInput+`${errors.idProducto && ' ring-red-500 border-red-200'}`}
                  >
                    <option value="">Seleccione un producto</option>
                    {productos?.data?.map((producto) => (
                      <option key={producto.id} value={producto.id}>
                        {producto.nombre}
                      </option>
                    ))}
                  </select>
                {errors.productoProveedorId && (
                  <div className="error">{errors.productoProveedorId}</div>
                )}
                </div>
              </div>
              <div className="flex flex-col">
                <div className="col-span-2">
                  <label htmlFor="fechaDesde" className="block text-sm font-medium text-gray-900 dark:text-white">Desde</label>
                  <input id="fechaDesde" name="fechaDesde" type="date"
                    value={data.fechaDesde}
                    autoComplete="fechaDesde"
                    onChange={(e) => setData("fechaDesde", e.target.value)}
                    className={'input-modal focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500'+`${errors.fechaDesde && ' ring-red-500 border-red-200'}`}
                  />
                {errors.fechaDesde && (
                  <div className="error">{errors.fechaDesde}</div>
                )}
                </div>
              </div>
              <div className="flex flex-col">
                <div className="col-span-2">
                  <label htmlFor="fechaHasta" className="block text-sm font-medium text-gray-900 dark:text-white">Hasta</label>
                  <input
                    id="fechaHasta"
                    name="fechaHasta"
                    type="date"
                    value={data.fechaHasta}
                    autoComplete="fechaHasta"
                    onChange={(e) => setData("fechaHasta", e.target.value)}
                    className={'input-modal '+classInput+`${errors.fechaHasta && ' ring-red-500 border-red-200'}`}
                  />
                {errors.fechaHasta && (
                  <div className="error">{errors.fechaHasta}</div>
                  )}
                </div>
              </div>
              <div className="flex flex-col">
                <div className="col-span-2">
                  <label htmlFor="precioCompra" className="block text-sm font-medium text-gray-900 dark:text-white">Precio Compra</label>
                  <input
                    id="precioCompra"
                    name="precioCompra"
                    type="number"
                    placeholder="Precio de Compra de productos"
                    value={data.precioCompra}
                    autoComplete="precioCompra"
                    onChange={(e) => setData("precioCompra", e.target.value)}
                    className={'input-modal '+classInput+`${errors.precioCompra && ' ring-red-500 border-red-200'}`}
                  />
                {errors.precioCompra && (
                  <div className="error">{errors.precioCompra}</div>
                  )}
                </div>
              </div>
              <div className="flex flex-col">
                <div className="col-span-2">
                  <label htmlFor="precioVenta" className="block text-sm font-medium text-gray-900 dark:text-white">Precio de Venta</label>
                  <input
                    id="precioVenta"
                    name="precioVenta"
                    type="number"
                    value={data.precioVenta}
                    autoComplete="precioVenta"
                    onChange={(e) => setData("precioVenta", e.target.value)}
                    className={'input-modal '+classInput+`${errors.precioVenta && ' ring-red-500 border-red-200'}`}
                  />
                {errors.precioVenta && (
                  <div className="error">{errors.precioVenta}</div>
                  )}
                </div>
              </div>
            </div>
            <button type="submit" className="submit-modal mt-4">
              Editar {title.toLowerCase()}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
