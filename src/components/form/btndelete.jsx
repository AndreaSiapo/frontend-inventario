//src/components/form/btndelete.jsx
import IconDestroy from "../icons/actions/destroy";
import { apiDelete } from "../../api/http";

export default function AppBtnDelete({
    id,
    modulo,
    classForm,
    classButton="btn-delete",
    classIcon="h-4 w-4",
    currentFilters = {},
    onSuccess = () => {}}) {

  async function handleDelete(e) {
  e.preventDefault();

  if (!confirm("¿Deseas eliminar este registro?")) return;

  try {
    await apiDelete(`/${modulo}/${id}`); // ← ¡usa tu API real!
    onSuccess();
  } catch (error) {
    console.error("Delete failed:", error);
    alert("No se pudo eliminar el registro.");
  }
}

  return (
    <>
    <form onSubmit={handleDelete} className={classForm}>
        <button className={classButton}>
        <IconDestroy className={classIcon} />
        </button>
    </form>
    </>
  );
}
