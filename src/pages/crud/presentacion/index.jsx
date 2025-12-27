import React, { useState, useEffect } from "react";

// Componentes
import AppBreadcrumb        from "@html/breadcrumb";
import AppThTableOrder      from "@html/thTableOrder";
import {AppBtnActions, AppBtnInfoCount, AppBtnTableSetting}           from "@html/btn";
import {AppBtnCreate, AppBtnShowM, AppBtnEdit, AppBtnDelete, AppBtnX} from "@form/btn";
import Checkbox             from '@form/check';
import ModalEdit            from "./edit";
import ModalShow            from "./show";
import ModalCreate          from "./create";
import {useIndexTable, useModalHandlers, useModuleNames, useResource} from "@/hook/useHandler";
import AppNotification, { useFlash } from "@html/notification";
import AppPagination        from "@html/pagination";
//import AppSearchIndex       from "@form/search_index";
//import Layout               from "@app/layout";

import { appRoutes } from "@route";
import { getPresentaciones, getPresentacion, createPresentacion, updatePresentacion, getColumns, getDefaultVisibility } from "@/api/presentaciones";

const Index = () => {
  const columns = getColumns();
  const defaultVisibility = getDefaultVisibility();
  const [flash, notify] = useFlash();

  const [showPresentacion, setShowPresentacion] = useState(null);
  const [editPresentacion, setEditPresentacion] = useState(null);
  const { resource: presentaciones, fetchResource: fetchPresentaciones, loading, error } = useResource(
    getPresentaciones,
    getColumns,
    getDefaultVisibility
  );

  const currentFilters = presentaciones.filters;
  
  async function handEdit(id) {
    const item = await handleEditClick(id, setVisibility);
    setEditPresentacion(item); }

  async function handShow(id) {
    const item = await handleShowClick(id, setVisibility, setShowPresentacion); }
  
  // Hooks factorizaos
  const { module, modules, Module, Modules } = useModuleNames("presentacion", "presentaciones");
  const { visibility, handleToggle, setVisibility, handleFalse,
  checkedItems, handleToggleAll, handleToggleItem, handleSort, handleDate 
  } = useIndexTable({
      items: presentaciones.data,
      modules,
      //route,
      filters: presentaciones.filters,
      columns: columns,
      defaultVisibility: defaultVisibility  });
       
  const {handleEditClick, handleShowClick, handleEditSubmit, handleCreateClick, handleCreateSubmit, handleCloseModal} = useModalHandlers({Module, modules, currentFilters, handleFalse, notify,
    fetchItem:  getPresentacion,         // GET /presentaciones/:id
    createItem: createPresentacion,     // POST /presentaciones
    updateItem: updatePresentacion,     // PUT /presentaciones/:id
    onSuccess:  fetchPresentaciones
  });
  const inertValue = !visibility.isEditModalOpen ? "true" : undefined;
    
  if (error) {
    return (
      <>
        <AppBreadcrumb
          title={Modules}
          sites={["Tablas", Modules]}
          links={["/tablas", appRoutes.presentacion]} />

        <div className="alert-api">
          ❗ La API no está disponible, por favor habilítala antes de usar este módulo.
        </div>
      </>
    );
  }
  else {
    return (
      <>
        <AppBreadcrumb
          title={Modules}
          sites={["Tablas",Modules]}
          links={["/tablas", appRoutes.presentacion]}
        />

        {flash && <AppNotification type={flash.type} message={flash.message} /> }

        <div className="div-uno">
          <div className="div-dos">
            <div className="div-tres">
              <div className="table-info-action relative">
                <h5>
                  <p className="text-gray-500">Total de {modules}:</p>
                  <p className="dark:text-white"> {presentaciones.total} </p>
                </h5>
                <AppBtnInfoCount from={presentaciones.from} to={presentaciones.to} total={presentaciones.total}  />
              </div>
              <AppBtnTableSetting visibility={visibility} toggleColumn={handleToggle} columns={columns} />
              <AppBtnActions modules={modules} checkedItems={checkedItems} currentFilters={currentFilters} endpoints={{ massDestroy: "/presentaciones/massDestroy", truncate: "/presentacions/truncate" }} onSuccess={fetchPresentaciones}/>
            </div>

            <div className="div-cuatro">
              <div className="relative w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 shrink-0">
                <AppBtnCreate onCreate={() => handleCreateClick(setVisibility)} />
              </div>
            </div>
            
            {/* TABLA */}
            <div className="overflow-x-auto div-de-crud">
              <table className="table">
                <thead className="thead">
                  <tr>
                    <th scope="col" className="p-4" onClick={() => handleToggle('chkTable')}>
                      <div className="flex items-center">
                        <input id="checkbox-all" type="checkbox" className="check-default" checked={visibility.chkTable} onChange={handleToggleAll} />
                        <label htmlFor="checkbox-all" className="sr-only">checkbox</label>
                      </div>
                    </th>
                    {visibility.id &&
                    <AppThTableOrder handleSort={() => handleSort('id', currentFilters)} label="ID" />}
                    {visibility.nombre &&
                    <AppThTableOrder handleSort={() => handleSort('nombre', currentFilters)} label="NOMBRE" />}
                    {visibility.detalle &&
                    <AppThTableOrder handleSort={() => handleSort('detalle', currentFilters)} label="DETALLE" />}
                    {visibility.actualizadoEn &&
                    <AppThTableOrder handleSort={() => handleSort('actualizadoEn', currentFilters)}label="actualizadoEn" />}
                    {visibility.creadoEn &&
                    <AppThTableOrder handleSort={() => handleSort('creadoEn', currentFilters)}label="creadoEn" />}
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
                    {visibility.actualizadoEn &&
                    <td className="px-4 py-3 w-4">
                    {presentacion.actualizadoEn}
                    </td>}
                    {visibility.creadoEn &&
                    <td className="px-4 py-3 w-4">
                    {presentacion.creadoEn}
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

            <div className="table-footer" aria-label="Table navigation">
              <span className="footer-table-span">
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
          <div className="modal-create">
            <ModalCreate onSuccess={handleCreateSubmit} title={Module} handleClose={() => handleCreateClick(setVisibility)} modules={modules}/>
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
}


export default Index;