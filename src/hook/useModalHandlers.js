// src/hook/useModalHandlers.js
import { useState } from "react";

export default function useModalHandlers({ Module, modules, route, 
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
      console.error("Error create:", e);
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
      console.error("Error edit:", e);
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
      console.error("Error editClick:", e);
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
      console.error("Error show:", e);
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
