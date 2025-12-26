import React, { useState, useEffect } from "react";

// Componentes
import AppBreadcrumb        from "@html/breadcrumb";
import AppPagination        from "@html/pagination";
import AppThTableOrder      from "@html/thTableOrder";
import AppNotification, { useFlash } from "@html/notification";
import {AppBtnActions, AppBtnInfoCount, AppBtnTableSetting}   from "@html/btn";
import {AppBtnCreate, AppBtnShowM, AppBtnEdit, AppBtnDelete}  from "@form/btn";
import Checkbox             from '@form/check';
import ModalEdit            from "./edit";
import ModalShow            from "./show";
import ModalCreate          from "./create";
import {useIndexTable, useModalHandlers, useModuleNames, useResource} from "@/hook/useHandler";
//import AppSearchIndex       from "@form/search_index";
//import Layout               from "@app/layout";

import { appRoutes } from "@route";
import { getCategorias, getCategoria, createCategoria, updateCategoria, getColumns, getDefaultVisibility } from "@/api/categorias";

const Index = () => {
  const columns = getColumns();
  const defaultVisibility = getDefaultVisibility();
  const [flash, notify] = useFlash();

  const [showCategoria, setShowCategoria] = useState(null);
  const [editCategoria, setEditCategoria] = useState(null);
  const { resource: categorias, fetchResource: fetchCategorias, loading, error } = useResource(
    getCategorias,
    getColumns,
    getDefaultVisibility
  );

  const currentFilters = categorias.filters;

  async function handEdit(id) {
    const item = await handleEditClick(id, setVisibility);
    setEditCategoria(item); }

  async function handShow(id) {
    const item = await handleShowClick(id, setVisibility, setShowCategoria); }
    
  // Hooks factorizaos
  const { module, modules, Module, Modules } = useModuleNames("categoria", "categorias");
  const { visibility, handleToggle, setVisibility, handleFalse,
  checkedItems, handleToggleAll, handleToggleItem, handleSort, handleDate 
  } = useIndexTable({
      items: categorias.data,
      modules,
      //route,
      filters: categorias.filters,
      columns: columns,
      defaultVisibility: defaultVisibility  });
       
  const {handleEditClick, handleShowClick, handleEditSubmit, handleCreateClick, handleCreateSubmit, handleCloseModal} = useModalHandlers({Module, modules, currentFilters, handleFalse, notify,
    fetchItem:  getCategoria,         // GET /categorias/:id
    createItem: createCategoria,     // POST /categorias
    updateItem: updateCategoria,     // PUT /categorias/:id
    onSuccess:  fetchCategorias
  });
  const inertValue = !visibility.isEditModalOpen ? "true" : undefined;
  
  function buildCategoriaPath(categoria, allCategorias) {
    let path = [];
    let current = categoria;

    while (current?.categoriaPadreId) {
      const parent = allCategorias.find(c => c.id === current.categoriaPadreId);
      if (!parent) break;
      path.push(parent.nombre);
      current = parent;
    }

    return path.reverse().join(" / ");
  }
  
  if (error) {
    return (
      <>
        <AppBreadcrumb
          title={Modules}
          sites={["Tablas", Modules]}
          links={["/tablas", appRoutes.categoria]} />

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
          links={["/tablas", appRoutes.categoria]}
        />

        {flash && <AppNotification type={flash.type} message={flash.message} /> }

        <div className="div-uno">
          <div className="div-dos">
            <div className="div-tres">
              <div className="table-info-action relative">
                <h5>
                  <p className="text-gray-500">Total de {modules}:</p>
                  <p className="dark:text-white"> {categorias.total} </p>
                </h5>
                <AppBtnInfoCount from={categorias.from} to={categorias.to} total={categorias.total}  />
              </div>
              <AppBtnTableSetting visibility={visibility} toggleColumn={handleToggle} columns={columns} />
              <AppBtnActions modules={modules} checkedItems={checkedItems} currentFilters={currentFilters} endpoints={{ massDestroy: "/categorias/massDestroy", truncate: "/categorias/truncate" }} onSuccess={fetchCategorias}/>
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
                  {categorias.data.map((categoria) => ( 
                  <tr className="tbody-tr border-b dark:border-gray-700" key={categoria.id}>
                    <td className="px-4 py-3 w-4">
                      <Checkbox id={"chk_"+categoria.id} name={"chk_"+categoria.id} className="chk-td" checked={checkedItems[categoria.id] || false} onChange={() => handleToggleItem(categoria.id)} />
                    </td>
                    {visibility.id &&
                    <td className="px-4 py-3 w-4">
                    {categoria.id}
                    </td>}
                    {visibility.nombre &&
                    <td className="px-4 py-3 w-4">
                    {categoria?.nombre}
                    {visibility.categoriaPadreId && (
                      categoria?.categoriaPadreId && (
                        <div className="text-gray-500 text-xs">
                          {buildCategoriaPath(categoria, categorias.data)}
                        </div>
                      ))
                    }
                    </td>}
                    {visibility.detalle &&
                    <td className="px-4 py-3 w-4">
                    {categoria?.detalle}
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
                        <AppBtnEdit   modulo={modules} id={categoria.id} onEdit={() => handEdit(categoria.id)} />
                        <AppBtnShowM  modulo={modules} id={categoria.id} onShow={() => handShow(categoria.id)}/>
                        <AppBtnDelete id={categoria.id} modulo="categorias" currentFilters={currentFilters} onSuccess={() => fetchCategorias()} />
                      </div>
                    </td>
                  </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="table-footer" aria-label="Table navigation">
              <span className="footer-table-span">
                Mostrando <span className="font-semibold text-gray-900 dark:text-white">{" "+categorias.from+" - "+categorias.to+" "}</span>
                of <span className="font-semibold text-gray-900 dark:text-white">{" "+categorias.total+" "}</span>
              </span>
              <AppPagination
                page_links={categorias.links}
                search={categorias.filters.search}
                perPage={categorias.filters.perPage}
                onPageChange={(page) => fetchCategorias({ page })} />
            </div>              
          </div>
        </div>

        {visibility.isCreateModalOpen && (
          <div className="modal-create">
            <ModalCreate onSuccess={handleCreateSubmit} title={Module} handleClose={() => handleCreateClick(setVisibility)} modules={modules} categoria={categorias.data}/>
          </div>
        )}
        
        {visibility.isEditModalOpen && editCategoria && (
        <ModalEdit
          title={Module}
          modules={modules}
          handleClose={() => {
            handleCloseModal();
            setEditCategoria(null);
          }}
          value={editCategoria}
          handleEdit={handleEditSubmit}
          inert={inertValue}
          />
        )}

        { visibility.isShowModalOpen && showCategoria && (
        <ModalShow
          title={Module}
          modules={modules}
          handleClose={handleCloseModal}
          value={showCategoria}
          allCategorias={categorias.data}
        />
        )}
      </>
    );
  };    
}

export default Index;