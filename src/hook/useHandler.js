// src/hook/useIndexTable.js
import { useEffect, useState, useCallback, useRef } from "react";
import dayjs from "dayjs";
import axios from "axios";

export function useIndexTable({
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

export function useModalHandlers({ Module, modules, route, 
  currentFilters= {}, handleFalse,
  fetchItem,       // (id) => Promise
  createItem,      // (data) => Promise
  updateItem,      // (id, data) => Promise,
  onSuccess = null,
  notify
}) {

  const handleCreateSubmit = async (data = {}) => {
    try {
      await createItem({ ...data });
      if (onSuccess) await onSuccess(); // refresca lista si se pasa
      handleFalse("isCreateModalOpen");
      notify?.("Creado con éxito", "success");
    } catch (e) {
      console.error("Error create:", e.message);
      notify?.("Error al crear "+Module, "error");
    }
  };

  const handleEditSubmit = async (id, data) => {
    try {
      await updateItem(id, { ...data, ...currentFilters });
      if (onSuccess) await onSuccess(); // refresca lista si se pasa
      handleFalse("isEditModalOpen");
      notify?.("Actualizado con éxito", "success");
    } catch (e) {
      console.error("Error edit:", e.message);
      notify?.("Error al editar "+Module, "error");
    }
  };

  const handleCreateClick = (setVisibility) => {
    setVisibility((prev) => ({
      ...prev,
      isCreateModalOpen: !prev.isCreateModalOpen,
    }));
  };

  const handleEditClick = async (id, setVisibility) => {
    try {
      const resp = await fetchItem(id);
      const item = resp.data ?? resp;

      setVisibility(prev => ({
        ...prev,
        isEditModalOpen: true
      }));

      return item;
    } catch (e) {
      console.error("Error editClick:", e.message);
      notify?.("Error al abrir para editar "+Module, "error");
    }
  };

  const handleShowClick = async (id, setVisibility, setShow) => {
    try {
      const resp = await fetchItem(id);
      const item = resp.data ?? resp;

      setShow(item); 
      setVisibility((prev) => ({
        ...prev,
        isShowModalOpen: true,
      }));
    } catch (e) {
      console.error("Error show:", e.message);
      notify?.("Error al mostrar "+Module, "error");
    }
  };

  const handleCloseModal = () => {
    handleFalse("isEditModalOpen");
    handleFalse("isShowModalOpen");
  };

  return {
    handleEditClick,
    handleShowClick,
    handleEditSubmit,
    handleCreateClick,
    handleCreateSubmit,
    handleCloseModal,
  };
}

export function useConfirm() {
  const [state, setState] = useState({
    message: "",
    resolve: null,
    isOpen: false,
  });

  function confirm(message) {
    return new Promise((resolve) => {
      setState({ message, resolve, isOpen: true });
    });
  }

  function handleCancel() {
    state.resolve(false);
    setState({ ...state, isOpen: false });
  }

  function handleOk() {
    state.resolve(true);
    setState({ ...state, isOpen: false });
  }

  return {
    isOpen: state.isOpen,
    message: state.message,
    confirm,
    handleCancel,
    handleOk,
  };
}

export function useModuleNames(
    module,
    modules) {
  return {
    module,
    modules,
    Module: module.charAt(0).toUpperCase() + module.slice(1),
    Modules: modules.charAt(0).toUpperCase() + modules.slice(1)
  };
}

export function useForm(initialValues = {}) {
  const [data, setData] = useState(initialValues);
  const [processing, setProcessing] = useState(false);
  const [errors, setErrors] = useState({});

  const update = (field, value) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const post = async (url) => {
    setProcessing(true);
    setErrors({});

    try {
      const response = await axios.post(url, data);
      return response.data;
    } catch (error) {
      const apiErrors =
        error.response?.data?.errors ||
        error.response?.data?.error ||
        error.response?.data?.message;

      if (apiErrors) setErrors(apiErrors);
      throw error;
    } finally {
      setProcessing(false);
    }
  };

  return { 
    data, 
    setData: update, 
    post, 
    processing, 
    errors,
    setErrors,
  };

}

export function useResource(fetchFn, getColumns, getDefaultVisibility) {
  const [resource, setResource] = useState({
    data: [],
    total: 0,
    from: 0,
    to: 0,
    links: [],
    filters: { search: "", perPage: 10, page: 1, orderBy: "id", orderDir: "asc" },
    columns: getColumns?.() ?? [],
    defaultVisibility: getDefaultVisibility?.() ?? [],
  });

  const [error, setError] = useState(false);  // ⬅️ NUEVO
  const [loading, setLoading] = useState(true);

  const fetchResource = async (filters = {}) => {
    setLoading(true);

    try {
      const newFilters = { ...resource.filters, ...filters };
      const json = await fetchFn(newFilters);
      setResource({
        ...json,
        filters: newFilters,
        columns: resource.columns,
        defaultVisibility: resource.defaultVisibility
      });
      setError(false); // API funcionando

    } catch (error) {
      console.error("Error al obtener data:", error.message);
      setError(true); // ⬅️ API CAÍDA
    }

    setLoading(false);
  };

  useEffect(() => { fetchResource(); }, []);

  return { resource, fetchResource, setResource, loading, error };
}