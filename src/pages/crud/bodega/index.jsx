// src/pages/crud/bodega/index.jsx
import React, { useState, useEffect } from "react";

// Componentes
import AppBreadcrumb        from "./../../../components/html/breadcrumb";
import AppThTableOrder      from "./../../../components/html/thTableOrder";
import {AppBtnActions, AppBtnInfoCount, AppBtnTableSetting, AppBtnCodeBar, AppBtnCodeBarDownload} from "./../../../components/html/btn";
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
import { getBodegas, getBodega, createBodega, updateBodega, getColumns, getDefaultVisibility } from "../../../api/bodegas";

const Index = () => {
  const columns = getColumns();
  const defaultVisibility = getDefaultVisibility();
  const [flash, notify] = useFlash();

  const [showBodega, setShowBodega] = useState(null);
  const [editBodega, setEditBodega] = useState(null);
    const { resource: bodegas, fetchResource: fetchBodegas, loading, error  } = useResource(
      getBodegas,
      getColumns,
      getDefaultVisibility
    );

  const currentFilters = bodegas.filters;

  async function handEdit(id) {
    const item = await handleEditClick(id, setVisibility);
    setEditBodega(item); }

  async function handShow(id) {
    const item = await handleShowClick(id, setVisibility, setShowBodega); }
    
  // Hooks factorizaos
  const { module, modules, Module, Modules } = useModuleNames("bodega", "bodegas");
  const { visibility, handleToggle, setVisibility, handleFalse,
  checkedItems, handleToggleAll, handleToggleItem, handleSort, handleDate 
  } = useIndexTable({
      items: bodegas.data,
      modules,
      //route,
      //filters,
      columns: columns,
      defaultVisibility: defaultVisibility  });
       
  const {handleEditClick, handleShowClick, handleEditSubmit, handleCreateClick, handleCreateSubmit, handleCloseModal} = useModalHandlers({Module, modules, currentFilters, handleFalse, notify,
    fetchItem: getBodega,         // GET /bodegas/:id
    createItem: createBodega,     // POST /bodegas
    updateItem: updateBodega,     // PUT /bodegas/:id
    onSuccess: fetchBodegas
  });
  const inertValue = !visibility.isEditModalOpen ? "true" : undefined;
  
  if (error) {
    return (
      <>
        <AppBreadcrumb
          title={Modules}
          sites={["Tablas", Modules]}
          links={["/tablas", appRoutes.bodega]} />

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
          links={["/tablas", appRoutes.bodega]} />

        { flash && <AppNotification type={flash.type} message={flash.message} /> }
        
        <div className="div-uno">
          <div className="div-dos">
            <div className="div-tres">
              <div className="table-info-action relative">
                <h5>
                  <p className="text-gray-500">Total de {modules}:</p>
                  <p className="dark:text-white"> {bodegas.total} </p>
                </h5>
                <AppBtnInfoCount from={bodegas.from} to={bodegas.to} total={bodegas.total}  />
              </div>
              <AppBtnTableSetting visibility={visibility} toggleColumn={handleToggle} columns={columns} />
              <AppBtnActions modules={modules} checkedItems={checkedItems} currentFilters={currentFilters} endpoints={{ massDestroy: "/bodegas/massDestroy", truncate: "/bodegas/truncate" }} onSuccess={fetchBodegas}/>
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
                        <input id="checkbox-all" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" checked={visibility.chkTable} onChange={handleToggleAll} />
                        <label htmlFor="checkbox-all" className="sr-only">checkbox</label>
                      </div>
                    </th>
                    {visibility.id &&
                    <AppThTableOrder handleSort={() => handleSort('id', currentFilters)} label="ID" />}
                    {visibility.codigo &&
                    <AppThTableOrder handleSort={() => handleSort('codigo', currentFilters)} label="CODIGO" />}
                    {visibility.codigo_barra &&
                    <AppThTableOrder handleSort={() => handleSort('codigo_barra', currentFilters)} label="BARCODE" />}
                    {visibility.nombre &&
                    <AppThTableOrder handleSort={() => handleSort('nombre', currentFilters)} label="NOMBRE" />}
                    {visibility.detalle &&
                    <AppThTableOrder handleSort={() => handleSort('detalle', currentFilters)} label="REFERENCIA" />}
                    {visibility.ubicacion &&
                    <AppThTableOrder handleSort={() => handleSort('ubicacion', currentFilters)} label="DESCRIPCIÓN" />}
                    {visibility.referencia &&
                    <AppThTableOrder handleSort={() => handleSort('referencia', currentFilters)} label="PLAZO" />}
                    {visibility.capacidad &&
                    <AppThTableOrder handleSort={() => handleSort('capacidad', currentFilters)} label="PLAZO" />}
                    {visibility.tamano &&
                    <AppThTableOrder handleSort={() => handleSort('tamano', currentFilters)} label="PLAZO" />}
                    {visibility.created_at &&
                    <AppThTableOrder handleSort={() => handleSort('created_at', currentFilters)}label="created_at" />}
                    {visibility.updated_at &&
                    <AppThTableOrder handleSort={() => handleSort('updated_at', currentFilters)}label="updated_at" />}
                    <th scope="col" className="p-4">ACTION </th>
                  </tr>
                </thead>
                <tbody>
                  {bodegas.data.map((bodega) => ( 
                  <tr className="tbody-tr border-b dark:border-gray-700" key={bodega.id}>
                    <td className="px-4 py-3 w-4">
                      <Checkbox id={"chk_"+bodega.id} name={"chk_"+bodega.id} className="chk-td" checked={checkedItems[bodega.id] || false} onChange={() => handleToggleItem(bodega.id)} />
                    </td>
                    {visibility.id &&
                    <td className="px-4 py-3 w-4">
                    {bodega.id}
                    </td>}
                    {visibility.codigo &&
                    <td className="px-4 py-3 w-4">
                    {bodega.codigo}
                    </td>}
                    {visibility.codigo_barra &&
                    <td className="px-4 py-3 w-48">
                      <AppBtnCodeBar codigo={bodega.codigo} w="w-48"/> 
                    </td>}
                    {visibility.nombre &&
                    <td className="px-4 py-3 w-4">
                    {bodega.nombre}
                    </td>}
                    {visibility.detalle &&
                    <td className="px-4 py-3 w-4">
                    {bodega.detalle}
                    </td>}
                    {visibility.ubicacion &&
                    <td className="px-4 py-3 w-4">
                    {bodega.ubicacion}
                    </td>}
                    {visibility.referencia &&
                    <td className="px-4 py-3 w-4">
                    {bodega.referencia}
                    </td>}
                    {visibility.capacidad &&
                    <td className="px-4 py-3 w-4">
                    {bodega.capacidad}
                    </td>}
                    {visibility.tamano &&
                    <td className="px-4 py-3 w-4">
                    {bodega.tamano}
                    </td>}
                    {visibility.created_at &&
                    <td className="px-4 py-3 w-4">
                    {bodega.created_at}
                    </td>}
                    {visibility.updated_at &&
                    <td className="px-4 py-3 w-4">
                    {bodega.updated_at}
                    </td>}
                    <td className="px-4 py-3 w-48">
                      <div className="flex items-center space-x-4">
                        <AppBtnEdit   modulo={modules} id={bodega.id} onEdit={() => handEdit(bodega.id)} />
                        <AppBtnShowM  modulo={modules} id={bodega.id} onShow={() => handShow(bodega.id)}/>
                        <AppBtnDelete id={bodega.id} modulo="bodegas" currentFilters={currentFilters} onSuccess={() => fetchBodegas()} />
                      </div>
                    </td>
                  </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="table-footer" aria-label="Table navigation">
              <span className="footer-table-span">
                Mostrando <span className="font-semibold text-gray-900 dark:text-white">{" "+bodegas.from+" - "+bodegas.to+" "}</span>
                of <span className="font-semibold text-gray-900 dark:text-white">{" "+bodegas.total+" "}</span>
              </span>
              <AppPagination
                page_links={bodegas.links}
                search={bodegas.filters.search}
                perPage={bodegas.filters.perPage}
                onPageChange={(page) => fetchBodegas({ page })}
              />
            </div>              
          </div>
        </div>

        {visibility.isCreateModalOpen && (
          <div className="modal-create">
            <ModalCreate 
              onSuccess={handleCreateSubmit} 
              title={Module} 
              handleClose={() => handleCreateClick(setVisibility)} 
              modules={modules}/>
          </div>
        )}
        
        {visibility.isEditModalOpen && editBodega && (
        <ModalEdit
          title={Module}
          modules={modules}
          handleClose={() => {
            handleCloseModal();
            setEditBodega(null); }}
          value={editBodega}
          handleEdit={handleEditSubmit}
          inert={inertValue}
        />
        )}

        {visibility.isShowModalOpen && showBodega && (
        <ModalShow
          title={Module}
          modules={modules}
          handleClose={handleCloseModal}
          value={showBodega}
        />
        )}
        </>
    );
  }
}

export default Index;