import React, { useState, useEffect } from "react";

//import { appRoutes } from "../../../routes/appRoutes";

// Componentes
import AppBreadcrumb        from "./../../../components/html/breadcrumb";
import AppThTableOrder      from "./../../../components/html/thTableOrder";
import {AppBtnActions, AppBtnInfoCount, AppBtnTableSetting}           from "./../../../components/html/btn";
import {AppBtnCreate, AppBtnShowM, AppBtnEdit, AppBtnDelete, AppBtnX} from "./../../../components/form/btn";
import Checkbox             from './../../../components/form/check';
import ModalEdit            from "./edit";
import ModalShow            from "./show";
import ModalCreate          from "./create";
import {useIndexTable, useModalHandlers, useModuleNames} from "./../../../hook/useHandler";
import AppNotification, { useFlash } from "./../../../components/html/notification";
import AppPagination        from "./../../../components/html/pagination";
//import AppSearchIndex       from "./../../../components/form/search_index";
//import Layout               from "./../../../components/app/layout";

import { appRoutes } from "../../../routes/appRoutes";
import { getPresentaciones, getPresentacion, createPresentacion, updatePresentacion, getColumns, getDefaultVisibility } from "../../../api/presentaciones";

const Index = () => {
  const columns = getColumns();
  const defaultVisibility = getDefaultVisibility();
  const [flash, notify] = useFlash();

  const [showPresentacion, setShowPresentacion] = useState(null);
  const [editPresentacion, setEditPresentacion] = useState(null);
  const [presentaciones, setPresentaciones] = useState({
    data: [],
    total: 0,
    from: 0,
    to: 0,
    links: [],
    filters: { search: '', perPage: 10, page: 1, orderBy: 'id', orderDir: 'asc' },
    columns: getColumns(),
    defaultVisibility: getDefaultVisibility()
  });

  const fetchPresentaciones = async (filters = {}) => {
    try {
      const newFilters = { ...presentaciones.filters, ...filters };
      const json = await getPresentaciones(newFilters);
      setPresentaciones({ ...json, filters: newFilters });

    } catch (error) {
      console.error("Error al obtener presentaciones:", error.message);
    }
  };

  useEffect(() => {
    fetchPresentaciones();
  }, []);

  async function handEdit(id) {
    const item = await handleEditClick(id, setVisibility);
    setEditPresentacion(item); }

  async function handShow(id) {
    const item = await handleShowClick(id, setVisibility, setShowPresentacion); }

  const currentFilters = {
    search: presentaciones.filters.search,
    perPage: presentaciones.filters.perPage,
    page: presentaciones.filters.page,
    orderBy: presentaciones.filters.orderBy,
    orderDir: presentaciones.filters.orderDir
  };
    
  // Hooks factorizaos
  const { module, modules, Module, Modules } = useModuleNames("presentacion", "presentaciones");
  const { visibility, handleToggle, setVisibility, handleFalse,
  checkedItems, handleToggleAll, handleToggleItem, handleSort, handleDate 
  } = useIndexTable({
      items: presentaciones.data,
      modules,
      //route,
      //filters,
      columns: columns,
      defaultVisibility: defaultVisibility  });
       
  const {handleEditClick, handleShowClick, handleEditSubmit, handleCreateClick, handleCreateSubmit, handleCloseModal} = useModalHandlers({Module, modules, currentFilters, handleFalse, notify,
    fetchItem: getPresentacion,         // GET /presentaciones/:id
    createItem: createPresentacion,     // POST /presentaciones
    updateItem: updatePresentacion,     // PUT /presentaciones/:id
    onSuccess: fetchPresentaciones
  });
  const inertValue = !visibility.isEditModalOpen ? "true" : undefined;

  return (
    <>
      <AppBreadcrumb
        title={Modules}
        sites={["Tablas",Modules]}
        links={["/tablas", appRoutes.u_medida]}
      />

      {flash && <AppNotification type={flash.type} message={flash.message} />
    }

        <div className="div-uno">
          <div className="div-dos">
            <div className="div-tres">
              <div className="flex-1 flex items-center space-x-2 relative">
                <h5>
                  <p className="text-gray-500">Total de {modules}:</p>
                  <p className="dark:text-white"> {presentaciones.total} </p>
                </h5>
                <AppBtnInfoCount from={presentaciones.from} to={presentaciones.to} total={presentaciones.total}  />
              </div>
              <AppBtnTableSetting visibility={visibility} toggleColumn={handleToggle} columns={columns} />
            </div>

            <div className="div-cuatro">
              <div className="relative w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 shrink-0">
                <AppBtnCreate onCreate={() => handleCreateClick(setVisibility)} />
                <AppBtnActions modules={modules} checkedItems={checkedItems} currentFilters={currentFilters} endpoints={{ massDestroy: "/presentaciones/massDestroy", truncate: "/presentacions/truncate" }} onSuccess={fetchPresentaciones}/>
              </div>
            </div>
            
          {/* TABLA */}
          <div className="overflow-x-auto div-de-crud">
            <table className="table">
              <thead className="thead">
                <tr>
                  <th scope="col" className="p-4" onClick={() => handleToggle('chkTable')}>
                    <div className="flex items-center">
                      <input id="checkbox-all" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" checked={visibility.chkTable} onChange={handleToggleAll} />
                      <label htmlFor="checkbox-all" className="sr-only">checkbox</label>
                    </div>
                  </th>
                  {visibility.id &&
                  <AppThTableOrder handleSort={() => handleSort('id', currentFilters)} label="ID" />}
                  {visibility.nombre &&
                  <AppThTableOrder handleSort={() => handleSort('nombre', currentFilters)} label="NOMBRE" />}
                  {visibility.detalle &&
                  <AppThTableOrder handleSort={() => handleSort('detalle', currentFilters)} label="DETALLE" />}
                  {visibility.updated_at &&
                  <AppThTableOrder handleSort={() => handleSort('updated_at', currentFilters)}label="updated_at" />}
                  {visibility.created_at &&
                  <AppThTableOrder handleSort={() => handleSort('created_at', currentFilters)}label="created_at" />}
                  <th scope="col" className="p-4">ACTION </th>
                </tr>
              </thead>
              <tbody>
                {presentaciones.data.map((presentacion) => ( 
                <tr className="tbody-tr border-b dark:border-gray-700" key={presentacion.id}>
                  <td className="px-4 py-3 w-4">
                    <Checkbox id={"chk_"+presentacion.id} name={"chk_"+presentacion.id} className="chk-td" checked={checkedItems[presentacion.id] || false} onChange={() => handleToggleItem(presentacion.id)} />
                  </td>
                  {visibility.id &&
                  <td className="px-4 py-3 w-4">
                   {presentacion.id}
                  </td>}
                  {visibility.nombre &&
                  <td className="px-4 py-3 w-4">
                   {presentacion.nombre}
                  </td>}
                  {visibility.detalle &&
                  <td className="px-4 py-3 w-4">
                   {presentacion.detalle}
                  </td>}
                  {visibility.created_at &&
                  <td className="px-4 py-3 w-4">
                   {presentacion.created_at}
                  </td>}
                  {visibility.updated_at &&
                  <td className="px-4 py-3 w-4">
                   {presentacion.updated_at}
                  </td>}
                  <td className="px-4 py-3 w-48">
                    <div className="flex items-center space-x-4">
                      <AppBtnEdit   modulo={modules} id={presentacion.id} onEdit={() => handEdit(presentacion.id)} />
                      <AppBtnShowM  modulo={modules} id={presentacion.id} onShow={() => handShow(presentacion.id)}/>
                      <AppBtnDelete id={presentacion.id} modulo="presentaciones" currentFilters={currentFilters} onSuccess={() => fetchPresentaciones()} />
                    </div>
                  </td>
                </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4" aria-label="Table navigation">
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
              Mostrando <span className="font-semibold text-gray-900 dark:text-white">{" "+presentaciones.from+" - "+presentaciones.to+" "}</span>
              of <span className="font-semibold text-gray-900 dark:text-white">{" "+presentaciones.total+" "}</span>
            </span>
            <AppPagination
              page_links={presentaciones.links}
              search={presentaciones.filters.search}
              perPage={presentaciones.filters.perPage}
              onPageChange={(page) => fetchPresentaciones({ page })}
            />
          </div>              
        </div>
      </div>
      
      {visibility.isCreateModalOpen && (
        <div className="flex w-full items-center align-middle">
          <ModalCreate onSuccess={handleCreateSubmit} title={Module} handleClose={() => handleFalse("isCreateModalOpen")} modules={modules}/>
        </div>
      )}
        
      {visibility.isEditModalOpen && editPresentacion && (
      <ModalEdit
        title={Module}
        modules={modules}
        handleClose={() => {
          handleCloseModal();
          setEditPresentacion(null);
        }}
        value={editPresentacion}
        handleEdit={handleEditSubmit}
        inert={inertValue}
      />
      )}

      {visibility.isShowModalOpen && showPresentacion && (
      <ModalShow
        title={Module}
        modules={modules}
        handleClose={handleCloseModal}
        value={showPresentacion}
      />
      )}
        
      </>
    );

}


export default Index;