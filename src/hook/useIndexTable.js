// useIndexTable.js
import { useState, useEffect } from "react";
//import { Inertia } from "@inertiajs/inertia";
import dayjs from "dayjs"

export default function useIndexTable({
    items,
    modules,
    route,
    filters,
    columns,
    defaultVisibility

  }) {
  const [checkedItems, setCheckedItems] = useState({});

  const initialVisibility = {};

  columns.forEach(col => {
    // Ejemplo: muestra id y name, oculta otros inicialmente
    initialVisibility[col.key] = ['id', 'name'].includes(col.key);
  });
  initialVisibility.chkTable = false;
  initialVisibility.isEditModalOpen = false;
  initialVisibility.isCreateModalOpen = false;

  const [visibility, setVisibility] = useState(() => ({
    ...defaultVisibility,
    chkTable: false,
    isEditModalOpen: false,
    isCreateModalOpen: false,
  }));

  const orderBy = filters?.orderBy || 'id';
  const orderDir = filters?.orderDir || 'asc';

  const handleToggle = (field) => {
    setVisibility(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleFalse = (field) => {
    setVisibility(prev => ({ ...prev, [field]: false }));
  };

  const handleToggleAll = () => {
    // Usar el callback para obtener el prev visibility y calcular newChk,
    // luego actualizar checkedItems en base a newChk.
    //setVisibility(prev => ({ ...prev, chkTable: !prev.chkTable }));

    setVisibility(prev => {
      const newChk = !prev.chkTable;
      // construir nuevo objeto checkedItems donde cada id adopta newChk
      const updated = {};
      Object.keys(checkedItems).forEach(id => {
        updated[id] = newChk;
      });
      // actualiza el estado de checkedItems
      setCheckedItems(updated);
      return { ...prev, chkTable: newChk };
    });
  };

  const handleToggleItem = (id) => {
    setCheckedItems(prev => {
      const updated = { ...prev, [id]: !prev[id] };
      const allChecked = Object.values(updated).every(val => val);
      setVisibility(v => ({ ...v, chkTable: allChecked }));
      return updated;
    });
  };

  const handleSort = (column, currentFilters) => {
    let newDir = 'asc';
    if (orderBy === column && orderDir === 'asc') newDir = 'desc';
/*    Inertia.get(route(modules+'.index'), {
      ...route().params,
      ...currentFilters,
      orderBy: column,
      orderDir: newDir
    }, {
      preserveState: true,
      preserveScroll: true
    });
*/
  };
  function handleDate(dateString) {
    const date = dayjs(dateString);
    const today = dayjs();

    if (date.isSame(today, 'day')) {
        return date.format('hh:mm:ss a'); // Solo hora si es hoy
    } else {
        return date.format('YYYY/MM/DD'); // Fecha completa si es otro día
    }
  }

  useEffect(() => {
    if (!items) return;

    const initial = {};
    items.forEach(item => {
      initial[item.id] = false;
    });

    // comparar antes de actualizar
    const same =
      Object.keys(initial).length === Object.keys(checkedItems).length &&
      Object.keys(initial).every(k => checkedItems[k] === initial[k]);

    if (!same) {
      setCheckedItems(initial);
    }
  }, [items]);


  return {
    visibility, setVisibility, handleToggle, handleFalse,
    checkedItems, handleToggleAll, handleToggleItem,
    handleSort, handleDate
  };
}
