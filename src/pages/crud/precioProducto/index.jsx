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
import {useIndexTable, useModalHandlers, useModuleNames, useMoneda, useResource} from "@/hook/useHandler";
import AppNotification, { useFlash } from "@html/notification";
import AppPagination        from "@html/pagination";
//import AppSearchIndex       from "@form/search_index";
//import Layout               from "@app/layout";

import { appRoutes } from "@route";
import { getPrecioProductos, getPrecioProducto, createPrecioProducto, updatePrecioProducto, getColumns, getDefaultVisibility } from "../../../api/precioProductos";

const Index = () => {
  const columns = getColumns();
  const defaultVisibility = getDefaultVisibility();
  const [flash, notify] = useFlash();

  const [showPrecioProducto, setShowPrecioProducto] = useState(null);
  const [editPrecioProducto, setEditPrecioProducto] = useState(null);
  const { resource: precioProductos, fetchResource: fetchPrecioProductos, loading, error } = useResource(
    getPrecioProductos,
    getColumns,
    getDefaultVisibility
  );
  
  const currentFilters = precioProductos.filters;

  async function handEdit(id) {
    const item = await handleEditClick(id, setVisibility);
    setEditPrecioProducto(item); }

  async function handShow(id) {
    const item = await handleShowClick(id, setVisibility, setShowPrecioProducto); }
    
  // Hooks factorizaos
  const { module, modules, Module, Modules } = useModuleNames("precioProducto", "precioProductos");
  const { visibility, handleToggle, setVisibility, handleFalse,
  checkedItems, handleToggleAll, handleToggleItem, handleSort, handleDate 
  } = useIndexTable({
      items: precioProductos.data,
      modules,
      //route,
      filters: precioProductos.filters,
      columns: columns,
      defaultVisibility: defaultVisibility  });
       
  const {handleEditClick, handleShowClick, handleEditSubmit, handleCreateClick, handleCreateSubmit, handleCloseModal} = useModalHandlers({Module, modules, currentFilters, handleFalse, notify,
    fetchItem: getPrecioProducto,         // GET /precioProductos/:id
    createItem: createPrecioProducto,     // POST /precioProductos
    updateItem: updatePrecioProducto,     // PUT /precioProductos/:id
    onSuccess: fetchPrecioProductos
  });
    const Moneda = useMoneda();
  
  if (error) {
    return (
      <>
        <AppBreadcrumb
          title={Modules}
          sites={["Tablas", Modules]}
          links={["/tablas", appRoutes.precioProducto]} />

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
        links={["/tablas", appRoutes.precioProducto]}
      />

      {flash && <AppNotification type={flash.type} message={flash.message} /> }

      <div className="div-uno">
        <div className="div-dos">
          <div className="div-tres">
            <div className="table-info-action relative">
              <h5>
                <p className="text-gray-500">Total de {modules}:</p>
                <p className="dark:text-white"> {precioProductos.total} </p>
              </h5>
              <AppBtnInfoCount from={precioProductos.from} to={precioProductos.to} total={precioProductos.total}  />
            </div>
            <AppBtnTableSetting visibility={visibility} toggleColumn={handleToggle} columns={columns} />
            <AppBtnActions modules={modules} checkedItems={checkedItems} currentFilters={currentFilters} endpoints={{ massDestroy: "/precioProductos/massDestroy", truncate: "/precioProductos/truncate" }} onSuccess={fetchPrecioProductos}/>
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
                  {visibility.idProductoProveedor &&
                  <AppThTableOrder handleSort={() => handleSort('idProductoProveedor', currentFilters)} label="ID PRODUCTO" />}
                  {visibility.productoProveedor &&
                  <AppThTableOrder handleSort={() => handleSort('productoProveedor', currentFilters)} label="PRODUCTO PROVEEDOR" />}
                  {visibility.fechaDesde &&
                  <AppThTableOrder handleSort={() => handleSort('fechaDesde', currentFilters)} label="FECHA DESDE" />}
                  {visibility.fechaHasta &&
                  <AppThTableOrder handleSort={() => handleSort('fechaHasta', currentFilters)} label="FECHA HASTA" />}
                  {visibility.precioCompra &&
                  <AppThTableOrder handleSort={() => handleSort('precioCompra', currentFilters)} label="PRECIO COMPRA" />}
                  {visibility.precioVenta &&
                  <AppThTableOrder handleSort={() => handleSort('precioVenta', currentFilters)} label="PRECIO VENTA" />}
                  {visibility.actualizadoEn &&
                  <AppThTableOrder handleSort={() => handleSort('actualizadoEn', currentFilters)}label="actualizadoEn" />}
                  {visibility.creadoEn &&
                  <AppThTableOrder handleSort={() => handleSort('creadoEn', currentFilters)}label="creadoEn" />}
                  <th scope="col" className="p-4">ACTION </th>
                </tr>
              </thead>
              <tbody>
                {precioProductos.data.map((precioProducto) => ( 
                <tr className="tbody-tr border-b dark:border-gray-700" key={precioProducto.id}>
                  <td className="px-4 py-3 w-4">
                    <Checkbox id={"chk_"+precioProducto.id} name={"chk_"+precioProducto.id} className="chk-td" checked={checkedItems[precioProducto.id] || false} onChange={() => handleToggleItem(precioProducto.id)} />
                  </td>
                  {visibility.id &&
                  <td className="px-4 py-3 w-4">
                   {precioProducto.id}
                  </td>}
                  {visibility.idProductoProveedor &&
                  <td className="px-4 py-3 w-4">
                   {precioProducto.idProductoProveedor}
                  </td>}
                  {visibility.fechaDesde &&
                  <td className="px-4 py-3 w-4">
                   {precioProducto.fechaDesde}
                  </td>}
                  {visibility.fechaHasta &&
                  <td className="px-4 py-3 w-4">
                   {precioProducto.fechaHasta}
                  </td>}
                  {visibility.precioCompra &&
                  <td className="px-4 py-3 w-4">
                   {Moneda(precioProducto.precioCompra)}
                  </td>}
                  {visibility.precioVenta &&
                  <td className="px-4 py-3 w-4">
                   {Moneda(precioProducto.precioVenta)}
                  </td>}
                  {visibility.actualizadoEn &&
                  <td className="px-4 py-3 w-4">
                  {precioProducto.actualizadoEn}
                  </td>}
                  {visibility.creadoEn &&
                  <td className="px-4 py-3 w-4">
                  {precioProducto.creadoEn}
                  </td>}
                  <td className="px-4 py-3 w-48">
                    <div className="flex items-center space-x-4">
                      <AppBtnEdit   modulo={modules} id={precioProducto.id} onEdit={() => handEdit(precioProducto.id)} />
                      <AppBtnShowM  modulo={modules} id={precioProducto.id} onShow={() => handShow(precioProducto.id)}/>
                      <AppBtnDelete id={precioProducto.id} modulo="precioProductos" currentFilters={currentFilters} onSuccess={() => fetchPrecioProductos()} />
                    </div>
                  </td>
                </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="table-footer" aria-label="Table navigation">
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
              Mostrando <span className="font-semibold text-gray-900 dark:text-white">{" "+precioProductos.from+" - "+precioProductos.to+" "}</span>
              of <span className="font-semibold text-gray-900 dark:text-white">{" "+precioProductos.total+" "}</span>
            </span>
            <AppPagination
              page_links={precioProductos.links}
              search={precioProductos.filters.search}
              perPage={precioProductos.filters.perPage}
              onPageChange={(page) => fetchPrecioProductos({ page })}
            />
          </div>              
        </div>
      </div>

      {visibility.isCreateModalOpen && (
        <div className="modal-create">
          <ModalCreate onSuccess={handleCreateSubmit} title={Module} handleClose={() => handleCreateClick(setVisibility)} modules={modules}/>
        </div>
      )}
      
      {visibility.isEditModalOpen && editPrecioProducto && (
      <ModalEdit
        title={Module}
        modules={modules}
        handleClose={() => {
          handleCloseModal();
          setEditPrecioProducto(null);
        }}
        value={editPrecioProducto}
        handleEdit={handleEditSubmit}
        inert={inertValue}
      />
      )}

      {visibility.isShowModalOpen && showPrecioProducto && (
      <ModalShow
        title={Module}
        modules={modules}
        handleClose={handleCloseModal}
        value={showPrecioProducto}
      />
      )}
        
      </>
    );
  }  
}


export default Index;