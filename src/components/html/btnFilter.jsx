//btnFilter.jsx
import { Link }             from "react-router-dom";
import { useState }         from "react";
import IconMagnifyingGlass  from "../icons/actions/magnifying-glass";
import IconVUp              from "../icons/actions/v-up";
import IconVDown            from "../icons/actions/v-down";
import CheckboxBall         from "../form/check2"

export default function AppBreadcrumb({

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
