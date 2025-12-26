//search-index.jsx
import IconMagnifyingGlass from "@icons/actions/magnifying-glass";
export default function AppSearchIndex({
    classDiv1="w-full md:w-1/2",
    classForm="flex items-center",
    classDiv2="relative w-full",
    classDiv3="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none",
    classICon="w-5 h-5 text-gray-500 dark:text-gray-400",
    classInput="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
    placeholder="Buscar...",
    data,
    setData
 }){
  return (
    <>
      <div className={classDiv1}>
        <form className={classForm} >
          <label htmlFor="simple-search" className="sr-only">Search</label>
          <div className={classDiv2}>
            <div className={classDiv3}>
              <IconMagnifyingGlass className={classICon} />
            </div>
            <input
              id="simple-search"
              type="text"
              placeholder={placeholder}
              value={data.search}
              onChange={(e) => setData('search', e.target.value)}
              className={classInput}
            />
          </div>
        </form>
      </div>
    </>
  );
}
