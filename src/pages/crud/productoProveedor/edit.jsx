//edit.jsx
import Barcode from "react-barcode";
import { useEffect, useState } from "react";
import { useForm }             from "@/hook/useHandler";
import { AppBtnX }             from "@form/btn";
import CheckboxBall            from "@form/check2";
import { appRoutes }           from "@route";
import { getProductosFull }    from "@/api/productos"
import { getProveedoresFull }  from "@/api/proveedores"

export default function ModalEdit({
    title,
    modules,
    value,
    handleClose,
    handleEdit,
    inert
 }) {
    const { resource: productos }   = useResource(getProductosFull);
    const { resource: proveedores } = useResource(getProveedoresFull);
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    }, []);
    
     const { data, setData, processing, errors, setErrors } = useForm({
         productoId:  value?.productoId || "",
         proveedorId: value?.proveedorId || "",
         estado:      value?.referencia || "",
         observacion: value?.descripcion || "",
     });
    
     const onSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};

        if (!data.productoId?.trim()) 
          newErrors.productoId = "El productoId es obligatorio";
        if (!data.proveedorId?.trim()) 
          newErrors.proveedorId = "El proveedor es obligatorio";
        if (!data.estado?.trim()) 
          newErrors.estado = "El estado es obligatorio";
    /*      if (!data.observacion?.trim()) 
          newErrors.observacion = "La observacion es obligatoria";*/

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
                  <label htmlFor="productoId" className="block text-sm font-medium text-gray-900 dark:text-white">productoId</label>
                  <select id="productoId" name="productoId"
                    value={data.productoId ?? ""}
                    onChange={(e) => setData("productoId", e.target.value)}
                    className={'input-modal '+classInput+`${errors.productoId && ' ring-red-500 border-red-200'}`}
                  >
                    <option value="">Seleccione un productoId</option>
                    {productoIds?.data?.map((productoId) => (
                      <option key={productoId.id} value={productoId.id}>
                        {productoId.nombre}
                      </option>
                    ))}
                  </select>
                {errors.productoIdProveedor && (
                  <div className="error">{errors.productoId}</div>
                )}
                </div>
              </div>
              <div className="flex flex-col h-max">
                <div>
                  <CheckboxBall name="activo" checked={data.activo} onChange={(e) => setData("activo", e.target.checked)} label="Activo"classLabel2="ml-2 text-sm font-medium text-gray-700 dark:text-gray-400" />
                {errors.activo && (
                  <div className="error">{errors.activo}</div>
                )}
                </div>
              </div>
              <div className="flex flex-col col-span-2">
                <label htmlFor="observacion" className="block text-sm font-medium text-gray-900 dark:text-white">Observacion</label>
                <textarea
                  id="observacion"
                  name="observacion"
                  placeholder="Mencionar si hay alguna observacion"
                  value={data.observacion}
                  autoComplete="Observacion"
                  onChange={(e) => setData("observacion", e.target.value)}
                  className={'input-modal '+classInput+`${errors.observacion && ' ring-red-500 border-red-200'}`}
                />
              {errors.observacion && (
                <div className="error">{errors.observacion}</div>
                )}
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
