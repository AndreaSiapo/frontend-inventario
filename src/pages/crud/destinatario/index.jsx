import React, { useState, useEffect } from "react";

// Componentes
import AppBreadcrumb        from "./../../../components/html/breadcrumb";
import AppThTableOrder      from "./../../../components/html/thTableOrder";
import {AppBtnActions, AppBtnInfoCount, AppBtnTableSetting}  from "./../../../components/html/btn";
import {AppBtnCreate, AppBtnShowM, AppBtnEdit, AppBtnDelete} from "./../../../components/form/btn";
import Checkbox             from './../../../components/form/check';
import ModalEdit            from "./edit";
import ModalShow            from "./show";
import ModalCreate          from "./create";
import {useIndexTable, useModalHandlers, useModuleNames, useResource} from "./../../../hook/useHandler";
import AppNotification, { useFlash } from "./../../../components/html/notification";
import AppPagination        from "./../../../components/html/pagination";
//import AppSearchIndex       from "./../../../components/form/search_index";
//import Layout               from "./../../../components/app/layout";

import { appRoutes } from "../../../routes/appRoutes";
import { getDestinatarios, getDestinatario, createDestinatario, updateDestinatario, getColumns, getDefaultVisibility } from "../../../api/destinatarios";

const Index = () => {
  const columns = getColumns();
  const defaultVisibility = getDefaultVisibility();
  const [flash, notify] = useFlash();

  const [showDestinatario, setShowDestinatario] = useState(null);
  const [editDestinatario, setEditDestinatario] = useState(null);
    const { resource: destinatarios, fetchResource: fetchDestinatarios, loading, error } = useResource(
      getDestinatarios,
      getColumns,
      getDefaultVisibility
    );
  
  const currentFilters = destinatarios.filters;

  async function handEdit(id) {
    const item = await handleEditClick(id, setVisibility);
    setEditDestinatario(item); }

  async function handShow(id) {
    const item = await handleShowClick(id, setVisibility, setShowDestinatario); }

  // Hooks factorizaos
  const { module, modules, Module, Modules } = useModuleNames("destinatario", "destinatarios");
  const { visibility, handleToggle, setVisibility, handleFalse,
  checkedItems, handleToggleAll, handleToggleItem, handleSort, handleDate 
  } = useIndexTable({
      items: destinatarios.data,
      modules,
      //route,
      filters: destinatarios.filters,
      columns: columns,
      defaultVisibility: defaultVisibility  });
       
  const {handleEditClick, handleShowClick, handleEditSubmit, handleCreateClick, handleCreateSubmit, handleCloseModal} = useModalHandlers({Module, modules, currentFilters, handleFalse, notify,
    fetchItem: getDestinatario,         // GET /destinatarios/:id
    createItem: createDestinatario,     // POST /destinatarios
    updateItem: updateDestinatario,     // PUT /destinatarios/:id
    onSuccess: fetchDestinatarios
  });
  const inertValue = !visibility.isEditModalOpen ? "true" : undefined;

  if (error) {
    return (
      <>
        <AppBreadcrumb
          title={Modules}
          sites={["Tablas", Modules]}
          links={["/tablas", appRoutes.destinatario]} />

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
          links={["/tablas", appRoutes.destinatario]} />

        {flash && <AppNotification type={flash.type} message={flash.message} /> }

        <div className="div-uno">
          <div className="div-dos">
            <div className="div-tres">
              <div className="table-info-action relative">
                <h5>
                  <p className="text-gray-500">Total de {modules}:</p>
                  <p className="dark:text-white"> {destinatarios.total} </p>
                </h5>
                <AppBtnInfoCount from={destinatarios.from} to={destinatarios.to} total={destinatarios.total}  />
              </div>
              <AppBtnTableSetting visibility={visibility} toggleColumn={handleToggle} columns={columns} />
              <AppBtnActions modules={modules} checkedItems={checkedItems} currentFilters={currentFilters} endpoints={{ massDestroy: "/destinatarios/massDestroy", truncate: "/destinatarios/truncate" }} onSuccess={fetchDestinatarios}/>
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
                    {visibility.codigo &&
                    <AppThTableOrder handleSort={() => handleSort('codigo', currentFilters)} label="CODIGO" />}
                    {visibility.nombre &&
                    <AppThTableOrder handleSort={() => handleSort('nombre', currentFilters)} label="NOMBRE" />}
                    {visibility.descripcion &&
                    <AppThTableOrder handleSort={() => handleSort('descripcion', currentFilters)} label="DESCRIPCIÓN" />}
                    {visibility.plazo &&
                    <AppThTableOrder handleSort={() => handleSort('plazo', currentFilters)} label="PLAZO" />}
                    {visibility.actualizadoEn &&
                    <AppThTableOrder handleSort={() => handleSort('actualizadoEn', currentFilters)}label="actualizadoEn" />}
                    {visibility.creadoEn &&
                    <AppThTableOrder handleSort={() => handleSort('creadoEn', currentFilters)}label="creadoEn" />}
                    <th scope="col" className="p-4">ACTION </th>
                  </tr>
                </thead>
                <tbody>
                  {destinatarios.data.map((destinatario) => ( 
                  <tr className="tbody-tr border-b dark:border-gray-700" key={destinatario.id}>
                    <td className="px-4 py-3 w-4">
                      <Checkbox id={"chk_"+destinatario.id} name={"chk_"+destinatario.id} className="chk-td" checked={checkedItems[destinatario.id] || false} onChange={() => handleToggleItem(destinatario.id)} />
                    </td>
                    {visibility.id &&
                    <td className="px-4 py-3 w-4">
                    {destinatario.id}
                    </td>}
                    {visibility.codigo &&
                    <td className="px-4 py-3 w-4">
                    {destinatario.codigo}
                    </td>}
                    {visibility.nombre &&
                    <td className="px-4 py-3 w-4">
                    {destinatario.nombre}
                    </td>}
                    {visibility.descripcion &&
                    <td className="px-4 py-3 w-4">
                    {destinatario.descripcion}
                    </td>}
                    {visibility.plazo &&
                    <td className="px-4 py-3 w-4">
                    {destinatario.plazo}
                    </td>}
                    {visibility.actualizadoEn &&
                    <td className="px-4 py-3 w-4">
                    {destinatario.actualizadoEn}
                    </td>}
                    {visibility.creadoEn &&
                    <td className="px-4 py-3 w-4">
                    {destinatario.creadoEn}
                    </td>}
                    <td className="px-4 py-3 w-48">
                      <div className="flex items-center space-x-4">
                        <AppBtnEdit   modulo={modules} id={destinatario.id} onEdit={() => handEdit(destinatario.id)} />
                        <AppBtnShowM  modulo={modules} id={destinatario.id} onShow={() => handShow(destinatario.id)}/>
                        <AppBtnDelete id={destinatario.id} modulo="destinatarios" currentFilters={currentFilters} onSuccess={() => fetchDestinatarios()} />
                      </div>
                    </td>
                  </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="table-footer">
              <span className="footer-table-span">
                Mostrando <span className="font-semibold text-gray-900 dark:text-white">{" "+destinatarios.from+" - "+destinatarios.to+" "}</span>
                of <span className="font-semibold text-gray-900 dark:text-white">{" "+destinatarios.total+" "}</span>
              </span>
              <AppPagination
                page_links={destinatarios.links}
                search={destinatarios.filters.search}
                perPage={destinatarios.filters.perPage}
                onPageChange={(page) => fetchDestinatarios({ page })} />
            </div>              
          </div>
        </div>

        {visibility.isCreateModalOpen && (
          <div className="modal-create">
            <ModalCreate onSuccess={handleCreateSubmit} title={Module} handleClose={() => handleCreateClick(setVisibility)} modules={modules}/>
          </div>
        )}
        
        {visibility.isEditModalOpen && editDestinatario && (
        <ModalEdit
          title={Module}
          modules={modules}
          handleClose={() => {
            handleCloseModal();
            setEditDestinatario(null);
          }}
          value={editDestinatario}
          handleEdit={handleEditSubmit}
          inert={inertValue}
        />
        )}

        {visibility.isShowModalOpen && showDestinatario && (
        <ModalShow
          title={Module}
          modules={modules}
          handleClose={handleCloseModal}
          value={showDestinatario}
        />
        )}
          
      </>
    );
  }
}


export default Index;