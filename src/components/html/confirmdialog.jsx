// src/components/ui/confirmdialog.jsx
import IconDestroy from "../icons/actions/destroy";
import IconX       from "../icons/actions/x-mark";

export default function ConfirmDialog({ 
    isOpen, 
    message, 
    onOk, 
    onCancel,
    classIcon="h-4 w-4",
    classDiv1="fixed inset-0 bg-black/40 flex items-center justify-center z-300",
    classDiv2="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md",
    classMensaje="mb-4 text-gray-900 dark:text-white",
    classBtnCancelar="px-3 py-1 bg-gray-300 dark:bg-gray-700 rounded",
    classBtnEliminar="px-3 py-1 bg-red-600 text-white rounded",
 }) {
  if (!isOpen) return null;

  return (
    <div className={classDiv1}>
      <div className={classDiv2}>
        <p className={classMensaje}>{message}</p>

        <div className="flex gap-2 justify-end">
          <button className={classBtnCancelar+" flex align-middle"} onClick={onCancel} >
            <IconX className={classIcon} /> 
            <div className="ml-1">Cancelar</div>
          </button>
          <button className={classBtnEliminar+" flex align-middle"} onClick={onOk} >
            <IconDestroy className={classIcon} /> 
            <div className="ml-1">Eliminar</div>
          </button>
        </div>
      </div>
    </div>
  );
}
