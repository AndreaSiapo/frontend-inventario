// hook/useModuleNames.js
export default function useModuleNames(
    module,
    modules) {
  return {
    module,
    modules,
    Module: module.charAt(0).toUpperCase() + module.slice(1),
    Modules: modules.charAt(0).toUpperCase() + modules.slice(1)
  };
}
