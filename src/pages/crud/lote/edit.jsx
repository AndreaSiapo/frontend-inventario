//edit.jsx
import { useEffect, useState, useMemo } from "react";
import { AppBtnCodeBarDownload, AppBtnCodeBar } from "@html/btn";
import { AppBtnX }              from "@form/btn";
import CheckboxBall             from "@form/check2";
import IconVRight               from "@icons/actions/v-right";
import { useForm, useResource } from "@/hook/useHandler";
import { getProductosFull }     from "@/api/productos";
import { getProductoLotesFull } from "@/api/productoLotes";

export default function ModalEdit({
    title,
    modules,
    value,
    handleClose,
    handleEdit,
    inert
 }) {
  const { resource: productos }        = useResource(getProductosFull);
  const [ isDark, setIsDark ] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);
  
  const { data, setData, processing, errors, setErrors } = useForm({
        productoId:       value?.productoId|| "",
        codigoLote:       value?.codigoLote|| "",
        fechaVencimiento: value?.fechaVencimiento|| "",
        cantidadInicial:  value?.cantidadInicial|| "",
        cantidadActual:   value?.cantidadActual|| "",
        costoUnitario:    value?.costoUnitario|| "",
        costoTotal:       value?.costoTotal|| "",
        fechaIngreso:     value?.fechaIngreso|| "",
  });
  
  const onSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
      const fec_in  = data.fechaIngreso ? new Date(data.fechaIngreso).getTime() : null;

      const fec_ven = data.fechaVencimiento ? new Date(data.fechaVencimiento).getTime() : null;

    if (!data.productoId?.trim())
      newErrors.productoId = "El producto es obligatorio.";
    if (!data.codigoLote?.trim()) 
      newErrors.codigoLote = "El código es obligatorio.";
    if (!data.fechaVencimiento)
      newErrors.fechaVencimiento = "La fecha de vencimiento es obligatoria.";
    if (!data.fechaIngreso)
    if (fec_in !== null && fec_ven !== null) {
      if (fec_ven < fec_in) {
        newErrors.fechaVencimiento =
          "La fecha de vencimiento no debe ser anterior a la fecha de ingreso.";
      }
    }
    if (!data.cantidadInicial)
      newErrors.cantidadInicial = "La cantidad inicial es obligatoria.";
    if (!data.cantidadActual)
      newErrors.cantidadActual = "La cantidad actual es obligatoria, no puede crearse lotes vacios.";
    if (!data.costoUnitario)
      newErrors.costoUnitario = "El costo unitario del producto es necesario.";
    if (!data.costoTotal)
      newErrors.costoTotal = "El costo total del producto es necesario";
    if (!data.productoId)
      newErrors.productoId = "Seleccione el producto";

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
            <h3 className="h3-modal"> Editar {title}: </h3>
            <AppBtnX $route={modules+'.index'} handleClose={handleClose} />
          </div>
          {/* Modal body */}
          {data.codigoLote && (
            <AppBtnCodeBarDownload codigo={data.codigoLote} modules={modules} />
          )}
          <form className="p-4 md:p-5" onSubmit={onSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-x-4 gap-y-2">
              <div className="flex flex-col">
                <label htmlFor="codigoLote" className="block text-label">Código</label>
                <input id="codigoLote" name="codigoLote" type="text"
                  placeholder="Codigo"
                  value={data.codigoLote}
                  autoComplete="codigoLote"
                  onChange={(e) => setData("codigoLote", e.target.value)}
                  className={'input-modal focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500'+`${errors.nombre && ' ring-red-500 border-red-200'}`}
                />
                {errors.codigoLote && (
                  <div className="error">{errors.codigoLote}</div>
                )}
              </div>
              <div className="flex flex-col col-span-3">
                <label htmlFor="productoId" className="block text-label">Producto</label>
                <select id="productoId" name="productoId"
                  value={data.productoId ?? ""}
                  onChange={(e) => setData("productoId", e.target.value)}
                  className={'input-modal '+classInput+`${errors.productoId && ' ring-red-500 border-red-200'}`}
                >
                  <option value="">Seleccione un producto</option>
                  {productos?.data?.map((producto) => (
                    <option key={producto.id} value={producto.id}>
                      {"("+producto.abreviado+") "+producto.nombre}
                    </option>
                  ))}
                </select>
                {errors.productoId && (
                <div className="error">{errors.productoId}</div>
                )}
              </div>
              <div className="flex flex-col col-span-2">
                <label htmlFor="fechaIngreso" className="block text-label">Fecha Ingreso</label>
                <input
                  id="fechaIngreso"
                  name="fechaIngreso"
                  type="date"
                  value={data.fechaIngreso}
                  autoComplete="fechaIngreso"
                  onChange={(e) => setData("fechaIngreso", e.target.value)}
                  className={'input-modal '+classInput+`${errors.fechaIngreso && ' ring-red-500 border-red-200'}`}
                />
              </div>
              <div className="flex flex-col col-span-2">
                <label htmlFor="fechaVencimiento" className="block text-label">Fecha Vencimiento</label>
                <input
                  id="fechaVencimiento"
                  name="fechaVencimiento"
                  type="date"
                  value={data.fechaVencimiento}
                  autoComplete="fechaVencimiento"
                  onChange={(e) => setData("fechaVencimiento", e.target.value)}
                  className={'input-modal '+classInput+`${errors.fechaVencimiento && ' ring-red-500 border-red-200'}`}
                />
              </div>
              <div className="flex flex-col col-span-4">
                <div className="error">
                {errors.fechaVencimiento && (
                <div className="error">{errors.fechaVencimiento}</div>
                )}
                {errors.fechaIngreso && (
                <div className="error">{errors.fechaIngreso}</div>
                )}</div>
              </div>
              <div className="flex flex-col col-span-2">
                <label htmlFor="cantidadInicial" className="block text-label">Cantidad Inicial</label>
                <input
                  id="cantidadInicial"
                  name="cantidadInicial"
                  type="number"
                  value={data.cantidadInicial}
                  autoComplete="cantidadInicial"
                  onChange={(e) => setData("cantidadInicial", e.target.value)}
                  className={'input-modal '+classInput+`${errors.cantidadInicial && ' ring-red-500 border-red-200'}`}
                />
                {errors.cantidadInicial && (
                <div className="error">{errors.cantidadInicial}</div>
                )}
              </div>
              <div className="flex flex-col col-span-2">
                <label htmlFor="cantidadActual" className="block text-label">Cantidad Actual</label>
                <input
                  id="cantidadActual"
                  name="cantidadActual"
                  type="number"
                  value={data.cantidadActual}
                  autoComplete="cantidadActual"
                  onChange={(e) => setData("cantidadActual", e.target.value)}
                  className={'input-modal '+classInput+`${errors.cantidadActual && ' ring-red-500 border-red-200'}`}
                />
                {errors.cantidadActual && (
                <div className="error">{errors.cantidadActual}</div>
                )}
              </div>
              <div className="flex flex-col col-span-2">
                <label htmlFor="costoUnitario" className="block text-label">Costo Unitario</label>
                <input
                  id="costoUnitario"
                  name="costoUnitario"
                  type="number"
                  placeholder="costoUnitario"
                  value={data.costoUnitario ?? ""}
                  autoComplete="costoUnitario"
                  onChange={(e) => setData("costoUnitario", e.target.value === "" ? "" : e.target.value)}
                  className={'input-modal '+classInput+`${errors.costoUnitario && ' ring-red-500 border-red-200'}`}
                />
                {errors.costoUnitario && (
                <div className="error">{errors.costoUnitario}</div>
                )}
              </div>
              <div className="flex flex-col col-span-2">
                <label htmlFor="costoTotal" className="block text-label">Costo Total</label>
                <input
                  id="costoTotal"
                  name="costoTotal"
                  type="number"
                  placeholder="costoTotal"
                  value={data.costoTotal ?? ""}
                  autoComplete="costoTotal"
                  onChange={(e) => setData("costoTotal", e.target.value === "" ? "" : e.target.value)}
                  className={'input-modal '+classInput+`${errors.costoTotal && ' ring-red-500 border-red-200'}`}
                />
                {errors.costoTotal && (
                <div className="error">{errors.costoTotal}</div>
                )}
              </div>
            </div>
            <div className="modal-footer mt-4">
              <button type="submit" className="submit-modal">
                Editar {title.toLowerCase()}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
