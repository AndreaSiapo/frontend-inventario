//btnshow_m.jsx
import IconShow from "../icons/actions/show";

export default function AppBtnShowM({
    id, onShow,
    classButton="btn-show",
    classIcon="h-4 w-4" }) {

  return (
    <button type="button" onClick={() => onShow(id)} className={classButton}>
        <IconShow className={classIcon} />
    </button>
  );
}
