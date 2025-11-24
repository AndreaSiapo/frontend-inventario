// src/pages/crud/u_medida/create.jsx
import useForm from "../../../hook/useForm";
import { createUnidadMedida } from "../../../api/umedidas";

export default function ModalCreate( {
  classInput="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
  onSuccess
  }) {
    const { data, setData, post, processing, errors, reset} = useForm({
        nombre: "",
        abreviado: "",
    });

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        if (onSuccess) await onSuccess(data)
        reset();            
      } catch (error) {
        // los errores se manejan en el hook
      }
    };

    return (
      <form onSubmit={handleSubmit} className="p-4 w-full flex">
          <input
            id="nombre"
            name="nombre"
            type="text"
            placeholder="Nombre de la Unidad de Medida"
            value={data.nombre}
            autoComplete="nombre"
            onChange={(e) => setData("nombre", e.target.value)}
            className={classInput+`${errors.nombre && ' ring-red-500 border-red-200'}`}
          />
          {errors.nombre && (
            <div className="text-red-500 text-sm mt-1">{errors.nombre}</div>
          )}
          <input
            id="abreviado"
            name="abreviado"
            type="text"
            placeholder="Medida Abreviada"
            value={data.abreviado}
            autoComplete="abreviado"
            onChange={(e) => setData("abreviado", e.target.value)}
            className={classInput+`${errors.abreviado && ' ring-red-500 border-red-200'}`}
          />
          {errors.abreviado && (
            <div className="text-red-500 text-sm mt-1">{errors.abreviado}</div>
          )}
        <button type="submit" disabled={processing} className="hidden" />
      </form>
    );
}
