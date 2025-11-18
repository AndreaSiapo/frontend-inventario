//btnActions.jsx
import { Inertia } from "@inertiajs/inertia";
import { useState, useEffect, useRef } from "react";
import IconVUp      from "../icons/actions/v-up";
import IconVDown    from "../icons/actions/v-down";

export default function AppBtnActions({
    modules,
    checkedItems,
    currentFilters,
    labelDel="Delete all",
    labelDes="Destroy all",
    labelEdit="Mass Edit"
  }) {
  const [btnvisibility, setVisibility] = useState({ actions: false });
  const dropdownRef = useRef(null);

  const handleToggle = (field) => {
    setVisibility((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const deleteSelected = () => {
    const selectedIds = Object.keys(checkedItems).filter((id) => checkedItems[id]);
    if (selectedIds.length === 0) {
      alert("No has seleccionado ningún autor para eliminar.");
      return;
    }
    if (confirm("¿Estás seguro de que quieres eliminar los autores seleccionados?")) {
      Inertia.post(route(modules + ".massDestroy"), { ids: selectedIds,
        ...currentFilters }, {
        onSuccess: () => handleToggle("actions")
      });
    }
  };

  const destroyAll = () => {
    if (confirm("¿Estás seguro de que quieres eliminar todos los autores?")) {
      Inertia.delete(route(modules + ".truncate"), {
        onSuccess: () => handleToggle("actions")
      });
    }
  };

  const editMass = () => {
    alert("Función de edición masiva aún no implementada");
    handleToggle("actions");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setVisibility((prev) => ({ ...prev, actions: false }));
      }
    };

    if (btnvisibility.actions) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside); }

    // Limpieza al desmontar o cuando cambia btnvisibility.actions
    return () => {
      document.removeEventListener("mousedown", handleClickOutside); };
  }, [btnvisibility.actions]);


  return (
    <>
      <div  ref={dropdownRef} className="flex items-center space-x-3 w-full md:w-auto relative">
        <button id="actionsDropdownButton" onClick={() => handleToggle('actions')}data-dropdown-toggle="actionsDropdown" className="btn-actions" type="button">
          Actions
          {btnvisibility.actions ? <IconVUp className="w-5 h-5" />:<IconVDown className="w-5 h-5 shrink-0" />}
        </button>
        {btnvisibility.actions && (
        <div id="actionsDropdown" className="absolute z-10 w-44 top-10 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
          <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="actionsDropdownButton">
            <li>
              <button type="button" onClick={editMass} className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white w-full text-left">{labelEdit}</button>
            </li>
            <li>
              <button type="button" onClick={deleteSelected} className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white w-full text-left">{labelDel}</button>
            </li>
          </ul>
          <div className="py-1">
            <button type="button" onClick={destroyAll} className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white w-full text-left">{labelDes}</button>
          </div>
        </div>
        )}
      </div>
    </>
)}
