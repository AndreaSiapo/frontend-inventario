import IconVRight from "../icons/actions/v-right";
import IconVLeft from "../icons/actions/v-left";

export default function AppPagination({ page_links, onPageChange, search, perPage, classUl="inline-flex items-stretch -space-x-px" }) {
  return (
    <ul className={classUl}>
      {page_links.map((link) => (
        <li key={link.label}>
          {link.url ? (
            link.label === "pagination.next" ? (
              <button
                className={`pagina-next ${link.active ? 'bg-gray-500 text-white' : 'text-blue-500 hover:bg-blue-100'}`}
                onClick={() => onPageChange(link.url)}
              >
                <IconVRight className="h-5 w-5" />
              </button>
            ) : link.label === "pagination.previous" ? (
              <button
                className={`pagina-prev ${link.active ? 'bg-gray-500 text-white' : 'text-blue-500 hover:bg-blue-100'}`}
                onClick={() => onPageChange(link.url)}
              >
                <IconVLeft className="h-5 w-5" />
              </button>
            ) : (
              <button
                className={`pag ${link.active ? 'bg-blue-500 text-white' : 'text-blue-500 hover:bg-blue-100'}`}
                dangerouslySetInnerHTML={{ __html: link.label }}
                onClick={() => onPageChange(link.url)}
              />
            )
          ) : (
            link.label === "pagination.next" ? (
              <span className="pagina-next"><IconVRight className="h-5 w-5" /></span>
            ) : link.label === "pagination.previous" ? (
              <span className="pagina-prev"><IconVLeft className="h-5 w-5" /></span>
            ) : (
              <span dangerouslySetInnerHTML={{ __html: link.label }} />
            )
          )}
        </li>
      ))}
    </ul>
  );
}
