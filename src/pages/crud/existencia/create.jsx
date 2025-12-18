//Create.jsx
import Barcode from "react-barcode";
import { useEffect, useState }  from "react";
import { useForm, useResource } from "../../../hook/useHandler";
import { AppBtnX }              from "../../../components/form/btn";
import { getBodegasFull }       from "../../../api/bodegas";
import { getLotesFull }         from "../../../api/lotes";
import { getProductosFull }     from "../../../api/productos";

export default function ModalCreate( {
  modules,
  handleClose,
  title,
  classInput="",
  inert,
  onSuccess
  }) {
    const { resource: bodegas } = useResource(getBodegasFull);
    const { resource: lotes } = useResource(getLotesFull);
    const { resource: productos } = useResource(getProductosFull);
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    }, []);
    
    const { data, setData, post, processing, errors, setErrors } = useForm({
        bodegaId:        "",
        bodega:          "",
        loteId:          "",
        lote:            "",
        productoId:      "",
        producto:        "",
        stockMinimo:     "",
        stockMaximo:     "",
        costoPromedio:   "",
        fechaUltimoMovimiento:  "",
        cantidadActual:   "",
    });

    const handleSubmit = async (e) => {
      e.preventDefault();
      const newErrors = {};
      const min = data.stockMinimo !== "" ? Number(data.stockMinimo) : null;
      const max = data.stockMaximo !== "" ? Number(data.stockMaximo) : null;

      if (!data.bodegaId?.trim()) 
        newErrors.bodegaId = "La Bodega es obligatoria.";
      if (!data.loteId?.trim())
        newErrors.loteId = "El lote es obligatorio.";
      if (!data.productoId?.trim())
        newErrors.productoId = "El producto es obligatorio.";
      if (min !== null && max !== null) {
        if (max < min) {
          newErrors.maximo = "El máximo debe ser mayor que el mínimo";
        }
      }
      if (!data.costoPromedio?.trim())
        newErrors.costoPromedio = "El Costo Promedio es obligatorio.";
      if (!data.fechaUltimoMovimiento?.trim())
        newErrors.fechaUltimoMovimiento = "La Fecha del Último Movimiento es obligatoria.";
      if (!data.cantidadActual?.trim())
        newErrors.cantidadActual = "La Cantidad Actual es obligatoria.";

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
              <AppBtnX $route={'/tablas/presentaciones'} handleClose={handleClose} />
            </div>
          {/* Modal body */}
            <form onSubmit={handleSubmit} className="p-4 md:p-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <div className="col-span-2">
                    <label htmlFor="productoId" className="block text-sm font-medium text-gray-900 dark:text-white">Producto</label>
                    <select id="productoId" name="productoId"
                      value={data.productoId ?? ""}
                      onChange={(e) => setData("productoId", e.target.value)}
                      className={'input-modal '+classInput+`${errors.productoId && ' ring-red-500 border-red-200'}`}
                    >
                      <option value="">Seleccione un producto</option>
                      {productos?.data?.map((producto) => (
                        <option key={producto.id} value={producto.id}>
                          {producto.nombre}
                        </option>
                      ))}
                    </select>
                  {errors.productoId && (
                    <div className="error">{errors.productoId}</div>
                  )}
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="col-span-2">
                    <label htmlFor="bodegaId" className="block text-sm font-medium text-gray-900 dark:text-white">Bodega</label>
                    <select id="bodegaId" name="bodegaId"
                      value={data.bodegaId ?? ""}
                      onChange={(e) => setData("bodegaId", e.target.value)}
                      className={'input-modal '+classInput+`${errors.bodegaId && ' ring-red-500 border-red-200'}`}
                    >
                      <option value="">Seleccione una bodega</option>
                      {bodegas?.data?.map((bodega) => (
                        <option key={bodega.id} value={bodega.id}>
                          {bodega.nombre}
                        </option>
                      ))}
                    </select>
                  {errors.bodegaId && (
                    <div className="error">{errors.bodegaId}</div>
                  )}
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="col-span-2">
                    <label htmlFor="loteId" className="block text-sm font-medium text-gray-900 dark:text-white">Lote</label>
                    <select id="loteId" name="loteId"
                      value={data.loteId ?? ""}
                      onChange={(e) => setData("loteId", e.target.value)}
                      className={'input-modal '+classInput+`${errors.loteId && ' ring-red-500 border-red-200'}`}
                    >
                      <option value="">Seleccione un lote</option>
                      {lotes?.data?.map((lote) => (
                        <option key={lote.id} value={lote.id}>
                          {lote.nombre}
                        </option>
                      ))}
                    </select>
                  {errors.loteId && (
                    <div className="error">{errors.loteId}</div>
                  )}
                  </div>
                </div>
                <div className="flex flex-col md:col-span-2">
                  <label htmlFor="stockMinimo" className="block text-label">MIN - MAX</label>
                  <div className="col-span-2 flex gap-2">
                    <input
                      id="stockMinimo"
                      name="stockMinimo"
                      type="number"
                      placeholder="MIN"
                      value={data.stockMinimo ?? ""}
                      autoComplete="stockMinimo"
                      onChange={(e) => setData("stockMinimo", e.target.value === "" ? "" : e.target.value)}
                      className={'input-modal w-20 '+classInput+`${errors.stockMinimo && ' ring-red-500 border-red-200'}`}
                    />
                    <label htmlFor="minimo" className="block text-sm text-gray-900 dark:text-gray-400"> - </label>
                    <input
                      id="stockMaximo"
                      name="stockMaximo"
                      type="number"
                      placeholder="MAX"
                      value={data.stockMaximo ?? ""}
                      autoComplete="stockMaximo"
                      onChange={(e) => setData("stockMaximo", e.target.value === "" ? "" : e.target.value)}
                      className={'input-modal w-20 '+classInput+`${errors.maximo && ' ring-red-500 border-red-200'}`}
                    />
                  </div>
                  <div>
                  {errors.stockMinimo && (
                    <div className="error">{errors.stockMinimo}</div>
                  )}
                  {errors.stockMaximo && (
                    <div className="error">{errors.stockMaximo}</div>
                  )}
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="col-span-2">
                    <label htmlFor="costoPromedio" className="block text-sm font-medium text-gray-900 dark:text-white">costoPromedio</label>
                    <input
                      id="costoPromedio"
                      name="costoPromedio"
                      type="text"
                      placeholder="costoPromedio"
                      value={data.costoPromedio}
                      autoComplete="costoPromedio"
                      onChange={(e) => setData("costoPromedio", e.target.value)}
                      className={'input-modal '+classInput+`${errors.costoPromedio && ' ring-red-500 border-red-200'}`}
                    />
                  {errors.costoPromedio && (
                    <div className="error">{errors.costoPromedio}</div>
                    )}
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="col-span-2">
                    <label htmlFor="descripcion" className="block text-sm font-medium text-gray-900 dark:text-white">Descripcion</label>
                    <input
                      id="descripcion"
                      name="descripcion"
                      type="text"
                      placeholder="Descripcion de la Proveedor"
                      value={data.descripcion}
                      autoComplete="descripcion"
                      onChange={(e) => setData("descripcion", e.target.value)}
                      className={'input-modal '+classInput+`${errors.descripcion && ' ring-red-500 border-red-200'}`}
                    />
                  {errors.descripcion && (
                    <div className="error">{errors.descripcion}</div>
                    )}
                  </div>
                </div>
                <div className="flex flex-col col-span-2">
                  <div className="col-span-2">
                    <label htmlFor="plazo" className="block text-sm font-medium text-gray-900 dark:text-white">Plazo</label>
                    <input
                      id="plazo"
                      name="plazo"
                      type="number"
                      placeholder="Plazos de entrega estimados del Proveedor"
                      value={data.plazo}
                      autoComplete="plazo"
                      onChange={(e) => setData("plazo", e.target.value)}
                      className={'input-modal '+classInput+`${errors.plazo && ' ring-red-500 border-red-200'}`}
                    />
                  {errors.plazo && (
                    <div className="error">{errors.plazo}</div>
                    )}
                  </div>
                </div>
            </div>
            <div className="modal-footer mt-4">
              <button type="submit" className="submit-modal">
                Crear {title.toLowerCase()}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    );
}
