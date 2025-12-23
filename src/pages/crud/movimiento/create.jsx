//Create.jsx
import Barcode                   from "react-barcode";
import { useEffect, useState }   from "react";
import { AppBtnX }               from "../../../components/form/btn";
import IconInISO                 from "../../../components/icons/extra/in";
import IconOutISO                 from "../../../components/icons/extra/out";
import { useForm, useResource  } from "../../../hook/useHandler";
import { appRoutes }             from "../../../routes/appRoutes";
import { getTipoDocumentosFull } from "../../../api/tipoDocumentos";
import { getBodegasFull }        from "../../../api/bodegas";
import { getDestinatariosFull }  from "../../../api/destinatarios"
import { getProveedoresFull }    from "../../../api/proveedores"
export default function ModalCreate( {
  modules,
  handleClose,
  title,
  classInput="",
  inert,
  onSuccess
  }) {
    const { resource: bodegas }        = useResource(getBodegasFull);
    const { resource: destinatarios }  = useResource(getDestinatariosFull);
    const { resource: proveedores }    = useResource(getProveedoresFull);
    const { resource: tipoDocumentos } = useResource(getTipoDocumentosFull);
    const [isDark, setIsDark] = useState(false);
    
    const { data, setData, post, processing, errors, setErrors, reset } = useForm({
        tipoDocumentoId:    "",
        bodegaId:           "",
        proveedorId:        "",
        destinatarioId:     "",
        fecha:              "",
        tipoMovimiento:     "",
        observacion:        "",
        naturaleza:         true,

    });

    const movimiento = [
      { tm: "Cambio de ubicación",      io: null,  td: "Registro interno"},
      { tm: "Reempaque / Reetiquetado", io: null,  td: "Registro interno"},
      { tm: "Reserva de stock",         io: null,  td: "Registro de reserva"},
      { tm: "Cuarentena",               io: null,  td: "Acta de bloqueo"},
      { tm: "Bloqueo",                  io: null,  td: "Acta de bloqueo"},
      { tm: "Liberación de bloqueo",    io: null,  td: "Acta de liberación"},
      { tm: "Control de calidad",       io: null,  td: "Informe de control"},
      { tm: "Ajuste administrativo",    io: null,  td: "Registro administrativo"},
      { tm: "Compra",                   io: true,  td: ["Orden de compra","Factura de proveedor"]},
      { tm: "Inventario inicial",       io: true,  td: "Acta de inventario inicial"},
      { tm: "Devolución de cliente",    io: true,  td: "Nota de crédito"},
      { tm: "Ajuste positivo",          io: true,  td: "Acta de ajuste de inventario"},
      { tm: "Producción / Fabricación", io: true,  td: "Orden de producción"},
      { tm: "Donación recibida",        io: true,  td: "Acta de donación"},
      { tm: "Préstamo recibido",        io: true,  td: "Acta de préstamo"},
      { tm: "Anulación de venta",       io: true,  td: "Nota de anulación"},
      { tm: "Regularización contable",  io: true,  td: "Asiento contable"},
      { tm: "Regularización contable",  io: false, td: "Asiento contable"},
      { tm: "Transferencia entre almacenes", io: true, td: "Guía de remisión interna"},
      { tm: "Transferencia entre almacenes", io:false, td: "Guía de remisión interna"},
      { tm: "Cambio de presentación",   io: true,  td: "Acta de conversión"},
      { tm: "Cambio de presentación",   io: false, td: "Acta de conversión"},
      { tm: "Venta",                    io: false, td: ["Boleta", "Factura de venta"]},
      { tm: "Devolución a proveedor",   io: false, td: "Nota de débito"},
      { tm: "Devolución a proveedor",   io: false, td: "Guía de remisión"},
      { tm: "Ajuste negativo",          io: false, td: "Acta de ajuste de inventario"},
      { tm: "Consumo interno",          io: false, td: "Vale de consumo"},
      { tm: "Uso en producción",        io: false, td: "Orden de producción"},
      { tm: "Merma",                    io: false, td: "Acta de merma"},
      { tm: "Vencimiento",              io: false, td: "Acta de baja"},
      { tm: "Descarte",                 io: false, td: "Acta de descarte"},
      { tm: "Donación entregada",       io: false, td: "Acta de donación"},
      { tm: "Préstamo entregado",       io: false, td: "Acta de préstamo"},
      { tm: "Anulación de compra",      io: false, td: "Nota de anulación"},
    ]

    const movimientos = movimiento.filter(m =>
      data.naturaleza === null
        ? false
        : m.io === data.naturaleza || m.io === null);

    const documentosPermitidos =(() => {
      const mov = movimientos.find(m => m.tm === data.tipoMovimiento);
      if (!mov) return [];
      return Array.isArray(mov.td) ? mov.td : [mov.td];
    })();

    const handleSubmit = async (e) => {
      e.preventDefault();
      const newErrors = {};
     
      if (!data.tipoMovimiento?.trim())
      newErrors.tipoMovimiento = "El Tipo de Movimiento es obligatorio.";
      if (!data.tipoDocumentoId?.trim())
      newErrors.tipoDocumentoId = "El Tipo de Documento es obligatorio.";
      if (!data.bodegaId?.trim())
      newErrors.bodegaId = "La bodega es obligatoria.";
      if (!data.proveedorId?.trim())
      newErrors.proveedorId = "El proveedor es obligatorio.";
      if (!data.destinatarioId?.trim())
      newErrors.destinatarioId = "El desinatario es obligatorio.";
      if (!data.fecha?.trim())
      newErrors.fecha = "La fecha es obligatoria.";
      if (!data.naturaleza?.trim())
      newErrors.naturaleza = "La naturaleza es obligatoria.";

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }
      if (onSuccess) onSuccess(data);
      handleClose();
    };

    useEffect(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
      const movimientoSeleccionado = movimiento.find(
        m => m.tm === data.tipoMovimiento && m.io === data.naturaleza
      );

      if (movimientoSeleccionado) {
        setData("tipoDocumentoDescripcion", movimientoSeleccionado.td);
      }
      setData("tipoDocumentoId", "");
    }, [data.tipoMovimiento, data.naturaleza, data.tipoDocumentoId]);

    return (
      <div id="crud-modal" inert={inert} tabIndex="-1" className="crud-modal">
        <div className="relative p-4 w-full max-w-md max-h-full">
          {/* Modal content */}
          <div className="modal-content">
            {/* Modal header */}
            <div className="modal-header">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white"> Crear {title}: </h3>
              <AppBtnX $route={appRoutes.movimiento} handleClose={handleClose} />
            </div>
          {/* Modal body */}
            <form onSubmit={handleSubmit} className="p-4 md:p-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex-col h-max">
                  <label htmlFor="tipoDocumentoId" className="flex text-sm font-medium text-gray-900 dark:text-white">Naturaleza</label>
                  <div className="flex ">
                    <div className="items-center text-center border-gray-400 ">
                      <input type="radio" id="naturaleza_entrada" value={true} name="naturaleza" className="hidden peer" checked={data.naturaleza === true} onChange={() => {
                        setData("naturaleza", true); 
                        setData("tipoMovimiento", "");}} />
                      <label htmlFor="naturaleza_entrada" className="radio-label-card">
                        <IconInISO className = "w-15 h-15 "></IconInISO>
                        <div className="px-2 font-medium">Entrada</div>
                      </label>
                    </div>
                    <div className="items-center text-center border-gray-400 ml-2">
                      <input type="radio" id="naturaleza_salida" value={false} name="naturaleza" className="hidden peer" checked={data.naturaleza === false} onChange={() => {setData("naturaleza", false); setData("tipoMovimiento", "");}} />
                      <label htmlFor="naturaleza_salida" className="radio-label-card">
                        <IconOutISO className = "w-15 h-15 "></IconOutISO>
                        <div className="px-2 font-medium">Salida</div>
                      </label>
                    </div>
                  </div>
                  {errors.naturaleza && (
                    <div className="error">{errors.naturaleza}</div>
                  )}
                </div>
                <div className="flex flex-col">
                  <div className="col-span-2 mb-2">
                    <label htmlFor="tipoMovimiento" className="block text-sm font-medium text-gray-900 dark:text-white">Tipo de Movimiento</label>
                    <select id="tipoMovimiento" name="tipoMovimiento"
                      value={data.tipoMovimiento ?? ""}
                      onChange={(e) => setData("tipoMovimiento", e.target.value)}
                      className={'input-modal '+classInput+`${errors.tipoMovimiento && ' ring-red-500 border-red-200'}`}
                    >
                      <option value=""> {data.naturaleza === null
                          ? "Seleccione primero la naturaleza"
                          : "Seleccione un Tipo de Movimiento"}
                      </option>
                      {movimientos.map((m) => (
                        <option key={m.tm} value={m.tm}>
                          {m.tm}
                        </option>
                      ))}
                    </select>
                    {errors.tipoMovimiento && (
                      <div className="error">{errors.tipoMovimiento}</div>
                    )}
                  </div>
                  <div className="col-span-2">
                    <label htmlFor="tipoDocumentoId" className="block text-sm font-medium text-gray-900 dark:text-white">Tipo de Documento</label>
                    <select id="tipoDocumentoId" name="tipoDocumentoId"
                      value={data.tipoDocumentoId ?? ""}
                      onChange={(e) => setData("tipoDocumentoId", e.target.value)}
                      className={'input-modal '+classInput+`${errors.tipoDocumentoId && ' ring-red-500 border-red-200'}`}
                    >
                      <option value="">Seleccione un Tipo de Documento</option>
                      {tipoDocumentos?.data?.map((tipoDocumento) => (
                        <option key={tipoDocumento.id} value={tipoDocumento.id}>
                          {tipoDocumento.nombre}
                        </option>
                      ))}
                      {documentosPermitidos.map((doc) => (
                        <option key={doc} value={doc}>
                          {doc}
                        </option>
                      ))}
                    </select>
                  {errors.tipoDocumentoId && (
                    <div className="error">{errors.tipoDocumentoId}</div>
                  )}
                  </div>
                </div>
                <div className="flex flex-col">
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
                <div className="flex flex-col">
                  <div className="col-span-2">
                    <label htmlFor="proveedorId" className="block text-sm font-medium text-gray-900 dark:text-white">Proveedor</label>
                    <select id="proveedorId" name="proveedorId"
                      value={data.proveedorId ?? ""}
                      onChange={(e) => setData("proveedorId", e.target.value)}
                      className={'input-modal '+classInput+`${errors.proveedorId && ' ring-red-500 border-red-200'}`}
                    >
                      <option value="">Seleccione un proveedor</option>
                      {proveedores?.data?.map((proveedor) => (
                        <option key={proveedor.id} value={proveedor.id}>
                          {proveedor.nombre}
                        </option>
                      ))}
                    </select>
                  {errors.proveedorId && (
                    <div className="error">{errors.proveedorId}</div>
                  )}
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="col-span-2">
                    <label htmlFor="destinatarioId" className="block text-sm font-medium text-gray-900 dark:text-white">Destinatario</label>
                    <select id="destinatarioId" name="destinatarioId"
                      value={data.destinatarioId ?? ""}
                      onChange={(e) => setData("destinatarioId", e.target.value)}
                      className={'input-modal '+classInput+`${errors.destinatarioId && ' ring-red-500 border-red-200'}`}
                    >
                      <option value="">Seleccione un destinatario</option>
                      {destinatarios?.data?.map((destinatario) => (
                        <option key={destinatario.id} value={destinatario.id}>
                          {destinatario.nombre}
                        </option>
                      ))}
                    </select>
                  {errors.destinatarioId && (
                    <div className="error">{errors.destinatarioId}</div>
                  )}
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="col-span-2">
                    <label htmlFor="fecha" className="block text-sm font-medium text-gray-900 dark:text-white">Fecha</label>
                    <input id="fecha" name="fecha" type="date"
                      value={data.fecha}
                      autoComplete="fecha"
                      onChange={(e) => setData("fecha", e.target.value)}
                      className={'input-modal focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500'+`${errors.nombre && ' ring-red-500 border-red-200'}`}
                    />
                  {errors.fecha && (
                    <div className="error">{errors.fecha}</div>
                  )}
                  </div>
                </div>
                <div className="flex flex-col col-span-2">
                    <label htmlFor="observacion" className="block text-sm font-medium text-gray-900 dark:text-white">Observación</label>
                    <textarea
                      id="observacion"
                      name="observacion"
                      placeholder="Observacion de la Proveedor"
                      value={data.observacion}
                      autoComplete="observacion"
                      onChange={(e) => setData("observacion", e.target.value)}
                      className={'input-modal '+classInput+`${errors.observacion && ' ring-red-500 border-red-200'}`}
                    />
                  {errors.observacion && (
                    <div className="error">{errors.observacion}</div>
                    )}
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
