//useModalHandler.js
import { useState } from "react";

export default function useModalHandlers({ Module, modules, route, currentFilters= {}, handleFalse,
  fetchItem,       // (id) => Promise
  createItem,      // (data) => Promise
  updateItem,      // (id, data) => Promise,
  onSuccess = null
}) {

  const handleCreateSubmit = async (data) => {
    try {
      await createItem({ ...data, ...currentFilters });
      if (onSuccess) await onSuccess(); // refresca lista si se pasa
      handleFalse("isCreateModalOpen");
    } catch (e) {
      console.error("Error create:", e);
    }
  };

  const handleEditSubmit = async (id, data) => {
    try {
      await updateItem(id, { ...data, ...currentFilters });
      if (onSuccess) await onSuccess(); // refresca lista si se pasa
      handleFalse("isEditModalOpen");
    } catch (e) {
      console.error("Error edit:", e);
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
      console.error("Error editClick:", e);
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
      console.error("Error show:", e);
    }
  };

  const handleCloseModal = () => {
    handleFalse("isEditModalOpen");
    handleFalse("isShowModalOpen");
    // ya no navegamos a rutas REST como en inertia
    // simplemente cerramos modales
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
