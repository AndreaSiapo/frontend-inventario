import React, { useState, useEffect } from "react";

//import { appRoutes } from "../../../routes/appRoutes";

// Componentes
import AppBreadcrumb        from "@html/breadcrumb";
import AppThTableOrder      from "@html/thTableOrder";
import {AppBtnActions, AppBtnInfoCount, AppBtnTableSetting}           from "@html/btn";
import {AppBtnCreate, AppBtnShowM, AppBtnEdit, AppBtnDelete, AppBtnX} from "@form/btn";
import Checkbox             from '@form/check';
import ModalEdit            from "./edit";
import ModalShow            from "./show";
import ModalCreate          from "./create";
import {useIndexTable, useModalHandlers, useModuleNames, useResource, useMoneda } from "@/hook/useHandler";
import AppNotification, { useFlash } from "@html/notification";
import AppPagination        from "@html/pagination";
//import AppSearchIndex       from "@form/search_index";
//import Layout               from "@app/layout";

import { appRoutes } from "@route";
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

  const Moneda = useMoneda();
  
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
                  {visibility.movimientoId &&
                  <AppThTableOrder handleSort={() => handleSort('movimientoId', currentFilters)} label="MOVIMIENTO ID" />}
                  {visibility.productoId &&
                  <AppThTableOrder handleSort={() => handleSort('productoId', currentFilters)} label="PRODUCTO ID" />}
                  {visibility.producto &&
                  <AppThTableOrder handleSort={() => handleSort('producto', currentFilters)} label="PRODUCTO" />}
                  {visibility.detalle &&
                  <AppThTableOrder handleSort={() => handleSort('detalle', currentFilters)} label="DETALLE" />}
                  {visibility.cantidad &&
                  <AppThTableOrder handleSort={() => handleSort('cantidad', currentFilters)} label="CANTIDAD" />}
                  {visibility.valor &&
                  <AppThTableOrder handleSort={() => handleSort('valor', currentFilters)} label="VALOR" />}
                  {visibility.subtotal &&
                  <AppThTableOrder handleSort={() => handleSort('subtotal', currentFilters)} label="SUB TOTAL" />}
                  {visibility.fecha &&
                  <AppThTableOrder handleSort={() => handleSort('fecha', currentFilters)} label="FECHA" />}
                  {visibility.actualizadoEn &&
                  <AppThTableOrder handleSort={() => handleSort('actualizadoEn', currentFilters)} label="ACTUALIZADO EN" />}
                  {visibility.creadoEn &&
                  <AppThTableOrder handleSort={() => handleSort('creadoEn', currentFilters)} label="CREADO EN" />}
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
                  {visibility.movimientoId &&
                  <td className="px-4 py-3 w-4">
                   {detalleMovimiento.movimientoId}
                  </td>}
                  {visibility.productoId &&
                  <td className="px-4 py-3 w-4">
                   {detalleMovimiento.productoId}
                  </td>}
                  {visibility.producto &&
                  <td className="px-4 py-3 w-4">
                   {detalleMovimiento.producto.nombre}
                  </td>}
                  {visibility.detalle &&
                  <td className="px-4 py-3 w-4">
                   {detalleMovimiento.detalle}
                  </td>}
                  {visibility.cantidad &&
                  <td className="px-4 py-3 w-4">
                   {detalleMovimiento.cantidad}
                  </td>}
                  {visibility.valor &&
                  <td className="px-4 py-3 w-4">
                   {Moneda(detalleMovimiento.valor)}
                  </td>}
                  {visibility.subtotal &&
                  <td className="px-4 py-3 w-4">
                   {Moneda.format(detalleMovimiento.subtotal)}
                  </td>}
                  {visibility.fecha &&
                  <td className="px-4 py-3 w-4">
                  {detalleMovimiento.fecha}
                  </td>}
                  {visibility.actualizadoEn &&
                  <td className="px-4 py-3 w-4">
                  {detalleMovimiento.actualizadoEn}
                  </td>}
                  {visibility.creadoEn &&
                  <td className="px-4 py-3 w-4">
                  {detalleMovimiento.creadoEn}
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