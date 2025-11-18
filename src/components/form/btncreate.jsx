//btncreate.jsx
import IconPlus from "../icons/actions/plus-mark";

export default function AppBtnCreate({
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
