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
import { getProductoProveedores, getProductoProveedor, createProductoProveedor, updateProductoProveedor, getColumns, getDefaultVisibility } from "../../../api/productoProveedores";

const Index = () => {
  const columns = getColumns();
  const defaultVisibility = getDefaultVisibility();
  const [flash, notify] = useFlash();

  const [showProductoProveedor, setShowProductoProveedor] = useState(null);
  const [editProductoProveedor, setEditProductoProveedor] = useState(null);
  const { resource: productoProveedores, fetchResource: fetchProductoProveedores, loading, error } = useResource(
    getProductoProveedores,
    getColumns,
    getDefaultVisibility
  );
  
  const currentFilters = productoProveedores.filters;

  async function handEdit(id) {
    const item = await handleEditClick(id, setVisibility);
    setEditProductoProveedor(item); }

  async function handShow(id) {
    const item = await handleShowClick(id, setVisibility, setShowProductoProveedor); }
    
  // Hooks factorizaos
  const { module, modules, Module, Modules } = useModuleNames("productoProveedor", "productoProveedores");
  const { visibility, handleToggle, setVisibility, handleFalse,
  checkedItems, handleToggleAll, handleToggleItem, handleSort, handleDate 
  } = useIndexTable({
      items: productoProveedores.data,
      modules,
      //route,
      filters: productoProveedores.filters,
      columns: columns,
      defaultVisibility: defaultVisibility  });
       
  const {handleEditClick, handleShowClick, handleEditSubmit, handleCreateClick, handleCreateSubmit, handleCloseModal} = useModalHandlers({Module, modules, currentFilters, handleFalse, notify,
    fetchItem:  getProductoProveedor,        // GET /productoProveedores/:id
    createItem: createProductoProveedor,     // POST /productoProveedores
    updateItem: updateProductoProveedor,     // PUT /productoProveedores/:id
    onSuccess:  fetchProductoProveedores
  });
  
  if (error) {
    return (
      <>
        <AppBreadcrumb
          title={Modules}
          sites={["Tablas", Modules]}
          links={["/tablas", appRoutes.productoProveedor]} />

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
        links={["/tablas", appRoutes.productoProveedor]}
      />

      {flash && <AppNotification type={flash.type} message={flash.message} /> }

      <div className="div-uno">
        <div className="div-dos">
          <div className="div-tres">
            <div className="table-info-action relative">
              <h5>
                <p className="text-gray-500">Total de {modules}:</p>
                <p className="dark:text-white"> {productoProveedores.total} </p>
              </h5>
              <AppBtnInfoCount from={productoProveedores.from} to={productoProveedores.to} total={productoProveedores.total}  />
            </div>
            <AppBtnTableSetting visibility={visibility} toggleColumn={handleToggle} columns={columns} />
            <AppBtnActions modules={modules} checkedItems={checkedItems} currentFilters={currentFilters} endpoints={{ massDestroy: "/productoProveedores/massDestroy", truncate: "/productoProveedores/truncate" }} onSuccess={fetchProductoProveedores}/>
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
                  {visibility.idProducto &&
                  <AppThTableOrder handleSort={() => handleSort('idProducto', currentFilters)} label="CODIGO" />}
                  {visibility.producto &&
                  <AppThTableOrder handleSort={() => handleSort('producto', currentFilters)} label="NOMBRE" />}
                  {visibility.idProveedor &&
                  <AppThTableOrder handleSort={() => handleSort('idProveedor', currentFilters)} label="ID PROVEEDOR" />}
                  {visibility.proveedor &&
                  <AppThTableOrder handleSort={() => handleSort('proveedor', currentFilters)} label="PROVEEDOR" />}
                  {visibility.codigo &&
                  <AppThTableOrder handleSort={() => handleSort('codigo', currentFilters)} label="CODIGO" />}
                  {visibility.nombre &&
                  <AppThTableOrder handleSort={() => handleSort('nombre', currentFilters)} label="NOMBRE" />}
                  {visibility.abreviado &&
                  <AppThTableOrder handleSort={() => handleSort('abreviado', currentFilters)} label="ABREVIADO" />}
                  {visibility.descripcion &&
                  <AppThTableOrder handleSort={() => handleSort('descripcion', currentFilters)} label="DESCRIPCION" />}
                  {visibility.naturaleza &&
                  <AppThTableOrder handleSort={() => handleSort('naturaleza', currentFilters)} label="NATURALEZA" />}
                  {visibility.actualizadoEn &&
                  <AppThTableOrder handleSort={() => handleSort('actualizadoEn', currentFilters)}label="actualizadoEn" />}
                  {visibility.creadoEn &&
                  <AppThTableOrder handleSort={() => handleSort('creadoEn', currentFilters)}label="creadoEn" />}
                  <th scope="col" className="p-4">ACTION </th>
                </tr>
              </thead>
              <tbody>
                {productoProveedores.data.map((productoProveedor) => ( 
                <tr className="tbody-tr border-b dark:border-gray-700" key={productoProveedor.id}>
                  <td className="px-4 py-3 w-4">
                    <Checkbox id={"chk_"+productoProveedor.id} name={"chk_"+productoProveedor.id} className="chk-td" checked={checkedItems[productoProveedor.id] || false} onChange={() => handleToggleItem(productoProveedor.id)} />
                  </td>
                  {visibility.id &&
                  <td className="px-4 py-3 w-4">
                   {productoProveedor.id}
                  </td>}
                  {visibility.idProducto &&
                  <td className="px-4 py-3 w-4">
                   {productoProveedor.idProducto}
                  </td>}
                  {visibility.producto &&
                  <td className="px-4 py-3 w-4">
                   {productoProveedor.producto}
                  </td>}
                  {visibility.idProveedor &&
                  <td className="px-4 py-3 w-4">
                   {productoProveedor.idProveedor}
                  </td>}
                  {visibility.proveedor &&
                  <td className="px-4 py-3 w-4">
                   {productoProveedor.proveedor}
                  </td>}
                  {visibility.codigo &&
                  <td className="px-4 py-3 w-4">
                   {productoProveedor.codigo}
                  </td>}
                  {visibility.nombre &&
                  <td className="px-4 py-3 w-4">
                   {productoProveedor.nombre}
                  </td>}
                  {visibility.abreviado &&
                  <td className="px-4 py-3 w-4">
                   {productoProveedor.abreviado}
                  </td>}
                  {visibility.descripcion &&
                  <td className="px-4 py-3 w-4">
                   {productoProveedor.descripcion}
                  </td>}
                  {visibility.naturaleza &&
                  <td className="px-4 py-3 w-4">
                   {productoProveedor.naturaleza}
                  </td>}
                  {visibility.actualizadoEn &&
                  <td className="px-4 py-3 w-4">
                  {productoProveedor.actualizadoEn}
                  </td>}
                  {visibility.creadoEn &&
                  <td className="px-4 py-3 w-4">
                  {productoProveedor.creadoEn}
                  </td>}
                  <td className="px-4 py-3 w-48">
                    <div className="flex items-center space-x-4">
                      <AppBtnEdit   modulo={modules} id={productoProveedor.id} onEdit={() => handEdit(productoProveedor.id)} />
                      <AppBtnShowM  modulo={modules} id={productoProveedor.id} onShow={() => handShow(productoProveedor.id)}/>
                      <AppBtnDelete id={productoProveedor.id} modulo="productoProveedores" currentFilters={currentFilters} onSuccess={() => fetchProductoProveedores()} />
                    </div>
                  </td>
                </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="table-footer" aria-label="Table navigation">
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
              Mostrando <span className="font-semibold text-gray-900 dark:text-white">{" "+productoProveedores.from+" - "+productoProveedores.to+" "}</span>
              of <span className="font-semibold text-gray-900 dark:text-white">{" "+productoProveedores.total+" "}</span>
            </span>
            <AppPagination
              page_links={productoProveedores.links}
              search={productoProveedores.filters.search}
              perPage={productoProveedores.filters.perPage}
              onPageChange={(page) => fetchProductoProveedores({ page })}
            />
          </div>              
        </div>
      </div>

      {visibility.isCreateModalOpen && (
        <div className="modal-create">
          <ModalCreate onSuccess={handleCreateSubmit} title={Module} handleClose={() => handleCreateClick(setVisibility)} modules={modules}/>
        </div>
      )}
      
      {visibility.isEditModalOpen && editProductoProveedor && (
      <ModalEdit
        title={Module}
        modules={modules}
        handleClose={() => {
          handleCloseModal();
          setEditProductoProveedor(null);
        }}
        value={editProductoProveedor}
        handleEdit={handleEditSubmit}
        inert={inertValue}
      />
      )}

      {visibility.isShowModalOpen && showProductoProveedor && (
      <ModalShow
        title={Module}
        modules={modules}
        handleClose={handleCloseModal}
        value={showProductoProveedor}
      />
      )}
        
      </>
    );
  }  
}


export default Index;