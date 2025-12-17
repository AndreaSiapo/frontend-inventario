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
import {useIndexTable, useModalHandlers, useModuleNames, useResource} from "./../../../hook/useHandler";
import AppNotification, { useFlash } from "./../../../components/html/notification";
import AppPagination        from "./../../../components/html/pagination";
//import AppSearchIndex       from "./../../../components/form/search_index";
//import Layout               from "./../../../components/app/layout";

import { appRoutes } from "../../../routes/appRoutes";
import { getDetalleMovimientos, getDetalleMovimiento, createDetalleMovimiento, updateDetalleMovimiento, getColumns, getDefaultVisibility } from "../../../api/detalleMovimientos";

const Index = () => {
  const columns = getColumns();
  const defaultVisibility = getDefaultVisibility();
  const [flash, notify] = useFlash();

  const [showDetalleMovimiento, setShowDetalleMovimiento] = useState(null);
  const [editDetalleMovimiento, setEditDetalleMovimiento] = useState(null);
  const { resource: detalleMovimientos, fetchResource: fetchDetalleMovimientos, loading, error } = useResource(
    getDetalleMovimientos,
    getColumns,
    getDefaultVisibility
  );
  
  const currentFilters = detalleMovimientos.filters;

  async function handEdit(id) {
    const item = await handleEditClick(id, setVisibility);
    setEditDetalleMovimiento(item); }

  async function handShow(id) {
    const item = await handleShowClick(id, setVisibility, setShowDetalleMovimiento); }
    
  // Hooks factorizaos
  const { module, modules, Module, Modules } = useModuleNames("detalleMovimiento", "detalleMovimientos");
  const { visibility, handleToggle, setVisibility, handleFalse,
  checkedItems, handleToggleAll, handleToggleItem, handleSort, handleDate 
  } = useIndexTable({
      items: detalleMovimientos.data,
      modules,
      //route,
      filters: detalleMovimientos.filters,
      columns: columns,
      defaultVisibility: defaultVisibility  });
       
  const {handleEditClick, handleShowClick, handleEditSubmit, handleCreateClick, handleCreateSubmit, handleCloseModal} = useModalHandlers({Module, modules, currentFilters, handleFalse, notify,
    fetchItem: getDetalleMovimiento,         // GET /detalleMovimientos/:id
    createItem: createDetalleMovimiento,     // POST /detalleMovimientos
    updateItem: updateDetalleMovimiento,     // PUT /detalleMovimientos/:id
    onSuccess: fetchDetalleMovimientos
  });
  
  if (error) {
    return (
      <>
        <AppBreadcrumb
          title={Modules}
          sites={["Tablas", Modules]}
          links={["/tablas", appRoutes.detalleMovimiento]} />

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
        links={["/tablas", appRoutes.detalleMovimiento]}
      />

      {flash && <AppNotification type={flash.type} message={flash.message} /> }

      <div className="div-uno">
        <div className="div-dos">
          <div className="div-tres">
            <div className="table-info-action relative">
              <h5>
                <p className="text-gray-500">Total de {modules}:</p>
                <p className="dark:text-white"> {detalleMovimientos.total} </p>
              </h5>
              <AppBtnInfoCount from={detalleMovimientos.from} to={detalleMovimientos.to} total={detalleMovimientos.total}  />
            </div>
            <AppBtnTableSetting visibility={visibility} toggleColumn={handleToggle} columns={columns} />
            <AppBtnActions modules={modules} checkedItems={checkedItems} currentFilters={currentFilters} endpoints={{ massDestroy: "/detalleMovimientos/massDestroy", truncate: "/detalleMovimientos/truncate" }} onSuccess={fetchDetalleMovimientos}/>
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
                  {visibility.referencia &&
                  <AppThTableOrder handleSort={() => handleSort('referencia', currentFilters)} label="REFERENCIA" />}
                  {visibility.descripcion &&
                  <AppThTableOrder handleSort={() => handleSort('descripcion', currentFilters)} label="DESCRIPCIÓN" />}
                  {visibility.plazo &&
                  <AppThTableOrder handleSort={() => handleSort('plazo', currentFilters)} label="PLAZO" />}
                  {visibility.actualizadoEn &&
                  <AppThTableOrder handleSort={() => handleSort('actualizadoEn', currentFilters)}label="updated_at" />}
                  {visibility.creadoEn &&
                  <AppThTableOrder handleSort={() => handleSort('creadoEn', currentFilters)}label="created_at" />}
                  <th scope="col" className="p-4">ACTION </th>
                </tr>
              </thead>
              <tbody>
                {detalleMovimientos.data.map((detalleMovimiento) => ( 
                <tr className="tbody-tr border-b dark:border-gray-700" key={detalleMovimiento.id}>
                  <td className="px-4 py-3 w-4">
                    <Checkbox id={"chk_"+detalleMovimiento.id} name={"chk_"+detalleMovimiento.id} className="chk-td" checked={checkedItems[detalleMovimiento.id] || false} onChange={() => handleToggleItem(detalleMovimiento.id)} />
                  </td>
                  {visibility.id &&
                  <td className="px-4 py-3 w-4">
                   {detalleMovimiento.id}
                  </td>}
                  {visibility.codigo &&
                  <td className="px-4 py-3 w-4">
                   {detalleMovimiento.codigo}
                  </td>}
                  {visibility.nombre &&
                  <td className="px-4 py-3 w-4">
                   {detalleMovimiento.nombre}
                  </td>}
                  {visibility.referencia &&
                  <td className="px-4 py-3 w-4">
                   {detalleMovimiento.referencia}
                  </td>}
                  {visibility.descripcion &&
                  <td className="px-4 py-3 w-4">
                   {detalleMovimiento.descripcion}
                  </td>}
                  {visibility.plazo &&
                  <td className="px-4 py-3 w-4">
                   {detalleMovimiento.plazo}
                  </td>}
                  {visibility.actualizadoEn &&
                  <td className="px-4 py-3 w-4">
                  {categoria.actualizadoEn}
                  </td>}
                  {visibility.creadoEn &&
                  <td className="px-4 py-3 w-4">
                  {categoria.creadoEn}
                  </td>}
                  <td className="px-4 py-3 w-48">
                    <div className="flex items-center space-x-4">
                      <AppBtnEdit   modulo={modules} id={detalleMovimiento.id} onEdit={() => handEdit(detalleMovimiento.id)} />
                      <AppBtnShowM  modulo={modules} id={detalleMovimiento.id} onShow={() => handShow(detalleMovimiento.id)}/>
                      <AppBtnDelete id={detalleMovimiento.id} modulo="detalleMovimientos" currentFilters={currentFilters} onSuccess={() => fetchDetalleMovimientos()} />
                    </div>
                  </td>
                </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="table-footer" aria-label="Table navigation">
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
              Mostrando <span className="font-semibold text-gray-900 dark:text-white">{" "+detalleMovimientos.from+" - "+detalleMovimientos.to+" "}</span>
              of <span className="font-semibold text-gray-900 dark:text-white">{" "+detalleMovimientos.total+" "}</span>
            </span>
            <AppPagination
              page_links={detalleMovimientos.links}
              search={detalleMovimientos.filters.search}
              perPage={detalleMovimientos.filters.perPage}
              onPageChange={(page) => fetchDetalleMovimientos({ page })}
            />
          </div>              
        </div>
      </div>

      {visibility.isCreateModalOpen && (
        <div className="modal-create">
          <ModalCreate onSuccess={handleCreateSubmit} title={Module} handleClose={() => handleCreateClick(setVisibility)} modules={modules}/>
        </div>
      )}
      
      {visibility.isEditModalOpen && editDetalleMovimiento && (
      <ModalEdit
        title={Module}
        modules={modules}
        handleClose={() => {
          handleCloseModal();
          setEditDetalleMovimiento(null);
        }}
        value={editDetalleMovimiento}
        handleEdit={handleEditSubmit}
        inert={inertValue}
      />
      )}

      {visibility.isShowModalOpen && showDetalleMovimiento && (
      <ModalShow
        title={Module}
        modules={modules}
        handleClose={handleCloseModal}
        value={showDetalleMovimiento}
      />
      )}
        
      </>
    );
  }  
}


export default Index;