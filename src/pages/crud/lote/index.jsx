import React, { useState, useEffect } from "react";

// Componentes
import AppBreadcrumb        from "./../../../components/html/breadcrumb";
import AppThTableOrder      from "./../../../components/html/thTableOrder";
import {AppBtnActions, AppBtnInfoCount, AppBtnTableSetting, AppBtnCodeBarDownload, AppBtnCodeBar}           from "./../../../components/html/btn";
import {AppBtnCreate, AppBtnShowM, AppBtnEdit, AppBtnDelete, AppBtnX} from "./../../../components/form/btn";
import Checkbox             from './../../../components/form/check';
import ModalEdit            from "./edit";
import ModalShow            from "./show";
import ModalCreate          from "./create";
import {useIndexTable, useModalHandlers, useModuleNames, useResource, useMoneda } from "./../../../hook/useHandler";
import AppNotification, { useFlash } from "./../../../components/html/notification";
import AppPagination        from "./../../../components/html/pagination";
//import AppSearchIndex       from "./../../../components/form/search_index";
//import Layout               from "./../../../components/app/layout";

import { appRoutes } from "../../../routes/appRoutes";
import { getLotes, getLote, createLote, updateLote, getColumns, getDefaultVisibility } from "../../../api/lotes";

const Index = () => {
  const columns = getColumns();
  const defaultVisibility = getDefaultVisibility();
  const [flash, notify] = useFlash();

  const [showLote, setShowLote] = useState(null);
  const [editLote, setEditLote] = useState(null);
  const { resource: lotes, fetchResource: fetchLotes, loading, error } = useResource(
    getLotes,
    getColumns,
    getDefaultVisibility
  );

  const currentFilters = lotes.filters;

  async function handEdit(id) {
    const item = await handleEditClick(id, setVisibility);
    setEditLote(item); }

  async function handShow(id) {
    const item = await handleShowClick(id, setVisibility, setShowLote); }
    
  // Hooks factorizaos
  const { module, modules, Module, Modules } = useModuleNames("lote", "lotes");
  const { visibility, handleToggle, setVisibility, handleFalse,
  checkedItems, handleToggleAll, handleToggleItem, handleSort, handleDate 
  } = useIndexTable({
      items: lotes.data,
      modules,
      //route,
      filters: lotes.filters,
      columns: columns,
      defaultVisibility: defaultVisibility  });
       
  const {handleEditClick, handleShowClick, handleEditSubmit, handleCreateClick, handleCreateSubmit, handleCloseModal} = useModalHandlers({Module, modules, currentFilters, handleFalse, notify,
    fetchItem: getLote,         // GET /lotes/:id
    createItem: createLote,     // POST /lotes
    updateItem: updateLote,     // PUT /lotes/:id
    onSuccess: fetchLotes
  });
  const inertValue = !visibility.isEditModalOpen ? "true" : undefined;
  const Moneda = useMoneda();
    
  if (error) {
    return (
      <>
        <AppBreadcrumb
          title={Modules}
          sites={["Tablas", Modules]}
          links={["/tablas", appRoutes.lote]} />

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
          links={["/tablas", appRoutes.lote]}
        />

        {flash && <AppNotification type={flash.type} message={flash.message} /> }

        <div className="div-uno">
          <div className="div-dos">
            <div className="div-tres">
              <div className="table-info-action relative">
                <h5>
                  <p className="text-gray-500">Total de {modules}:</p>
                  <p className="dark:text-white"> {lotes.total} </p>
                </h5>
                <AppBtnInfoCount from={lotes.from} to={lotes.to} total={lotes.total}  />
              </div>
              <AppBtnTableSetting visibility={visibility} toggleColumn={handleToggle} columns={columns} />
              <AppBtnActions modules={modules} checkedItems={checkedItems} currentFilters={currentFilters} endpoints={{ massDestroy: "/lotes/massDestroy", truncate: "/lotes/truncate" }} onSuccess={fetchLotes}/>
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
                    {visibility.productoId &&
                    <AppThTableOrder handleSort={() => handleSort('idProducto', currentFilters)} label="ID PRODUCTO" />}
                    {visibility.producto &&
                    <AppThTableOrder handleSort={() => handleSort('producto', currentFilters)} label="PRODUCTO" />}
                    {visibility.codigoBar &&
                    <AppThTableOrder handleSort={() => handleSort('codigoLote', currentFilters)} label="CODIGO LOTE" />}
                    {visibility.codigoLote &&
                    <AppThTableOrder handleSort={() => handleSort('codigoLote', currentFilters)} label="CODIGO LOTE" />}
                    {visibility.fechaVencimiento &&
                    <AppThTableOrder handleSort={() => handleSort('fechaVencimiento', currentFilters)} label="VENCIMIENTO" />}
                    {visibility.cantidadInicial &&
                    <AppThTableOrder handleSort={() => handleSort('cantidadInicial', currentFilters)} label="CANT. INICIAL" />}
                    {visibility.cantidadActual &&
                    <AppThTableOrder handleSort={() => handleSort('cantidadActual', currentFilters)} label="CANT. ACTUAL" />}
                    {visibility.costoUnitario &&
                    <AppThTableOrder handleSort={() => handleSort('costoUnitario', currentFilters)} label="COSTO TOTAL" />}
                    {visibility.costoTotal &&
                    <AppThTableOrder handleSort={() => handleSort('costoTotal', currentFilters)} label="FECHA INGRESO" />}
                    {visibility.fechaIngreso &&
                    <AppThTableOrder handleSort={() => handleSort('fechaIngreso', currentFilters)} label="PRECIO" />}
                    {visibility.actualizadoEn &&
                    <AppThTableOrder handleSort={() => handleSort('actualizadoEn', currentFilters)}label="actualizadoEn" />}
                    {visibility.creadoEn &&
                    <AppThTableOrder handleSort={() => handleSort('creadoEn', currentFilters)}label="creadoEn" />}
                    <th scope="col" className="p-4">ACTION </th>
                  </tr>
                </thead>
                <tbody>
                  {lotes.data.map((lote) => ( 
                  <tr className="tbody-tr border-b dark:border-gray-700" key={lote.id}>
                    <td className="px-4 py-3 w-4">
                      <Checkbox id={"chk_"+lote.id} name={"chk_"+lote.id} className="chk-td" checked={checkedItems[lote.id] || false} onChange={() => handleToggleItem(lote.id)} />
                    </td>
                    {visibility.id &&
                    <td className="px-4 py-3 w-4">
                    {lote.id}
                    </td>}
                    {visibility.productoId &&
                    <td className="px-4 py-3 w-4">
                    {lote.productoId}
                    </td>}
                    {visibility.producto &&
                    <td className="px-4 py-3 w-4">
                    {lote.producto}
                    </td>}
                    {visibility.codigoBar &&
                    <td className="px-4 py-3 w-32">
                      {lote.codigoLote && (
                      <><AppBtnCodeBarDownload codigo={lote.codigoLote} modules={modules} w="w-48" /></>
                      )}
                    </td>}
                    {visibility.codigoLote &&
                    <td className="px-4 py-3 w-32">
                      {lote.codigoLote}
                    </td>}
                    {visibility.fechaVencimiento &&
                    <td className="px-4 py-3 w-4">
                    {lote.fechaVencimiento}
                    </td>}
                    {visibility.detalle &&
                    <td className="px-4 py-3 w-4">
                    {lote.detalle}
                    </td>}
                    {visibility.cantidadInicial &&
                    <td className="px-4 py-3 w-4">
                    {lote.cantidadInicial}
                    </td>}
                    {visibility.cantidadActual &&
                    <td className="px-4 py-3 w-4">
                    {lote.cantidadActual}
                    </td>}
                    {visibility.costoUnitario &&
                    <td className="px-4 py-3 w-4">
                    {lote.costoUnitario}
                    </td>}
                    {visibility.costoTotal &&
                    <td className="px-4 py-3 w-4">
                    {lote.costoTotal}
                    </td>}
                    {visibility.fechaIngreso &&
                    <td className="px-4 py-3 w-4 text-right">
                    {Moneda(lote.fechaIngreso)}
                    </td>}
                    {visibility.actualizadoEn &&
                    <td className="px-4 py-3 w-4">
                    {existencia.actualizadoEn}
                    </td>}
                    {visibility.creadoEn &&
                    <td className="px-4 py-3 w-4">
                    {existencia.creadoEn}
                    </td>}
                    <td className="px-4 py-3 w-48">
                      <div className="flex items-center space-x-4">
                        <AppBtnEdit   modulo={modules} id={lote.id} onEdit={() => handEdit(lote.id)} />
                        <AppBtnShowM  modulo={modules} id={lote.id} onShow={() => handShow(lote.id)}/>
                        <AppBtnDelete id={lote.id} modulo="lotes" currentFilters={currentFilters} onSuccess={() => fetchLotes()} />
                      </div>
                    </td>
                  </tr>
                  ))}
                </tbody>
              </table>
            </div>

          <div className="table-footer" aria-label="Table navigation">
            <span className="footer-table-span">
              Mostrando <span className="font-semibold text-gray-900 dark:text-white">{" "+lotes.from+" - "+lotes.to+" "}</span>
              of <span className="font-semibold text-gray-900 dark:text-white">{" "+lotes.total+" "}</span>
            </span>
            <AppPagination
              page_links={lotes.links}
              search={lotes.filters.search}
              perPage={lotes.filters.perPage}
              onPageChange={(page) => fetchLotes({ page })}
            />
          </div>              
        </div>
      </div>

      {visibility.isCreateModalOpen && (
        <div className="modal-create">
          <ModalCreate onSuccess={handleCreateSubmit} title={Module} handleClose={() => handleCreateClick(setVisibility)} modules={modules} />
        </div> )}
      
      {visibility.isEditModalOpen && editLote && (
      <ModalEdit
        title={Module}
        modules={modules}
        handleClose={() => { handleCloseModal(); setEditLote(null); }}
        value={editLote}
        handleEdit={handleEditSubmit}
        inert={inertValue} />
      )}

      {visibility.isShowModalOpen && showLote && (
      <ModalShow
        title={Module}
        modules={modules}
        handleClose={handleCloseModal}
        value={showLote} />
      )}
      </>
    );
  }
}

export default Index;