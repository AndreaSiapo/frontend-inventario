//Create.jsx
import { useEffect, useState, useMemo }         from "react";
import Barcode       from "react-barcode";
import { AppBtnCodeBarDownload, AppBtnCodeBar } from "@html/btn";
import { useForm }   from "@/hook/useHandler";
import { AppBtnX }   from "@form/btn";
import HabitacionBox from "@form/HabitacionBox";
import { appRoutes } from "@route";

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
        codigo:     "",
        nombre:     "",
        detalle:    "",
        ubicacion:  "",
        referencia: "",
        capacidad:  "",
        tamano:     "",
    });

    const [ dimensiones, setDimensiones ] = useState({
        ancho: 1,
        alto:  1,
        largo: 1,
    });

    const handleSubmit = async (e) => {
      e.preventDefault();
      const newErrors = {};

      if (!data.codigo?.trim()) 
        newErrors.codigo = "El código es obligatorio";
      if (!data.nombre?.trim()) 
        newErrors.nombre = "El nombre es obligatorio";
      if (!data.detalle?.trim()) 
        newErrors.detalle = "El detalle es obligatorio";
      if (!data.plazo?.trim()) 
        newErrors.plazo = "El plazo es obligatorio";
      if (!data.ubicacion?.trim())
        newErrors.ubicacion = "La ubicación es obligatoria."
      if (!data.referencia?.trim())
        newErrors.referencia = "La referencia es obligatoria."
/*      if (!data.capacidad?.trim())
        newErrors.capacidad = "La capacidad es obligatoria."
      if (!data.tamano?.trim())
        newErrors.tamano = "El tamaño es obligatorio."*/

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
              <AppBtnX $route={appRoutes.bodega} handleClose={handleClose} />
            </div>
          {/* Modal body */}
            <form onSubmit={handleSubmit} className="p-4 md:p-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.codigo && (
                  <div className="mt-2 p-2 border rounded bg-white dark:bg-sky-900 overflow-auto col-span-2 flex justify-center text-gray-900 dark:text-white">
                    <Barcode
                      value={data.codigo}
                      background="transparent"
                      lineColor={isDark ? "#fff" : "#000"}      // puedes cambiarlo si usas modo oscuro
                      textColor={isDark ? "#fff" : "#000"} 
                      height={50}
                      width={2}
                      displayValue={true}   // muestra el texto debajo
                      fontSize={14}
                    />
                  </div>
                )}
                <div className="flex flex-col">
                  <div className="col-span-2">
                    <label htmlFor="codigo" className="block text-sm font-medium text-gray-900 dark:text-white">Código</label>
                    <input id="codigo" name="codigo" type="text"
                      placeholder="Codigo de la Proveedor"
                      value={data.codigo}
                      autoComplete="codigo"
                      onChange={(e) => setData("codigo", e.target.value)}
                      className={'input-modal focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500'+`${errors.nombre && ' ring-red-500 border-red-200'}`}
                    />
                  {errors.codigo && (
                    <div className="error">{errors.codigo}</div>
                  )}
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="col-span-2">
                    <label htmlFor="nombre" className="block text-sm font-medium text-gray-900 dark:text-white">Nombre</label>
                    <input id="nombre" name="nombre" type="text"
                      placeholder="Nombre de la Proveedor"
                      value={data.nombre}
                      autoComplete="nombre"
                      onChange={(e) => setData("nombre", e.target.value)}
                      className={'input-modal focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500'+`${errors.nombre && ' ring-red-500 border-red-200'}`}
                    />
                  {errors.nombre && (
                    <div className="error">{errors.nombre}</div>
                  )}
                  </div>
                </div>
                <div className="flex flex-col col-span-2">
                  <label htmlFor="detalle" className="block text-sm font-medium text-gray-900 dark:text-white">Detalle</label>
                  <textarea
                    id="detalle"
                    name="detalle"
                    placeholder="Detalle"
                    value={data.detalle}
                    autoComplete="detalle"
                    onChange={(e) => setData("detalle", e.target.value)}
                    className={'input-modal '+classInput+`${errors.detalle && ' ring-red-500 border-red-200'}`}
                  />
                {errors.detalle && (
                  <div className="error">{errors.detalle}</div>
                  )}
                </div>
                <div className="flex flex-col col-span-2">
                  <label htmlFor="referencia" className="block text-sm font-medium text-gray-900 dark:text-white">Referencia</label>
                  <textarea
                    id="referencia"
                    name="referencia"
                    placeholder="Referencias"
                    value={data.referencia}
                    autoComplete="referencia"
                    onChange={(e) => setData("referencia", e.target.value)}
                    className={'input-modal '+classInput+`${errors.referencia && ' ring-red-500 border-red-200'}`}
                  />
                {errors.referencia && (
                  <div className="error">{errors.referencia}</div>
                  )}
              </div>
                <div className="flex flex-col">
                  <div className="col-span-2">
                    <label htmlFor="ubicacion" className="block text-sm font-medium text-gray-900 dark:text-white">Ubicacion</label>
                    <input
                      id="ubicacion"
                      name="ubicacion"
                      type="text"
                      placeholder="Ubicacion"
                      value={data.ubicacion}
                      autoComplete="ubicacion"
                      onChange={(e) => setData("ubicacion", e.target.value)}
                      className={'input-modal '+classInput+`${errors.ubicacion && ' ring-red-500 border-red-200'}`}
                    />
                  {errors.ubicacion && (
                    <div className="error">{errors.ubicacion}</div>
                    )}
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="col-span-2">
                    <label htmlFor="capacidad" className="block text-sm font-medium text-gray-900 dark:text-white">capacidad</label>
                    <input
                      id="capacidad"
                      name="capacidad"
                      type="text"
                      placeholder="Capacidad de la Proveedor"
                      value={data.capacidad}
                      autoComplete="capacidad"
                      onChange={(e) => setData("capacidad", e.target.value)}
                      className={'input-modal '+classInput+`${errors.capacidad && ' ring-red-500 border-red-200'}`}
                    />
                  {errors.capacidad && (
                    <div className="error">{errors.capacidad}</div>
                    )}
                  </div>
                </div>
                <div className="flex flex-col">
                  <label htmlFor="tamano" className="block text-sm font-medium text-gray-900 dark:text-white">Tamaño</label>
                  <input
                    id="tamano"
                    name="tamano"
                    type="text"
                    placeholder="Tamaño de entrega estimados del Proveedor"
                    value={dimensiones.ancho*dimensiones.alto*dimensiones.largo}
                    autoComplete="tamano"
                    onChange={(e) => setData("tamano", e.target.value)}
                    readOnly
                    className={'input-modal text-gray-500'+classInput+`${errors.tamano && ' ring-red-500 border-red-200'}`}
                  />
                  {errors.tamano && (
                    <div className="error">{errors.tamano}</div>
                  )}
                  {/* ANCHO */}
                  <label htmlFor="ancho" className="block text-sm font-medium text-gray-900 dark:text-white">Ancho</label>
                  <input
                    id="ancho"
                    name="ancho"
                    type="number"
                    value={dimensiones.ancho}
                    step="0.1"
                    onChange={(e) => setDimensiones({ ...dimensiones, ancho: Number(e.target.value) }) }
                    className="input-modal"
                  />
                {/* ALTO */}
                  <label htmlFor="alto" className="block text-sm font-medium text-gray-900 dark:text-white">Alto</label>
                  <input
                    id="alto"
                    name="alto"
                    type="number"
                    value={dimensiones.alto}
                    step="0.1"
                    onChange={(e) => setDimensiones({ ...dimensiones, alto: Number(e.target.value) }) }
                    className="input-modal"
                  />
                {/* LARGO */}
                  <label htmlFor="largo" className="block text-sm font-medium text-gray-900 dark:text-white">Largo</label>
                  <input
                    id="largo"
                    name="largo"
                    type="number"
                    value={dimensiones.largo}
                    step="0.1"
                    onChange={(e) => setDimensiones({ ...dimensiones, largo: Number(e.target.value) }) }
                    className="input-modal"
                  />
                </div>
                <div className="flex flex-col">
                  <h1 className="text-label">Vista de Bodega</h1>
                  <HabitacionBox 
                      ancho ={Number(dimensiones.ancho)}
                      alto  ={Number(dimensiones.alto)}
                      largo ={Number(dimensiones.largo)}/>
                </div>
              </div>
              <div className="modal-footer mt-4">
                <button type="submit" className="submit-modal mt-4">
                  Crear {title.toLowerCase()}
                </button>
              </div>
          </form>
        </div>
      </div>
    </div>
    );
}
