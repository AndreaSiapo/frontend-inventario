//useModalHandler.js

export default function useModalHandlers({ Module, modules, route, currentFilters, handleFalse }) {

  const handleCreateClick = (setVisibility) => {
    setVisibility(prev => ({ ...prev, isCreateModalOpen: !prev.isCreateModalOpen }));
  };

  return {
    handleCreateClick,
  };
}
