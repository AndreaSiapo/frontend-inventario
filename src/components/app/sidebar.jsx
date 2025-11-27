import { Link } from "react-router-dom";
import { useState } from "react";

// Iconos
import Book from "../icons/menu/book";
import Dashboard from "../icons/menu/dashboard";
import Inbox from "../icons/menu/inbox";
import Kanban from "../icons/menu/kanban";
import User from "../icons/menu/user";
import Products from "../icons/menu/products";
import SignIn from "../icons/menu/sign-in";
import SignUp from "../icons/menu/sign-up";
import IconVDown from "../icons/actions/v-down";
import IconVUp from "../icons/actions/v-up";

// Rutas reemplazando Ziggy
import { appRoutes } from "../../routes/appRoutes";

export default function Sidebar({ isOpen }) {
  const [visibility, setVisibility] = useState({
    table: false,
    otros: false,
  });

  const handleToggle = (field) => {
    setVisibility((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const tablas = [
    { label: "Unidades de Medida", path: appRoutes.u_medida,            icon: Book },
    { label: "Bodega",             path: appRoutes.bodega,              icon: Book },
    { label: "Categoría",          path: appRoutes.categoria,           icon: Book },
    { label: "Destinatario",       path: appRoutes.destinatario,        icon: Book },
    { label: "Existencia",         path: appRoutes.existencia,          icon: Book },
    { label: "Marca",              path: appRoutes.marca,               icon: Book },
    { label: "Movimiento",         path: appRoutes.movimiento,          icon: Book },
    { label: "Detalle Movimiento", path: appRoutes.detalle_movimiento,  icon: Book },
    { label: "Tipo de Documento",  path: appRoutes.tipo_documento,      icon: Book },
    { label: "Presentacion",       path: appRoutes.presentacion,        icon: Book },
    { label: "Producto",           path: appRoutes.producto,            icon: Book },
    { label: "Proveedor",          path: appRoutes.proveedor,           icon: Book },
  ];


  return (
    <aside
      id="logo-sidebar"
      aria-label="Sidebar"
      className={`flex aside ${isOpen ? "w-auto" : "w-0"}`}
    >
      <div className="aside-div">
        <ul className="aside-div-ul">

          {/* HOME */}
          <li>
            <Link to="/" className="aside-div-ul-li-link group">
              <Book className="aside-li-svg" />
              <span className="ms-3">Inicio</span>
            </Link>
          </li>

          {/* DASHBOARD */}
          <li>
            <button
              className="aside-div-ul-li-link group"
              onClick={() => handleToggle("otros")}
            >
              <Dashboard className="aside-li-svg" />
              <span className="flex-1 ms-3 whitespace-nowrap">Dashboard</span>
              {visibility.otros ? (
                <IconVUp className="w-5 h-5" />
              ) : (
                <IconVDown className="w-5 h-5 shrink-0" />
              )}
            </button>

            {visibility.otros && (
              <ul className="pl-2">
                <li>
                  <Link to="#" className="aside-div-ul-li-link group">
                    <Kanban className="aside-li-svg" />
                    <span className="flex-1 ms-3 whitespace-nowrap">
                      Kanban
                    </span>
                  </Link>
                </li>

                <li>
                  <Link to="#" className="aside-div-ul-li-link group">
                    <Inbox className="aside-li-svg" />
                    <span className="flex-1 ms-3 whitespace-nowrap">
                      Inbox
                    </span>
                  </Link>
                </li>

                <li>
                  <Link to="#" className="aside-div-ul-li-link group">
                    <User className="aside-li-svg" />
                    <span className="flex-1 ms-3 whitespace-nowrap">Users</span>
                  </Link>
                </li>

                <li>
                  <Link to="#" className="aside-div-ul-li-link group">
                    <Products className="aside-li-svg" />
                    <span className="flex-1 ms-3 whitespace-nowrap">
                      Products
                    </span>
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* TABLAS */}
          <li>
            <button
              className="aside-div-ul-li-link group"
              onClick={() => handleToggle("table")}
            >
              <SignUp className="aside-li-svg" />
              <span className="flex-1 ms-3 whitespace-nowrap">Tabla</span>
              {visibility.table ? (
                <IconVUp className="w-5 h-5" />
              ) : (
                <IconVDown className="w-5 h-5 shrink-0" />
              )}
            </button>

            {visibility.table && (
              <ul className="pl-2 font-light">
                {tablas.map((tabla, index) => {
                  const Icon = tabla.icon;
                  return (
                    <li key={index}>
                      <Link
                        to={tabla.path}
                        className="aside-div-ul-li-link group py-1"
                      >
                        <Icon className="aside-li-svg" />
                        <span className="flex-1 ms-3 whitespace-nowrap">
                          {tabla.label}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </li>
        </ul>
      </div>
    </aside>
  );
}
