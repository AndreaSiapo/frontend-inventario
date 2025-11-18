//btnTableSetting.jsx
import { useState, useEffect, useRef } from "react";
import IconSetting from "../icons/actions/cog-6";
export default function AppBtnTableSetting({
    columns, visibility, toggleColumn
  }) {
  const dropdownRef = useRef(null);

  const [btnvisibility, setVisibility] = useState({
    tooltip: false
  });

  const handleToggle = (field) => {
    setVisibility(prev => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setVisibility(prev => ({ ...prev, tooltip: false }));
      }
    };
    if (btnvisibility.tooltip) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [btnvisibility.tooltip]);

  return (
    <>
      {/* BTN TABLE SETTING */}
      <div ref={dropdownRef} className="div-btn-settings-crud relative">
        <button type="button" className="btn-settings-crud" onClick={() => handleToggle('tooltip')}>
          <IconSetting className="mr-2 w-4 h-4" />
          Table settings
        </button>
        {/*<!-- Dropdown menu -->*/}
        <div id="dropdownToggle" className= {`${btnvisibility.tooltip ? '' : 'hidden '} z-10 top-10 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-72 dark:bg-gray-700 dark:divide-gray-600 absolute`}>
          <ul className="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownToggleButton">
            {columns.map(col => (
            <li key={col.key}>
              <div className="flex p-2 rounded-sm hover:bg-gray-100 dark:hover:bg-gray-600">
                <label className="inline-flex items-center w-full cursor-pointer">
                  <input id={`chk_col_`+col.label} type="checkbox" className="sr-only peer" onChange={() => toggleColumn(col.key)} checked={!!visibility[col.key]} />
                  <div className="relative w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full rtl:peer-checked:after:translate-x-[-100%] peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-500 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
                  <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">{col.label}</span>
                </label>
              </div>
            </li>
          ))}
          </ul>
        </div>
      </div>
    </>
)}
