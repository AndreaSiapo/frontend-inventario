//btnX.jsx
import IconX from "../icons/actions/x-mark";

export default function AppBtnX({
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
