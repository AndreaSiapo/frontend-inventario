//btn.jsx
import { apiDelete }  from "@/api/http";
import { useConfirm } from "@/hook/useHandler";
import ConfirmDialog  from "@html/confirmdialog";
import IconPlus       from "@icons/actions/plus-mark";
import IconDestroy    from "@icons/actions/destroy";
import IconEdit       from "@icons/actions/edit";
import IconShow       from "@icons/actions/show";
import IconX          from "@icons/actions/x-mark";

export function AppBtnCreate({
    classButton="btn-create",
    classIcon="h-3.5 w-3.5",
    onCreate,
    }) {

  return (
    <>
      <button type="button" onClick={onCreate} className={classButton}>
       <IconPlus className={classIcon}/>
      </button>
    </>
  );
}

export function AppBtnDelete({
    id,
    modulo,
    classForm,
    classButton="btn-delete",
    classIcon="h-4 w-4",
    currentFilters = {},
    onSuccess = () => {}}) {

  const confirmBox = useConfirm();

  async function handleDelete(e) {
    e.preventDefault();

    const ok = await confirmBox.confirm("¿Deseas eliminar este registro?");
    if (!ok) return;

    try {
      await apiDelete(`/${modulo}/${id}`);
      onSuccess();
    } catch (error) {
      console.error("Delete failed:", error.message);
      alert("No se pudo eliminar el registro.");
    }
  }

  return (
    <>
      <button onClick={handleDelete} className={classButton}>
        <IconDestroy className={classIcon} />
      </button>

      <ConfirmDialog 
        isOpen={confirmBox.isOpen}
        message={confirmBox.message}
        onOk={confirmBox.handleOk}
        onCancel={confirmBox.handleCancel}
      />
    </>
  );
}

export function AppBtnEdit({
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

export function AppBtnShowM({
    id, onShow,
    classButton="btn-show",
    classIcon="h-4 w-4" }) {

  return (
    <button type="button" onClick={() => onShow(id)} className={classButton}>
        <IconShow className={classIcon} />
    </button>
  );
}

export function AppBtnX({
    classIcon="w-5 h-5",
    classBtn="x-close",
    $route,
    handleClose }) {

  return (
    <button type="button" className={classBtn} onClick={handleClose} > 
        <IconX className={classIcon} />
        <span className="sr-only">Close modal</span>
    </button>
  );
}

