//btnActions.jsx
import { useState, useEffect, useRef } from "react";
import IconVUp   from "../icons/actions/v-up";
import IconVDown from "../icons/actions/v-down";
import { apiDelete } from "../../api/http"; // tu cliente genérico

export default function AppBtnActions({
    modules,
    checkedItems = {},
    currentFilters = {},
    endpoints = {}, // { massDestroy: '/ruta/massDestroy', truncate: '/ruta/truncate' }
    labelDel = "Delete all",
    labelDes = "Destroy all",
    labelEdit = "Mass Edit",
    onSuccess = () => {}
}) {
    const [btnVisibility, setVisibility] = useState({ actions: false });
    const dropdownRef = useRef(null);

    const handleToggle = (field) => {
      setVisibility((prev) => ({ ...prev, [field]: !prev[field] }));
    };

    const deleteSelected = async () => {
      const selectedIds = Object.keys(checkedItems).filter((id) => checkedItems[id]);
      if (!selectedIds.length) {
        alert("No has seleccionado ningún registro para eliminar.");
        return;
      }
      if (!confirm("¿Estás seguro de que quieres eliminar los seleccionados?")) return;

      try {
        await apiDelete(endpoints.massDestroy, { ids: selectedIds, ...currentFilters });
          onSuccess(); // refresca la tabla
          handleToggle("actions");
      } catch (e) {
        console.error("Error al eliminar seleccionados:", e);
      }
    };

    const destroyAll = async () => {
      if (!confirm("¿Estás seguro de que quieres eliminar todos los registros?")) return;

      try {
        await apiDelete(endpoints.truncate, currentFilters);
          onSuccess();
          handleToggle("actions");
      } catch (e) {
        console.error("Error al eliminar todos:", e);
      }
    };

    const editMass = () => {
      alert("Función de edición masiva aún no implementada");
      handleToggle("actions");
    };

    useEffect(() => {
     const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setVisibility((prev) => ({ ...prev, actions: false }));
        }
      };

      if (btnVisibility.actions) {
        document.addEventListener("mousedown", handleClickOutside);
      } else {
        document.removeEventListener("mousedown", handleClickOutside);
      }

      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [btnVisibility.actions]);

    return (
      <div ref={dropdownRef} className="flex items-center space-x-3 w-full md:w-auto relative">
        <button
          id="actionsDropdownButton"
          onClick={() => handleToggle("actions")}
          className="btn-actions"
          type="button"
        >
          Actions {btnVisibility.actions ? <IconVUp className="w-5 h-5" /> : <IconVDown className="w-5 h-5 shrink-0" />}
        </button>

        {btnVisibility.actions && (
        <div className="absolute z-10 w-44 top-10 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
          <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="actionsDropdownButton">
            <li>
              <button type="button" onClick={editMass} className="block py-2 px-4 w-full text-left text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white" >
                {labelEdit}
              </button>
            </li>
            <li>
              <button type="button" onClick={deleteSelected} className="block py-2 px-4 w-full text-left text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white" >
                  {labelDel}
              </button>
            </li>
          </ul>
          <div className="py-1">
            <button type="button" onClick={destroyAll} className="block py-2 px-4 w-full text-left text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white" >
                {labelDes}
            </button>
          </div>
        </div>
        )}
      </div>
    );
}
