//info_count.jsx
import { useState, useEffect, useRef } from "react";
import IconInfo     from '../icons/actions/info';
export default function AppBtnInfoCount({
    from, to, total,
    classIcon="h-4 w-4 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:group-hover:text-white",
 }) {
  const dropdownRef = useRef(null);

  const [visibility, setVisibility] = useState({
    info: false
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
        setVisibility(prev => ({ ...prev, info: false }));
      }
    };
    if (visibility.info) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [visibility.info]);

  return (
    <div ref={dropdownRef} className="w-auto">
      <button type="button" className="group flex" onClick={() => handleToggle('info')} data-tooltip-target="results-tooltip">
        <IconInfo className={classIcon} />
        <span className="sr-only">Mas Info</span>
      </button>
      {visibility.info && (
      <div id="results-tooltip" role="tooltip" className="div-info-results-tooltip">
        Mostrando {from+"-"+to+" de "+total} resultados
        <div className="tooltip-arrow" data-popper-arrow=""></div>
      </div>
      )}
    </div>
)}
