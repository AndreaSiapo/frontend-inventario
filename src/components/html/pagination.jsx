import IconVRight from "../icons/actions/v-right";
import IconVLeft from "../icons/actions/v-left";

export default function AppPagination({ 
  page_links, 
  onPageChange, 
  search, 
  perPage, 
  classUl="inline-flex items-stretch -space-x-px" }) {

  // Extraer páginas numéricas
  const numericPages = page_links.filter(l => !isNaN(Number(l.label)));
  const totalPages = numericPages.length;
  const currentPage = Number(numericPages.find(l => l.active)?.label ?? 1);

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;
  const onlyOnePage = totalPages <= 1;

  // Estado disabled
  const prevDisabled = isFirstPage || onlyOnePage;
  const nextDisabled = isLastPage || onlyOnePage;

  const baseBtn = "px-2 py-1 border border-gray-300 dark:border-gray-600 flex items-center justify-center h-9";
  const disabledStyle = "opacity-40 cursor-not-allowed text-gray-400 dark:text-gray-500";
  const activeStyle = "text-blue-500 hover:bg-blue-100 dark:hover:bg-gray-700";

  return (
    <ul className={classUl}>
      <li>
        <button
          disabled={prevDisabled}
          className={`${baseBtn} " rounded-l-md " ${prevDisabled ? disabledStyle : activeStyle}`}
          onClick={() => !prevDisabled && onPageChange(page_links[0].url)}
        >
          <IconVLeft className="h-5 w-5" />
        </button>
      </li>

      {numericPages.map((link) => (
        <li key={link.label}>
          <button
            className={`${baseBtn} 
              ${link.active ? "bg-blue-500 text-white" : activeStyle}
            `}
            dangerouslySetInnerHTML={{ __html: link.label }}
            onClick={() => onPageChange(link.url)}
          />
        </li>
      ))}
      
      <li>
        <button
          disabled={nextDisabled}
          className={`${baseBtn} " rounded-r-md " ${nextDisabled ? disabledStyle : activeStyle}`}
          onClick={() => !nextDisabled && onPageChange(page_links[page_links.length - 1].url)}
        >
          <IconVRight className="h-5 w-5" />
        </button>
      </li>
    </ul>
  );
}
