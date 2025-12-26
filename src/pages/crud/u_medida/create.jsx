// src/pages/crud/u_medida/create.jsx
import { useForm } from "@/hook/useHandler";

export default function ModalCreate( {
  classInput="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
  onSuccess
  }) {
    const { data, setData, post, processing, errors, setErrors, reset} = useForm({
        nombre:    "",
        abreviado: "",
    });

    const handleSubmit = async (e) => {
      e.preventDefault();
      const newErrors = {};
     
      if (!data.nombre?.trim())
      newErrors.nombre = "El nombre es obligatorio";
      if (!data.abreviado?.trim()) {
      newErrors.abreviado = "La abreviatura es obligatoria";
      } else if (data.abreviado.trim().length > 20) {
        newErrors.abreviado = "La abreviatura no puede tener más de 50 caracteres";
      }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

      if (onSuccess) await onSuccess(data, setErrors) // ✅ usa el handler del hook
      setData({ nombre: "", abreviado: "",});
    };

    return (
      <form onSubmit={handleSubmit} className="p-4 w-full flex">
          <div>
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
              <div className="error">{errors.nombre}</div>
            )}
          </div>
          <div>
            <input
              id="abreviado"
              name="abreviado"
              type="text"
              maxLength={20}
              placeholder="Medida Abreviada"
              value={data.abreviado}
              autoComplete="abreviado"
              onChange={(e) => setData("abreviado", e.target.value)}
              className={classInput+`${errors.abreviado && ' ring-red-500 border-red-200'}`}
            />
            {errors.abreviado && (
              <div className="error">{errors.abreviado}</div>
            )}
          </div>
        <button type="submit" disabled={processing} className="hidden" />
      </form>
    );
}
