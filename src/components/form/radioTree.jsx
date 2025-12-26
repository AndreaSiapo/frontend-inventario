// src/components/form/radioTree.jsx
import { useEffect, useState } from "react";
import IconPlus from "@icons/actions/plus-mark";
import IconMinus from "@icons/actions/minus-mark";

export default function RadioTree({
  data = [],              // lista de objetos
  idField = "id",         // campo id
  parentField = "categoriaPadreId", // campo padre
  labelField = "nombre",  // campo a mostrar
  value,                  // valor seleccionado
  onChange,               // función para actualizar valor
  rootLabel = "(Sin categoría)",
}) {
  const [openNodes, setOpenNodes] = useState({});;

  const toggleNode = (id) => {
    setOpenNodes(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Construir jerarquía
  function buildHierarchy(list) {
    const safeList = Array.isArray(list) ? list : [];
    const map = new Map(safeList.map(c => [c[idField], { ...c, children: [], level: 0 }]));
    let rootItems = [];

    map.forEach(item => {
      if (item[parentField]) {
        const parent = map.get(item[parentField]);
        if (parent) {
          item.level = parent.level + 1;
          parent.children.push(item);
        }
      } else {
        rootItems.push(item);
      }
    });

    return rootItems; // ← Ahora devolvemos jerarquía real
  }
  const tree = buildHierarchy(data);

  useEffect(() => {
  if (!value) return;

  // Construye un mapa para acceder rápido por id
  const map = new Map(data.map(item => [item[idField], item]));

  let current = map.get(Number(value)) || map.get(String(value));
  const toOpen = {};

  while (current && current[parentField]) {
    const parentId = current[parentField];
    toOpen[parentId] = true;
    current = map.get(parentId);
  }

  setOpenNodes(prev => ({ ...prev, ...toOpen }));
}, [value, data]);

  // 2. Render recursivo ---
  function renderNode(node) {
    const hasChildren = node.children?.length > 0;
    const isOpen = openNodes[node[idField]] === true;

    return (
      <li key={node[idField]}>

        {/* Fila principal */}
        <div className="flex items-center" style={{ marginLeft : `${node.level * 4 + 4}px` }}>

          {hasChildren ? (
            <button
              type="button"
              onClick={() => toggleNode(node[idField])}
              className=" text-gray-700 dark:text-gray-400 hover:text-gray-900  dark:hover:text-gray-300"
            >
              {isOpen ? <IconMinus className="w-4 h-4" /> : <IconPlus className="w-4 h-4" />}
            </button>
          ) : (
            <span className="w-4" /> // alineación
          )}

          {/* Radio */}
          <input
            type="radio"
            id={`${parentField}_${node[idField]}`}
            name={parentField}
            value={node[idField]}
            checked={String(value) === String(node[idField])}
            onChange={(e) => onChange(e.target.value)}
            className="peer hidden"
          />

          <label
            htmlFor={`${parentField}_${node[idField]}`}
            className={`flex-1 cursor-pointer px-2 py-1 rounded  text-gray-700 dark:text-gray-400 
            hover:bg-gray-200 dark:hover:bg-gray-800
            peer-checked:bg-blue-50 peer-checked:text-blue-700
            dark:peer-checked:bg-blue-900 dark:peer-checked:text-blue-300`}
          >
            {node[labelField]}
          </label>

        </div>

        {/* hijos recursivos */}
        {hasChildren && isOpen && (
          <ul className="border-l-2 border-gray-700 - dark:border-gray-500"  style={{ marginLeft : `${node.level * 4 + 10}px` }} >
            {node.children.map(child => renderNode(child))}
          </ul>
        )}

      </li>
    );
  }

  return (
    <ul className="border border-gray-600 rounded-lg max-h-40 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800">
      {/* opción raíz */}
      <li key="root">
        <input
          type="radio"
          id={parentField+"_0"}
          name={parentField}
          value=""
          checked={value === ""}
          onChange={() => onChange("")}
          className="peer hidden"
        />

        <label
          htmlFor={parentField+"_0"}
          className="block cursor-pointer px-2 py-1 rounded-t-lg text-gray-700 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800
          peer-checked:bg-blue-50 peer-checked:text-blue-700
          dark:peer-checked:bg-blue-900 dark:peer-checked:text-blue-300"
        >
          {rootLabel}
        </label>
      </li>

      {/* Render jerárquico real */}
      {tree.map(node => renderNode(node))}

    </ul>
  );
}
