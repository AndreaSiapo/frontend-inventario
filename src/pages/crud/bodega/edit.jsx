//edit.jsx
import Barcode from "react-barcode";
import { useEffect, useState } from "react";
import { useForm } from "@/hook/useHandler";
import { AppBtnX } from "@form/btn";

export default function ModalEdit({
    title,
    modules,
    value,
    handleClose,
    handleEdit,
    inert
 }) {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    }, []);
    
     const { data, setData, processing, errors, setErrors } = useForm({
         codigo:     value?.codigo     || "",
         nombre:     value?.nombre     || "",
         detalle:    value?.detalle    || "",
         ubicacion:  value?.ubicacion  || "",
         referencia: value?.referencia || "",
         capacidad:  value?.capacidad  || "",
         tamano:     value?.tamano     || ancho*alto*largo,
    });

    const [ dimensiones, setDimensiones ] = useState({
        ancho: 4,
        alto:  2.5,
        largo: 3,
    });
    
    const onSubmit = (e) => {
      e.preventDefault();
      const newErrors = {};

      if (!data.codigo?.trim())
      newErrors.codigo = "El codigo es obligatorio.";
      if (!data.nombre?.trim())
      newErrors.nombre = "El nombre es obligatorio.";
      if (!data.detalle?.trim())
      newErrors.detalle = "El detalle es obligatorio.";
      if (!data.ubicacion?.trim())
      newErrors.ubicacion = "El ubicacion es obligatorio.";
      if (!data.referencia?.trim())
      newErrors.referencia = "La referencia es obligatoria.";/*
      if (!data.capacidad?.trim())
      newErrors.capacidad = "La capacidad es obligatoria.";
      if (!data.tamano?.trim())
      newErrors.tamano = "El tamano es obligatorio.";*/

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
          <form className="p-4 md:p-5" onSubmit={onSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.codigo && (
                <AppBtnCodeBarDownload codigo={data.codigo} modules={modules} />
              )}
              <div className="flex flex-col">
                <div className="col-span-2">
                  <label htmlFor="codigo" className="block text-label">Código</label>
                  <input
                    type="text"
                    name="codigo"
                    id="codigo"
                    className="input-modal"
                    placeholder={"Ponga el codigo de " + title}
                    value={data.codigo}
                    onChange={(e) => setData("codigo", e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <div className="col-span-2">
                  <label htmlFor="nombre" className="block text-label">Nombre</label>
                  <input
                    type="text"
                    name="nombre"
                    id="nombre"
                    className="input-modal"
                    placeholder={"Ponga el nombre de " + title}
                    value={data.nombre}
                    onChange={(e) => setData("nombre", e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <div className="col-span-2">
                  <label htmlFor="detalle" className="block text-label">Detalle</label>
                  <textarea
                    name="detalle"
                    id="detalle"
                    className="input-modal"
                    placeholder={"Detalles"}
                    value={data.detalle}
                    onChange={(e) => setData("detalle", e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="flex flex-col col-span-2">
                <label htmlFor="referencia" className="block text-label">Referencia</label>
                <textarea
                  name="referencia"
                  id="referencia"
                  className="input-modal"
                  placeholder={"Referencias"}
                  value={data.referencia}
                  onChange={(e) => setData("referencia", e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col">
                <div className="col-span-2">
                  <label htmlFor="ubicacion" className="block text-label">Ubicacion</label>
                  <input
                    type="text"
                    name="ubicacion"
                    id="ubicacion"
                    className="input-modal"
                    placeholder={"ubicacion de entrega estimados del Proveedor"}
                    value={data.ubicacion}
                    onChange={(e) => setData("ubicacion", e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <div className="col-span-2">
                  <label htmlFor="capacidad" className="block text-label">capacidad</label>
                  <input
                    type="text"
                    name="capacidad"
                    id="capacidad"
                    className="input-modal"
                    placeholder={"capacidad"}
                    value={data.capacidad}
                    onChange={(e) => setData("capacidad", e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <label htmlFor="descripcion" className="block text-label">Descripcion</label>
                <textarea
                  name="descripcion"
                  id="descripcion"
                  className="input-modal"
                  placeholder={"Descripcion"}
                  value={data.descripcion}
                  onChange={(e) => setData("descripcion", e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="flex flex-col">
              <label htmlFor="tamano" className="block text-sm font-medium text-gray-900 dark:text-white">Tamaño</label>
              <input
                type="text"
                name="tamano"
                id="tamano"
                className="input-modal"
                placeholder={"Tamaño"}
                value={dimensiones.ancho*dimensiones.alto*dimensiones.largo}
                onChange={(e) => setData("tamano", e.target.value)}
                required
              />
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
                  ancho={Number(dimensiones.ancho)}
                  alto={Number(dimensiones.alto)}
                  largo={Number(dimensiones.largo)}/>
            </div>
            <div className="modal-footer mt-4">
              <button type="submit" className="submit-modal mt-4">
                Editar {title.toLowerCase()}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
