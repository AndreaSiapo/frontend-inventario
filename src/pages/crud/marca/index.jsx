import React, { useState, useEffect } from "react";

// Componentes
import AppBreadcrumb        from "@html/breadcrumb";
import AppNotification, { useFlash } from "@html/notification";
import AppPagination        from "@html/pagination";
import AppThTableOrder      from "@html/thTableOrder";
import {AppBtnActions, AppBtnInfoCount, AppBtnTableSetting} from "@html/btn";
import {AppBtnCreate, AppBtnShowM, AppBtnEdit, AppBtnDelete} from "@form/btn";
import Checkbox             from '@form/check';
import ModalEdit            from "./edit";
import ModalShow            from "./show";
import ModalCreate          from "./create";
import {useIndexTable, useModalHandlers, useModuleNames, useResource} from "@/hook/useHandler";
//import AppSearchIndex       from "@form/search_index";
//import Layout               from "@app/layout";

import { appRoutes } from "@route";
import { getMarcas, getMarca, createMarca, updateMarca, getColumns, getDefaultVisibility } from "@/api/marcas";

const Index = () => {
  const columns = getColumns();
  const defaultVisibility = getDefaultVisibility();
  const [flash, notify] = useFlash();

  const [showMarca, setShowMarca] = useState(null);
  const [editMarca, setEditMarca] = useState(null);
    const { resource: marcas, fetchResource: fetchMarcas, loading, error } = useResource(
      getMarcas,
      getColumns,
      getDefaultVisibility
    );

  const currentFilters = marcas.filters;

  async function handEdit(id) {
    const item = await handleEditClick(id, setVisibility);
    setEditMarca(item); }

  async function handShow(id) {
    const item = await handleShowClick(id, setVisibility, setShowMarca); }
    
  // Hooks factorizaos
  const { module, modules, Module, Modules } = useModuleNames("marca", "marcas");
  const { visibility, handleToggle, setVisibility, handleFalse,
  checkedItems, handleToggleAll, handleToggleItem, handleSort, handleDate 
  } = useIndexTable({
      items: marcas.data,
      modules,
      //route,
      filters: marcas.filters,
      columns: columns,
      defaultVisibility: defaultVisibility  });
       
  const {handleEditClick, handleShowClick, handleEditSubmit, handleCreateClick, handleCreateSubmit, handleCloseModal} = useModalHandlers({Module, modules, currentFilters, handleFalse, notify,
    fetchItem: getMarca,         // GET /marcas/:id
    createItem: createMarca,     // POST /marcas
    updateItem: updateMarca,     // PUT /marcas/:id
    onSuccess: fetchMarcas
  });
  const inertValue = !visibility.isEditModalOpen ? "true" : undefined;
  
  if (error) {
    return (
      <>
        <AppBreadcrumb
          title={Modules}
          sites={["Tablas", Modules]}
          links={["/tablas", appRoutes.marca]} />

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
        links={["/tablas", appRoutes.marca]}
      />

      {flash && <AppNotification type={flash.type} message={flash.message} />
    }

        <div className="div-uno">
          <div className="div-dos">
            <div className="div-tres">
              <div className="flex-1 flex items-center space-x-2 relative">
                <h5>
                  <p className="text-gray-500">Total de {modules}:</p>
                  <p className="dark:text-white"> {marcas.total} </p>
                </h5>
                <AppBtnInfoCount from={marcas.from} to={marcas.to} total={marcas.total}  />
              </div>
              <AppBtnTableSetting visibility={visibility} toggleColumn={handleToggle} columns={columns} />
              <AppBtnActions modules={modules} checkedItems={checkedItems} currentFilters={currentFilters} endpoints={{ massDestroy: "/marcas/massDestroy", truncate: "/marcas/truncate" }} onSuccess={fetchMarcas}/>
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
                  {visibility.nombre &&
                  <AppThTableOrder handleSort={() => handleSort('nombre', currentFilters)} label="NOMBRE" />}
                  {visibility.abreviado &&
                  <AppThTableOrder handleSort={() => handleSort('abreviado', currentFilters)} label="ABREVIADO" />}
                  {visibility.ruc &&
                  <AppThTableOrder handleSort={() => handleSort('ruc', currentFilters)} label="RUC" />}
                  {visibility.descripcion &&
                  <AppThTableOrder handleSort={() => handleSort('descripcion', currentFilters)} label="DESCRIPCIÓN" />}
                  {visibility.tipo &&
                  <AppThTableOrder handleSort={() => handleSort('tipo', currentFilters)} label="TIPO" />}
                  {visibility.actualizadoEn &&
                  <AppThTableOrder handleSort={() => handleSort('actualizadoEn', currentFilters)}label="updated_at" />}
                  {visibility.creadoEn &&
                  <AppThTableOrder handleSort={() => handleSort('creadoEn', currentFilters)}label="creadoEn" />}
                  <th scope="col" className="p-4">ACTION </th>
                </tr>
              </thead>
              <tbody>
                {marcas.data.map((marca) => ( 
                <tr className="tbody-tr border-b dark:border-gray-700" key={marca.id}>
                  <td className="px-4 py-3 w-4">
                    <Checkbox id={"chk_"+marca.id} name={"chk_"+marca.id} className="chk-td" checked={checkedItems[marca.id] || false} onChange={() => handleToggleItem(marca.id)} />
                  </td>
                  {visibility.id &&
                  <td className="px-4 py-3 w-4">
                   {marca.id}
                  </td>}
                  {visibility.nombre &&
                  <td className="px-4 py-3 w-4">
                   {marca.nombre}
                  </td>}
                  {visibility.abreviado &&
                  <td className="px-4 py-3 w-4">
                   {marca.abreviado}
                  </td>}
                  {visibility.ruc &&
                  <td className="px-4 py-3 w-4">
                   {marca.ruc}
                  </td>}
                  {visibility.descripcion &&
                  <td className="px-4 py-3 w-4">
                   {marca.descripcion}
                  </td>}
                  {visibility.tipo &&
                  <td className="px-4 py-3 w-4">
                   {marca.tipo}
                  </td>}
                  {visibility.actualizadoEn &&
                  <td className="px-4 py-3 w-4">
                   {marca.actualizadoEn}
                  </td>}
                  {visibility.creadoEn &&
                  <td className="px-4 py-3 w-4">
                   {marca.creadoEn}
                  </td>}
                  <td className="px-4 py-3 w-48">
                    <div className="flex items-center space-x-4">
                      <AppBtnEdit   modulo={modules} id={marca.id} onEdit={() => handEdit(marca.id)} />
                      <AppBtnShowM  modulo={modules} id={marca.id} onShow={() => handShow(marca.id)}/>
                      <AppBtnDelete id={marca.id} modulo="marcas" currentFilters={currentFilters} onSuccess={() => fetchMarcas()} />
                    </div>
                  </td>
                </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4" aria-label="Table navigation">
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
              Mostrando <span className="font-semibold text-gray-900 dark:text-white">{" "+marcas.from+" - "+marcas.to+" "}</span>
              of <span className="font-semibold text-gray-900 dark:text-white">{" "+marcas.total+" "}</span>
            </span>
            <AppPagination
              page_links={marcas.links}
              search={marcas.filters.search}
              perPage={marcas.filters.perPage}
              onPageChange={(page) => fetchMarcas({ page })}
            />
          </div>              
        </div>
      </div>

      {visibility.isCreateModalOpen && (
        <div className="modal-create">
          <ModalCreate onSuccess={handleCreateSubmit} title={Module} handleClose={() => handleCreateClick(setVisibility)} modules={modules}/>
        </div>
      )}
        
      {visibility.isEditModalOpen && editMarca && (
      <ModalEdit
        title={Module}
        modules={modules}
        handleClose={() => { handleCloseModal(); setEditMarca(null); }}
        value={editMarca}
        handleEdit={handleEditSubmit}
        inert={inertValue} />
      )}

      {visibility.isShowModalOpen && showMarca && (
      <ModalShow
        title={Module}
        modules={modules}
        handleClose={handleCloseModal}
        value={showMarca} />
      )}
      </>
    );
  }
}
export default Index;