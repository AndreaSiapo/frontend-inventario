//pagination.jsx
import IconVRight from "../icons/actions/v-right";
import IconVLeft from "../icons/actions/v-left";
import { Link } from "react-router-dom";
import { Inertia } from "@inertiajs/inertia";

export default function AppPagination({
    page_links,
    search,
    perPage,
    classUl="inline-flex items-stretch -space-x-px" }) {
  return (
    <>
      <ul className={classUl}>
      {page_links.map((link) => (
        <li key={link.label} >
        {link.url ? (
          link.label === "pagination.next" ? (
            <Link href="#" className={`pagina-next ${link.active ? 'bg-gray-500 text-white' : 'text-blue-500 hover:bg-blue-100'}`} onClick={(e) => {
                e.preventDefault();
                Inertia.get(link.url, { search, perPage }, { preserveState: true });
              }}>
              <IconVRight className="h-5 w-5" />
            </Link>
          )
          : link.label === "pagination.previous" ? (
            <Link href="#" className={`pagina-prev ${link.active ? 'bg-gray-500 text-white' : 'text-blue-500 hover:bg-blue-100'}`} onClick={(e) => {
                e.preventDefault();
                Inertia.get(link.url, { search, perPage }, { preserveState: true });
              }}>
              <IconVLeft className="h-5 w-5" />
            </Link>)
          : (
            <Link href="#" dangerouslySetInnerHTML={{ __html: link.label }} className={`pag ${link.active ? 'bg-blue-500 text-white' : 'text-blue-500 hover:bg-blue-100'}`}
              onClick={(e) => {
                e.preventDefault();
                Inertia.get(link.url, { search, perPage }, { preserveState: true });
              }}/>
          )
        ) : (
          link.label === "pagination.next" ? (
            <span className={`pagina-next`} >
              <IconVRight className="h-5 w-5" />
            </span>
            )
            : link.label === "pagination.previous" ? (
            <span className={`pagina-prev`} >
              <IconVLeft className="h-5 w-5 " />
            </span>
            ): (
            //{ __html: link.label }
            <span dangerouslySetInnerHTML={{ __html: link.label }} />
            )
        )}
        </li>
      ))}
      </ul>
    </>

  );
}
