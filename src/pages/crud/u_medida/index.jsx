// src/pages/crud/u_medida/index.jsx
import React, { useState, useEffect } from "react";

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
import { getUnidadesMedida, getUnidadMedida, createUnidadMedida, updateUnidadMedida, getColumns, getDefaultVisibility } from "../../../api/umedidas";

const Index = () => {
  const columns = getColumns();
  const defaultVisibility = getDefaultVisibility();
  const [flash, notify] = useFlash();

  const [data, setData] = useState([]);
  const [showUnidadMedida, setShowUnidadMedida] = useState(null);
  const [editUnidadMedida, setEditUnidadMedida] = useState(null);
  const { resource: unidades, fetchResource: fetchUnidades, loading, error } = useResource(
    getUnidadesMedida,
    getColumns,
    getDefaultVisibility
  );

  const currentFilters = unidades.filters;

  async function handEdit(id) {
    const item = await handleEditClick(id, setVisibility);
    setEditUnidadMedida(item); }

  async function handShow(id) {
    const item = await handleShowClick(id, setVisibility, setShowUnidadMedida); }

  // Hooks factorizaos
  const { module, modules, Module, Modules } = useModuleNames("unidad de medida", "unidades de medida");
  const { visibility, handleToggle, setVisibility, handleFalse,
  checkedItems, handleToggleAll, handleToggleItem, handleSort, handleDate 
  } = useIndexTable({
      items: data,
      modules,
      //route,
      filters: unidades.filters,
      columns: columns,
      defaultVisibility: defaultVisibility  });
       
  const {handleEditClick, handleShowClick, handleEditSubmit, handleCreateClick, handleCreateSubmit, handleCloseModal} = useModalHandlers({Module, modules, currentFilters, handleFalse, notify,
    fetchItem: getUnidadMedida,         // GET /umedidas/:id
    createItem: createUnidadMedida,     // POST /umedidas
    updateItem: updateUnidadMedida,     // PUT /umedidas/:id
    onSuccess: fetchUnidades
  });
  const inertValue = !visibility.isEditModalOpen ? "true" : undefined;
  
  if (error) {
    return (
      <>
        <AppBreadcrumb
          title={Modules}
          sites={["Tablas", Modules]}
          links={["/tablas", appRoutes.uMedida]} />

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
          links={["/tablas", appRoutes.uMedida]}
        />

        {flash && <AppNotification type={flash.type} message={flash.message} /> }

        <div className="div-uno">
          <div className="div-dos">
            <div className="div-tres">
              <div className="flex-1 flex items-center space-x-2 relative">
                <h5>
                  <p className="text-gray-500">Total de {modules}:</p>
                  <p className="dark:text-white"> {unidades.total} </p>
                </h5>
                <AppBtnInfoCount from={unidades.from} to={unidades.to} total={unidades.total}  />
                <AppBtnActions modules={modules} checkedItems={checkedItems} currentFilters={currentFilters} endpoints={{ massDestroy: "/umedidas/massDestroy", truncate: "/umedidas/truncate" }} onSuccess={fetchUnidades}/>
              </div>
              <AppBtnTableSetting visibility={visibility} toggleColumn={handleToggle} columns={columns} />
            </div>

            <div className="div-cuatro">
              <div className="relative w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 shrink-0">
                <AppBtnCreate onCreate={() => handleCreateClick(setVisibility)} />
              </div>
            </div>

      {visibility.isCreateModalOpen && (
      <div className="flex w-full items-center align-middle">
        <ModalCreate onSuccess={handleCreateSubmit} /> 
        <AppBtnX $route={modules+'.index'} handleClose={() => handleCreateClick(setVisibility)} />
      </div>
      )}
            
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
                  {visibility.actualizadoEn &&
                  <AppThTableOrder handleSort={() => handleSort('actualizadoEn', currentFilters)}label="actualizadoEn" />}
                  {visibility.creadoEn &&
                  <AppThTableOrder handleSort={() => handleSort('creadoEn', currentFilters)}label="creadoEn" />}
                  <th scope="col" className="p-4">ACTION </th>
                </tr>
              </thead>
              <tbody>
                {unidades.data.map((unidad) => ( 
                <tr className="tbody-tr border-b dark:border-gray-700" key={unidad.id}>
                  <td className="px-4 py-3 w-4">
                    <Checkbox id={"chk_"+unidad.id} name={"chk_"+unidad.id} className="chk-td" checked={checkedItems[unidad.id] || false} onChange={() => handleToggleItem(unidad.id)} />
                  </td>
                  {visibility.id &&
                  <td className="px-4 py-3 w-4">
                   {unidad.id}
                  </td>}
                  {visibility.nombre &&
                  <td className="px-4 py-3 w-4">
                   {unidad.nombre}
                  </td>}
                  {visibility.abreviado &&
                  <td className="px-4 py-3 w-4">
                   {unidad.abreviado}
                  </td>}
                  {visibility.creadoEn &&
                  <td className="px-4 py-3 w-4">
                   {unidad.creadoEn}
                  </td>}
                  {visibility.actualizadoEn &&
                  <td className="px-4 py-3 w-4">
                   {unidad.actualizadoEn}
                  </td>}
                  <td className="px-4 py-3 w-48">
                    <div className="flex items-center space-x-4">
                      <AppBtnEdit   modulo={modules} id={unidad.id} onEdit={() => handEdit(unidad.id)} />
                      <AppBtnShowM  modulo={modules} id={unidad.id} onShow={() => handShow(unidad.id)}/>
                      <AppBtnDelete id={unidad.id} modulo="umedidas" currentFilters={currentFilters} onSuccess={() => fetchUnidades()} />
                    </div>
                  </td>
                </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4" aria-label="Table navigation">
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
              Mostrando <span className="font-semibold text-gray-900 dark:text-white">{" "+unidades.from+" - "+unidades.to+" "}</span>
              of <span className="font-semibold text-gray-900 dark:text-white">{" "+unidades.total+" "}</span>
            </span>
            <AppPagination
              page_links={unidades.links}
              search={unidades.filters.search}
              perPage={unidades.filters.perPage}
              onPageChange={(page) => fetchUnidades({ page })}
            />
          </div>              
        </div>
      </div>
      
      {visibility.isEditModalOpen && editUnidadMedida && (
      <ModalEdit
        title={Module}
        modules={modules}
        handleClose={() => {
          handleCloseModal();
          setEditUnidadMedida(null);
        }}
        value={editUnidadMedida}
        handleEdit={handleEditSubmit}
        inert={inertValue}
      />
      )}

      {visibility.isShowModalOpen && showUnidadMedida && (
      <ModalShow
        title={Module}
        modules={modules}
        handleClose={handleCloseModal}
        value={showUnidadMedida}
      />
      )}
        
      </>
    );
  }
}

export default Index;