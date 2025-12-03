//btn.jsx
import Barcode from "react-barcode";
import { useState, useEffect, useRef } from "react";
import { Link }             from "react-router-dom";
import { apiDelete }        from "../../api/http";
import CheckboxBall         from "../form/check2"
import IconVUp              from "../icons/actions/v-up";
import IconVDown            from "../icons/actions/v-down";
import IconMagnifyingGlass  from "../icons/actions/magnifying-glass";
import IconInfo             from '../icons/actions/info';
import IconSetting          from "../icons/actions/cog-6";
import IconDowload          from "../icons/extra/download";

export function AppBtnActions({
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

export function AppBtnFilter({

}) {

  const [visibility, setVisibility] = useState({
      filter: false,
      category: false,
      price: false,
      shipping: false,
      ratting: false,
  });

  const handleToggle = (field) => {
      setVisibility(prev => ({
        ...prev,
        [field]: !prev[field],
    }));
  };

  return (
    <>
      <button id="filterDropdownButton" onClick={() => handleToggle('filter')} data-dropdown-toggle="filterDropdown" className="btn-filter" type="button">
        <IconFilter className="h-4 w-4 mr-1.5 -ml-1 text-gray-400" />
        Filter options
        {visibility.filter ?
          <IconVUp className="-mr-1 ml-1.5 w-5 h-5" />
          :
          <IconVDown className="-mr-1 ml-1.5 w-5 h-5" />}
      </button>

      {visibility.filter && (
      <div id="filterDropdown" className="absolute z-10 w-80 px-3 pt-1 top-10 bg-white rounded-lg shadow dark:bg-gray-700 right-0">
        <div className="flex items-center justify-between pt-2">
          <h6 className="text-sm font-medium text-black dark:text-white">Filters</h6>
          <div className="flex items-center space-x-3">
            <Link href="#" className="flex items-center text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline">Save view</Link>
            <Link href="#" className="flex items-center text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline">Clear all</Link>
          </div>
        </div>
        <div className="pt-3 pb-2">
          <label htmlFor="input-group-search" className="sr-only">Search</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                <IconMagnifyingGlass className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              </div>
              <input type="text" id="input-group-search" className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search keywords..."/>
            </div>
          </div>
          <div id="accordion-flush" data-accordion="collapse" data-active-classes="text-black dark:text-white" data-inactive-classes="text-gray-500 dark:text-gray-400">
          {/*<!-- Category -->*/}
          <h2 id="category-heading">
            <button type="button" onClick={() => handleToggle('category')}className="filter-list-acordion" data-accordion-target="#category-body" aria-expanded="true" aria-controls="category-body">
              Category
              {visibility.category ? <IconVUp className="w-5 h-5" />:<IconVDown className="w-5 h-5 shrink-0" />}
            </button>
          </h2>
          <div id="category-body" className={visibility.category ? "" : "hidden"} aria-labelledby="category-heading">
            <div className="py-2 font-light border-b border-gray-200 dark:border-gray-600">
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Checkbox id="chk_apple" name="chk_apple" className="chk-td" label="Apple (56)" classLabel="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100" />
                </li>
                <li className="flex items-center">
                  <Checkbox id="chk_microsoft" name="chk_microsoft" className="chk-td" label="Microsoft (45)" classLabel="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100" />
                </li>
                <li className="flex items-center">
                  <Checkbox id="chk_logitech" name="chk_logitech" className="chk-td" label="Logitech (97)" classLabel="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100" />
                </li>
                <li className="flex items-center">
                  <Checkbox id="chk_sony" name="chk_sony" className="chk-td" label="Sony (234)" classLabel="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100" />
                </li>
                <li className="flex items-center">
                  <Checkbox id="chk_asus" name="chk_asus" className="chk-td" label="Asus (97)" classLabel="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100" />
                </li>
                <li className="flex items-center">
                  <Checkbox id="chk_dell" name="chk_dell" className="chk-td" label="Dell (56)" classLabel="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100" />
                </li>
                <a href="#" className="flex items-center text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline">View all</a>
              </ul>
            </div>
          </div>
          {/*<!-- Price -->*/}
          <h2 id="price-heading">
            <button type="button" onClick={() => handleToggle('price')}className="filter-list-acordion" data-accordion-target="#price-body" aria-expanded="true" aria-controls="price-body">
              Price
              {visibility.price ? <IconVUp className="w-5 h-5" />:<IconVDown className="w-5 h-5 shrink-0" />}
            </button>
          </h2>
          <div id="price-body" className={visibility.price ? "" : "hidden"} aria-labelledby="price-heading">
            <div className="flex items-center py-2 space-x-3 font-light border-b border-gray-200 dark:border-gray-600">
              <select id="price-from" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"><option disabled="" selected="">From</option><option>$500</option><option>$2500</option><option>$5000</option></select><select id="price-to" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"><option disabled="" selected="">To</option><option>$500</option><option>$2500</option><option>$5000</option></select>
            </div>
          </div>
          {/*<!-- Worldwide Shipping -->*/}
          <h2 id="worldwide-shipping-heading">
            <button type="button" onClick={() => handleToggle('shipping')}className="filter-list-acordion" data-accordion-target="#worldwide-shipping-body" aria-expanded="true" aria-controls="worldwide-shipping-body">
              Worldwide Shipping
              {visibility.shipping ? <IconVUp className="w-5 h-5" />:<IconVDown className="w-5 h-5 shrink-0" />}
            </button>
          </h2>
          <div id="worldwide-shipping-body" className={visibility.shipping ? "" : "hidden"} aria-labelledby="worldwide-shipping-heading">
            <div className="py-2 space-y-2 font-light border-b border-gray-200 dark:border-gray-600">
              <CheckboxBall label="North America" classLabel1="relative flex items-center cursor-pointer" classLabel2="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300" />
              <CheckboxBall label="South America" classLabel1="relative flex items-center cursor-pointer" classLabel2="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300" />
              <CheckboxBall label="Asia" classLabel1="relative flex items-center cursor-pointer" classLabel2="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300" />
              <CheckboxBall label="Austria" classLabel1="relative flex items-center cursor-pointer" classLabel2="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300" />
              <CheckboxBall label="Europe" classLabel1="relative flex items-center cursor-pointer" classLabel2="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300" />
            </div>
          </div>
          {/*-- Rating --*/}
          <h2 id="rating-heading">
            <button type="button" onClick={() => handleToggle('ratting')} className="flex items-center justify-between w-full py-2 px-1.5 text-sm font-medium text-left text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700" data-accordion-target="#rating-body" aria-expanded="true" aria-controls="rating-body">
              <span>Rating</span>
              {visibility.ratting ? <IconVUp className="w-5 h-5" />:<IconVDown className="w-5 h-5 shrink-0" />}
            </button>
          </h2>
          <div id="rating-body" className={visibility.ratting ? "" : "hidden"}  aria-labelledby="rating-heading">
            <div className="py-2 space-y-2 font-light border-b border-gray-200 dark:border-gray-600">
              <div className="flex items-center">
                <input id="five-stars" type="radio" value="" name="rating" className="w-4 h-4 bg-gray-100 border-gray-300 text-blue-600 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                <label htmlFor="five-stars" className="flex items-center ml-2">
                  <IconStar className="w-5 h-5 text-yellow-400" />
                  <IconStar className="w-5 h-5 text-yellow-400" />
                  <IconStar className="w-5 h-5 text-yellow-400" />
                  <IconStar className="w-5 h-5 text-yellow-400" />
                  <IconStar className="w-5 h-5 text-yellow-400" />
                </label>
              </div>
              <div className="flex items-center">
                <input id="four-stars" type="radio" value="" name="rating" className="w-4 h-4 bg-gray-100 border-gray-300 text-blue-600 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                <label htmlFor="four-stars" className="flex items-center ml-2">
                  <IconStar className="w-5 h-5 text-yellow-400" />
                  <IconStar className="w-5 h-5 text-yellow-400" />
                  <IconStar className="w-5 h-5 text-yellow-400" />
                  <IconStar className="w-5 h-5 text-yellow-400" />
                  <IconStar className="w-5 h-5 text-gray-300 dark:text-gray-500" />
                </label>
              </div>
              <div className="flex items-center">
                <input id="three-stars" type="radio" value="" name="rating" checked="" className="w-4 h-4 bg-gray-100 border-gray-300 text-blue-600 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                <label htmlFor="three-stars" className="flex items-center ml-2">
                  <IconStar className="w-5 h-5 text-yellow-400" />
                  <IconStar className="w-5 h-5 text-yellow-400" />
                  <IconStar className="w-5 h-5 text-yellow-400" />
                  <IconStar className="w-5 h-5 text-gray-300 dark:text-gray-500" />
                  <IconStar className="w-5 h-5 text-gray-300 dark:text-gray-500" />
                </label>
              </div>
              <div className="flex items-center">
                <input id="two-stars" type="radio" value="" name="rating" className="w-4 h-4 bg-gray-100 border-gray-300 text-blue-600 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                <label htmlFor="two-stars" className="flex items-center ml-2">
                  <IconStar className="w-5 h-5  text-yellow-400" />
                  <IconStar className="w-5 h-5  text-yellow-400" />
                  <IconStar className="w-5 h-5 text-gray-300   dark:text-gray-500" />
                  <IconStar className="w-5 h-5 text-gray-300 dark:text-gray-500" />
                  <IconStar className="w-5 h-5 text-gray-300 dark:text-gray-500" />
                </label>
              </div>
              <div className="flex items-center">
                <input id="one-star" type="radio" value="" name="rating" className="w-4 h-4 bg-gray-100 border-gray-300 text-blue-600 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                <label htmlFor="one-star" className="flex items-center ml-2">
                  <IconStar className="w-5 h-5  text-yellow-400" />
                  <IconStar className="w-5 h-5 text-gray-300 dark:text-gray-500" />
                  <IconStar className="w-5 h-5 text-gray-300 dark:text-gray-500" />
                  <IconStar className="w-5 h-5 text-gray-300 dark:text-gray-500" />
                  <IconStar className="w-5 h-5 text-gray-300 dark:text-gray-500" />
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
   )}
  </>
  );
}

export function AppBtnInfoCount({
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

export function AppBtnTableSetting({
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

export function AppBtnCodeBar({
    codigo="0",
    classDiv1="gap-2 p-2 m-4 md:p-3 rounded-lg border bg-gray-300 text-gray-900 dark:text-white",
    w=""
}) {

  return (
    <div className={"relative flex items-center justify-center "+classDiv1+"overflow-auto col-span-2 flex justify-center "+w}>
        <Barcode
          renderer="svg"
          value={codigo}
          background="transparent"
          lineColor={"#000"}
          textColor={"#000"}
          height={50}
          width={2}
          displayValue={true}
          fontSize={14}
        />
    </div>
  );
}

export function AppBtnCodeBarDownload({
    modules="",
    codigo="0",
    classDiv1="gap-2 p-2 m-4 md:p-3 rounded-lg border bg-gray-300 text-gray-900 dark:text-white",
    z=100,
    w=""
}) {
  const barcodeRef = useRef(null);
  const downloadSVG = () => {
    const svg = barcodeRef.current?.querySelector("svg");
    if (!svg) return;

    const serializer = new XMLSerializer();
    const source = serializer.serializeToString(svg);

    const blob = new Blob([source], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `cb_${modules+"_"+codigo}.svg`;
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className={"relative flex items-center justify-center "+classDiv1+" "+w} ref={barcodeRef}>
      <div className={"overflow-auto col-span-2 flex justify-center "+w}>
        <Barcode
          renderer="svg"
          value={codigo}
          background="transparent"
          lineColor={"#000"}
          textColor={"#000"}
          height={50}
          width={2}
          displayValue={true}
          fontSize={14}
        />
      </div>
      <div className={"z-"+z+" absolute flex rounded-lg justify-end pt-20 right-7"}>
        <button onClick={downloadSVG} className="flex px-3 py-1 rounded-lg text-gray-400 hover:bg-gray-400 hover:text-gray-700 w-10 align-middle" >
          <IconDowload className="h-5 w-5"/>
        </button>
      </div>
    </div>
  );
}


