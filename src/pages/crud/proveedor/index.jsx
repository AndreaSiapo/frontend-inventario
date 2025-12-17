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
import { getProveedores, getProveedor, createProveedor, updateProveedor, getColumns, getDefaultVisibility } from "../../../api/proveedores";

const Index = () => {
  const columns = getColumns();
  const defaultVisibility = getDefaultVisibility();
  const [flash, notify] = useFlash();

  const [showProveedor, setShowProveedor] = useState(null);
  const [editProveedor, setEditProveedor] = useState(null);
    const { resource: proveedores, fetchResource: fetchProveedores, loading, error } = useResource(
      getProveedores,
      getColumns,
      getDefaultVisibility
    );

  const currentFilters = proveedores.filters;

  async function handEdit(id) {
    const item = await handleEditClick(id, setVisibility);
    setEditProveedor(item); }

  async function handShow(id) {
    const item = await handleShowClick(id, setVisibility, setShowProveedor); }
    
  // Hooks factorizaos
  const { module, modules, Module, Modules } = useModuleNames("proveedor", "proveedores");
  const { visibility, handleToggle, setVisibility, handleFalse,
  checkedItems, handleToggleAll, handleToggleItem, handleSort, handleDate 
  } = useIndexTable({
      items: proveedores.data,
      modules,
      //route,
      filters: proveedores.filters,
      columns: columns,
      defaultVisibility: defaultVisibility  });
       
  const {handleEditClick, handleShowClick, handleEditSubmit, handleCreateClick, handleCreateSubmit, handleCloseModal} = useModalHandlers({Module, modules, currentFilters, handleFalse, notify,
    fetchItem: getProveedor,         // GET /proveedores/:id
    createItem: createProveedor,     // POST /proveedores
    updateItem: updateProveedor,     // PUT /proveedores/:id
    onSuccess: fetchProveedores
  });
  const inertValue = !visibility.isEditModalOpen ? "true" : undefined;
    
  if (error) {
    return (
      <>
        <AppBreadcrumb
          title={Modules}
          sites={["Tablas", Modules]}
          links={["/tablas", appRoutes.proveedor]} />

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
          links={["/tablas", appRoutes.proveedor]} />

        {flash && <AppNotification type={flash.type} message={flash.message} /> }

        <div className="div-uno">
          <div className="div-dos">
            <div className="div-tres">
              <div className="table-info-action relative">
                <h5>
                  <p className="text-gray-500">Total de {modules}:</p>
                  <p className="dark:text-white"> {proveedores.total} </p>
                </h5>
                <AppBtnInfoCount from={proveedores.from} to={proveedores.to} total={proveedores.total}  />
              </div>
              <AppBtnTableSetting visibility={visibility} toggleColumn={handleToggle} columns={columns} />
            </div>

            <div className="div-cuatro">
              <div className="relative w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 shrink-0">
                <AppBtnCreate onCreate={() => handleCreateClick(setVisibility)} />
                <AppBtnActions modules={modules} checkedItems={checkedItems} currentFilters={currentFilters} endpoints={{ massDestroy: "/proveedores/massDestroy", truncate: "/proveedores/truncate" }} onSuccess={fetchProveedores}/>
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
                    {visibility.codigo_barra &&
                    <AppThTableOrder handleSort={() => handleSort('codigo_barra', currentFilters)} label="BARCODE" />}
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
                  {proveedores.data.map((proveedor) => ( 
                  <tr className="tbody-tr border-b dark:border-gray-700" key={proveedor.id}>
                    <td className="px-4 py-3 w-4">
                      <Checkbox id={"chk_"+proveedor.id} name={"chk_"+proveedor.id} className="chk-td" checked={checkedItems[proveedor.id] || false} onChange={() => handleToggleItem(proveedor.id)} />
                    </td>
                    {visibility.id &&
                    <td className="px-4 py-3 w-4">
                    {proveedor.id}
                    </td>}
                    {visibility.codigo &&
                    <td className="px-4 py-3 w-4">
                    {proveedor.codigo}
                    </td>}
                    {visibility.codigo_barra &&
                    <td className="px-4 py-3 w-32">
                      <AppBtnCodeBar codigo={proveedor.codigo} w="w-48"/> 
                    </td>}
                    {visibility.nombre &&
                    <td className="px-4 py-3 w-4">
                    {proveedor.nombre}
                    </td>}
                    {visibility.referencia &&
                    <td className="px-4 py-3 w-4">
                    {proveedor.referencia}
                    </td>}
                    {visibility.descripcion &&
                    <td className="px-4 py-3 w-4">
                    {proveedor.descripcion}
                    </td>}
                    {visibility.plazo &&
                    <td className="px-4 py-3 w-4">
                    {proveedor.plazo}
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
                        <AppBtnEdit   modulo={modules} id={proveedor.id} onEdit={() => handEdit(proveedor.id)} />
                        <AppBtnShowM  modulo={modules} id={proveedor.id} onShow={() => handShow(proveedor.id)}/>
                        <AppBtnDelete id={proveedor.id} modulo="proveedores" currentFilters={currentFilters} onSuccess={() => fetchProveedores()} />
                      </div>
                    </td>
                  </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="table-footer" aria-label="Table navigation">
              <span className="footer-table-span">
                Mostrando <span className="font-semibold text-gray-900 dark:text-white">{" "+proveedores.from+" - "+proveedores.to+" "}</span>
                of <span className="font-semibold text-gray-900 dark:text-white">{" "+proveedores.total+" "}</span>
              </span>
              <AppPagination
                page_links={proveedores.links}
                search={proveedores.filters.search}
                perPage={proveedores.filters.perPage}
                onPageChange={(page) => fetchProveedores({ page })}
              />
            </div>              
          </div>
        </div>

        {visibility.isCreateModalOpen && (
          <div className="modal-create">
            <ModalCreate onSuccess={handleCreateSubmit} title={Module} handleClose={() => handleCreateClick(setVisibility)} modules={modules}/>
          </div>
        )}
        
        {visibility.isEditModalOpen && editProveedor && (
        <ModalEdit
          title={Module}
          modules={modules}
          handleClose={() => {
            handleCloseModal();
            setEditProveedor(null); }}
          value={editProveedor}
          handleEdit={handleEditSubmit}
          inert={inertValue}
        />
        )}

        {visibility.isShowModalOpen && showProveedor && (
        <ModalShow
          title={Module}
          modules={modules}
          handleClose={handleCloseModal}
          value={showProveedor}
        />
        )}
      </>
    );
  }
}

export default Index;