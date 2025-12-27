//Create.jsx
import Barcode                 from "react-barcode";
import { useEffect, useState } from "react";
import { useForm }             from "@/hook/useHandler";
import { AppBtnX }             from "@form/btn";
import { appRoutes }           from "@route";


export default function ModalCreate( {
  modules,
  handleClose,
  title,
  classInput="",
  inert,
  onSuccess
  }) {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    }, []);
    
    const { data, setData, post, processing, errors, setErrors, reset } = useForm({
        movimientoId:  "",
        productoId:    "",
        detalle:        "",
        cantidad:       "",
        valor:          "",
        subtotal:       "",
        fecha:          "",
    });

    const handleSubmit = async (e) => {
      e.preventDefault();
      const newErrors = {};

      if (!data.movimientoId?.trim()) 
        newErrors.movimientoId = "El movimiento es obligatorio";
      if (!data.productoId?.trim()) 
        newErrors.productoId = "El producto es obligatorio";
      if (!data.detalle?.trim()) 
        newErrors.detalle = "El detalle es obligatorio";
      if (!data.cantidad?.trim()) 
        newErrors.cantidad = "La cantidad es obligatoria";
      if (!data.valor?.trim())
        newErrors.valor = "El valor es obligatorio."
      if (!data.fecha?.trim())
        newErrors.fecha = "La fecha es obligatoria."

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }

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
              <AppBtnX $route={appRoutes.detalleMovimiento} handleClose={handleClose} />
            </div>
          {/* Modal body */}
            <form onSubmit={handleSubmit} className="p-4 md:p-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <div className="col-span-2">
                    <label htmlFor="movimientoId" className="block text-sm font-medium text-gray-900 dark:text-white">ID Movimiento</label>
                    <input id="movimientoId" name="movimientoId" type="text"
                      placeholder="ID del Movimiento"
                      value={data.movimientoId}
                      autoComplete="movimientoId"
                      onChange={(e) => setData("movimientoId", e.target.value)}
                      className={'input-modal focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500'+`${errors.movimientoId && ' ring-red-500 border-red-200'}`}
                    />
                  {errors.movimientoId && (
                    <div className="error">{errors.movimientoId}</div>
                  )}
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="col-span-2">
                    <label htmlFor="productoId" className="block text-sm font-medium text-gray-900 dark:text-white">ID Producto</label>
                    <input id="productoId" name="productoId" type="text"
                      placeholder="ID del Producto"
                      value={data.productoId}
                      autoComplete="productoId"
                      onChange={(e) => setData("productoId", e.target.value)}
                      className={'input-modal focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500'+`${errors.productoId && ' ring-red-500 border-red-200'}`}
                    />
                  {errors.productoId && (
                    <div className="error">{errors.productoId}</div>
                  )}
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="col-span-2">
                    <label htmlFor="detalle" className="block text-sm font-medium text-gray-900 dark:text-white">Detalle</label>
                    <textarea
                      id="detalle"
                      name="detalle"
                      placeholder="Detalle de la Proveedor"
                      value={data.detalle}
                      autoComplete="Detalle"
                      onChange={(e) => setData("detalle", e.target.value)}
                      className={'input-modal '+classInput+`${errors.detalle && ' ring-red-500 border-red-200'}`}
                    />
                  {errors.detalle && (
                    <div className="error">{errors.detalle}</div>
                    )}
                  </div>
                </div>
                <div className="flex flex-col col-span-2">
                  <div className="col-span-2">
                    <label htmlFor="cantidad" className="block text-sm font-medium text-gray-900 dark:text-white">Cantidad</label>
                    <input
                      id="cantidad"
                      name="cantidad"
                      type="number"
                      placeholder="Cantidad de productos"
                      value={data.cantidad}
                      autoComplete="cantidad"
                      onChange={(e) => setData("cantidad", e.target.value)}
                      className={'input-modal '+classInput+`${errors.cantidad && ' ring-red-500 border-red-200'}`}
                    />
                  {errors.cantidad && (
                    <div className="error">{errors.cantidad}</div>
                    )}
                  </div>
                </div>
                <div className="flex flex-col col-span-2">
                  <div className="col-span-2">
                    <label htmlFor="valor" className="block text-sm font-medium text-gray-900 dark:text-white">Valor Unitario</label>
                    <input
                      id="valor"
                      name="valor"
                      type="number"
                      placeholder="Valor unitario de productos"
                      value={data.valor}
                      autoComplete="valor"
                      onChange={(e) => setData("valor", e.target.value)}
                      className={'input-modal '+classInput+`${errors.valor && ' ring-red-500 border-red-200'}`}
                    />
                  {errors.valor && (
                    <div className="error">{errors.valor}</div>
                    )}
                  </div>
                </div>
                <div className="flex flex-col col-span-2">
                  <div className="col-span-2">
                    <label htmlFor="subtotal" className="block text-sm font-medium text-gray-900 dark:text-white">Subtotal:</label>
                    <input
                      id="subtotal"
                      name="subtotal"
                      type="number"
                      placeholder="Subtotal"
                      value={data.subtotal}
                      autoComplete="subtotal"
                      onChange={(e) => setData("subtotal", e.target.value)}
                      className={'input-modal '+classInput+`${errors.subtotal && ' ring-red-500 border-red-200'}`}
                    />
                  {errors.subtotal && (
                    <div className="error">{errors.subtotal}</div>
                    )}
                  </div>
                </div>
                <div className="flex flex-col col-span-2">
                  <div className="col-span-2">
                    <label htmlFor="fecha" className="block text-sm font-medium text-gray-900 dark:text-white">Fecha:</label>
                    <input
                      id="fecha"
                      name="fecha"
                      type="date"
                      placeholder="fecha"
                      value={data.fecha}
                      autoComplete="fecha"
                      onChange={(e) => setData("fecha", e.target.value)}
                      className={'input-modal '+classInput+`${errors.fecha && ' ring-red-500 border-red-200'}`}
                    />
                  {errors.fecha && (
                    <div className="error">{errors.fecha}</div>
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
