//Create.jsx
import { useForm } from "../../../hook/useForm";

export default function ModalCreate( {
  classInput="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
  onSuccess
  }) {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
    });

    const handleSubmit = async (e) => {
      e.preventDefault();

      try {
        await post("/api/unidad_medida"); // tu endpoint API
        if (onSuccess) onSuccess();
      } catch (error) {
        // los errores se manejan en el hook
      }
    };

    return (
      <form onSubmit={handleSubmit} className="p-4 w-full">
          <input
            id="name"
            name="name"
            type="text"
            placeholder="New Continente"
            value={data.name}
            autoComplete="name"
            onChange={(e) => setData("name", e.target.value)}
            className={classInput+`${errors.name && ' ring-red-500 border-red-200'}`}
          />
          {errors.name && (
            <div className="text-red-500 text-sm mt-1">{errors.name}</div>
          )}
        <button type="submit" disabled={processing} className="hidden" />
      </form>
    );
}
