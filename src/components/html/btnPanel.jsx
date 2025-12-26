// src/components/icons/html/btnPanel
import IconRowRight       from "@icons/actions/row-right";
import IconCheckWorkerISO from "@icons/extra/check_worker";
import IconInISO          from "@icons/extra/in";
import IconBuyISO         from "@icons/extra/buy";
import IconSaleISO        from "@icons/extra/sale";
import IconReturnBoxISO   from "@icons/extra/return";

export function BtnPanel3({
    className = "w-10 h-10 text-gray-200 dark:text-gray-600",
    icon,
    size="w-15 h-15",
    title,
    description,
    link
}) {

  const icons = (icono) => {
    const list_icons = {
      in: <IconInISO className={size} />,
      buy: <IconBuyISO className={size} />,
      sale: <IconSaleISO className={size} />,
      check_worker: <IconCheckWorkerISO className={size} />,
      return_box: <IconReturnBoxISO className={size} />,
      row_right: <IconRowRight className={size} />
    };  
    return list_icons[icono] || null;
  }


  return (
  <>
    <div className="panel-card3">
      <a href={link || "#"}>
        <div className="panel-card-div">
          <div className="panel-card-div-icon">
            {icons(icon)}
          </div>
          <h2 className="panel-li-h2">{title}</h2>
          <p className="panel-li-p">{description}</p>
        </div>
      </a>
    </div>
  </>
  );
}

export function BtnPanel4({
    className = "w-10 h-10 text-gray-200 dark:text-gray-600",
    icon,
    size="w-15 h-15",
    title,
    description,
    link
}) {

  const icons = (icono) => {
    const list_icons = {
      in: <IconInISO className={size} />,
      buy: <IconBuyISO className={size} />,
      sale: <IconSaleISO className={size} />,
      check_worker: <IconCheckWorkerISO className={size} />,
      return_box: <IconReturnBoxISO className={size} />,
      row_right: <IconRowRight className={size} />
    };  
    return list_icons[icono] || null;
  }


  return (
  <>
    <div className="panel-card4">
      <a href={link || "#"}>
        <div className="panel-card-div">
          <div className="panel-card-div-icon">
            {icons(icon)}
          </div>
          <h2 className="panel-li-h2">{title}</h2>
          <p className="panel-li-p">{description}</p>
        </div>
      </a>
    </div>
  </>
  );
}
