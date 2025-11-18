//search-input.jsx
import IconMagnifyingGlass from "../icons/actions/magnifying-glass";
export default function SearchInput({
    id = "simple-search",
    placeholder = "Search...",
    value,
    onChange,
    className = ""
}) {
  return (
    <div className={`relative w-full ${className}`}>
      <label htmlFor={id} className="sr-only">Search</label>
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <IconMagnifyingGlass className="w-5 h-5 text-gray-500 dark:text-gray-400" />
      </div>
      <input
        type="text"
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
      />
    </div>
  );
}
