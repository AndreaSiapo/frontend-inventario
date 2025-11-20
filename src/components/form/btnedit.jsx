//btnedit.jsx
import IconEdit from "../icons/actions/edit";

export default function AppBtnEdit({
    id, onEdit,
    classButton="btn-edit",
    classIcon="h-4 w-4" }) {
  return (
    <>
        <button type="button" onClick={() => onEdit(id)} className={classButton}>
            <IconEdit className={classIcon} />
        </button>
    </>
  );
}
