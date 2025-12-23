//Create.jsx
import Barcode                  from "react-barcode";
import { useEffect, useState }  from "react";
import { useForm, useResource } from "../../../hook/useHandler";
import { AppBtnX }              from "../../../components/form/btn";
import CheckboxBall             from "../../../components/form/check2";
import { appRoutes }            from "../../../routes/appRoutes";
import { getProductosFull }     from "../../../api/productos"
import { getProveedoresFull }   from "../../../api/proveedores"


export default function ModalCreate( {
  modules,
  handleClose,
  title,
  classInput="",
  inert,
  onSuccess
  }) {
    const { resource: productos }    = useResource(getProductosFull);
    const { resource: proveedores }    = useResource(getProveedoresFull);
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    }, []);
    
    const { data, setData, post, processing, errors, reset } = useForm({
        idProducto:    "",
        idProveedor:   "",
        estado:        "",
        observacion:   "",
    });

    const handleSubmit = async (e) => {
      e.preventDefault();
      const newErrors = {};

      if (!data.idProducto?.trim()) 
        newErrors.idProducto = "El producto es obligatorio";
      if (!data.idProveedor?.trim()) 
        newErrors.idProveedor = "El proveedor es obligatorio";
      if (!data.estado?.trim()) 
        newErrors.estado = "El estado es obligatorio";
/*      if (!data.observacion?.trim()) 
        newErrors.observacion = "La observacion es obligatoria";*/

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
              <AppBtnX $route={appRoutes.productoProveedor} handleClose={handleClose} />
            </div>
          {/* Modal body */}
            <form onSubmit={handleSubmit} className="p-4 md:p-5">
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
                  {errors.idProductoProveedor && (
                    <div className="error">{errors.idProducto}</div>
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
                Crear {title.toLowerCase()}
              </button>
          </form>
        </div>
      </div>
    </div>
    );
}
