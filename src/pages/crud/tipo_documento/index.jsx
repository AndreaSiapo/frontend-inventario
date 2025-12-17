import React, { useState, useEffect } from "react";

// Componentes
import AppBreadcrumb        from "./../../../components/html/breadcrumb";
import AppThTableOrder      from "./../../../components/html/thTableOrder";
import {AppBtnActions, AppBtnInfoCount, AppBtnTableSetting}           from "./../../../components/html/btn";
import {AppBtnCreate, AppBtnShowM, AppBtnEdit, AppBtnDelete, AppBtnX} from "./../../../components/form/btn";
import { IconInBox, IconOutBox } from "../../../components/icons/actions/box";
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
import { getTipoDocumentos, getTipoDocumento, createTipoDocumento, updateTipoDocumento, getColumns, getDefaultVisibility } from "../../../api/tipoDocumentos";

const Index = () => {
  const columns = getColumns();
  const defaultVisibility = getDefaultVisibility();
  const [flash, notify] = useFlash();

  const [showTipoDocumento, setShowTipoDocumento] = useState(null);
  const [editTipoDocumento, setEditTipoDocumento] = useState(null);
  const { resource: tipoDocumentos, fetchResource: fetchTipoDocumentos, loading, error } = useResource(
    getTipoDocumentos,
    getColumns,
    getDefaultVisibility
  );

  const currentFilters = tipoDocumentos.filters;

  async function handEdit(id) {
    const item = await handleEditClick(id, setVisibility);
    setEditTipoDocumento(item); }

  async function handShow(id) {
    const item = await handleShowClick(id, setVisibility, setShowTipoDocumento); }
    
  // Hooks factorizaos
  const { module, modules, Module, Modules } = useModuleNames("Tipo de Documento", "Tipos de Documento");
  const { visibility, handleToggle, setVisibility, handleFalse,
  checkedItems, handleToggleAll, handleToggleItem, handleSort, handleDate 
  } = useIndexTable({
      items: tipoDocumentos.data,
      modules,
      //route,
      //filters,
      columns: columns,
      defaultVisibility: defaultVisibility  });
       
  const {handleEditClick, handleShowClick, handleEditSubmit, handleCreateClick, handleCreateSubmit, handleCloseModal} = useModalHandlers({Module, modules, currentFilters, handleFalse, notify,
    fetchItem: getTipoDocumento,         // GET /tipoDocumentos/:id
    createItem: createTipoDocumento,     // POST /tipoDocumentos
    updateItem: updateTipoDocumento,     // PUT /tipoDocumentos/:id
    onSuccess: fetchTipoDocumentos
  });
  const inertValue = !visibility.isEditModalOpen ? "true" : undefined;
  
  if (error) {
    return (
      <>
        <AppBreadcrumb
          title={Modules}
          sites={["Tablas", Modules]}
          links={["/tablas", appRoutes.tipoDocumento]} />

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
          links={["/tablas", appRoutes.tipoDocumento]}
        />

        {flash && <AppNotification type={flash.type} message={flash.message} /> }

        <div className="div-uno">
          <div className="div-dos">
            <div className="div-tres">
              <div className="table-info-action relative">
                <h5>
                  <p className="text-gray-500">Total de {modules}:</p>
                  <p className="dark:text-white"> {tipoDocumentos.total} </p>
                </h5>
                <AppBtnInfoCount from={tipoDocumentos.from} to={tipoDocumentos.to} total={tipoDocumentos.total}  />
              </div>
              <AppBtnTableSetting visibility={visibility} toggleColumn={handleToggle} columns={columns} />
            </div>

            <div className="div-cuatro">
              <div className="relative w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 shrink-0">
                <AppBtnCreate onCreate={() => handleCreateClick(setVisibility)} />
                <AppBtnActions modules={modules} checkedItems={checkedItems} currentFilters={currentFilters} endpoints={{ massDestroy: "/tipoDocumentos/massDestroy", truncate: "/tipoDocumentos/truncate" }} onSuccess={fetchTipoDocumentos}/>
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
                    {visibility.abreviado &&
                    <AppThTableOrder handleSort={() => handleSort('abreviado', currentFilters)} label="ABREVIADO" />}
                    {visibility.descripcion &&
                    <AppThTableOrder handleSort={() => handleSort('descripcion', currentFilters)} label="DESCRIPCIÓN" />}
                    {visibility.naturaleza &&
                    <AppThTableOrder handleSort={() => handleSort('naturaleza', currentFilters)} label="NATURALEZA" />}
                    {visibility.actualizadoEn &&
                    <AppThTableOrder handleSort={() => handleSort('actualizadoEn', currentFilters)}label="updated_at" />}
                    {visibility.creadoEn &&
                    <AppThTableOrder handleSort={() => handleSort('creadoEn', currentFilters)}label="created_at" />}
                    <th scope="col" className="p-4">ACTION </th>
                  </tr>
                </thead>
                <tbody>
                  {tipoDocumentos.data.map((tipoDocumento) => ( 
                  <tr className="tbody-tr border-b dark:border-gray-700" key={tipoDocumento.id}>
                    <td className="px-4 py-3 w-4">
                      <Checkbox id={"chk_"+tipoDocumento.id} name={"chk_"+tipoDocumento.id} className="chk-td" checked={checkedItems[tipoDocumento.id] || false} onChange={() => handleToggleItem(tipoDocumento.id)} />
                    </td>
                    {visibility.id &&
                    <td className="px-4 py-3 w-4">
                    {tipoDocumento.id}
                    </td>}
                    {visibility.codigo &&
                    <td className="px-4 py-3 w-4">
                    {tipoDocumento.codigo}
                    </td>}
                    {visibility.nombre &&
                    <td className="px-4 py-3 w-4">
                    {tipoDocumento.nombre}
                    </td>}
                    {visibility.abreviado &&
                    <td className="px-4 py-3 w-4">
                    {tipoDocumento.abreviado}
                    </td>}
                    {visibility.descripcion &&
                    <td className="px-4 py-3 w-4">
                    {tipoDocumento.descripcion}
                    </td>}
                    {visibility.naturaleza &&
                    <td className="px-4 py-3 w-4">
                    {tipoDocumento.naturaleza
                      ? <IconInBox className="w-4 h-4 text-green-600" />
                      : <IconOutBox className="w-4 h-4 text-red-600" />
                    }
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
                        <AppBtnEdit   modulo={modules} id={tipoDocumento.id} onEdit={() => handEdit(tipoDocumento.id)} />
                        <AppBtnShowM  modulo={modules} id={tipoDocumento.id} onShow={() => handShow(tipoDocumento.id)}/>
                        <AppBtnDelete id={tipoDocumento.id} modulo="tipoDocumentos" currentFilters={currentFilters} onSuccess={() => fetchTipoDocumentos()} />
                      </div>
                    </td>
                  </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="table-footer" aria-label="Table navigation">
              <span className="footer-table-span">
                Mostrando <span className="font-semibold text-gray-900 dark:text-white">{" "+tipoDocumentos.from+" - "+tipoDocumentos.to+" "}</span>
                of <span className="font-semibold text-gray-900 dark:text-white">{" "+tipoDocumentos.total+" "}</span>
              </span>
              <AppPagination
                page_links={tipoDocumentos.links}
                search={tipoDocumentos.filters.search}
                perPage={tipoDocumentos.filters.perPage}
                onPageChange={(page) => fetchTipoDocumentos({ page })}
              />
            </div>              
          </div>
        </div>

        {visibility.isCreateModalOpen && (
          <div className="modal-create">
            <ModalCreate onSuccess={handleCreateSubmit} title={Module} handleClose={() => handleCreateClick(setVisibility)} modules={modules}/>
          </div>
        )}
        
        {visibility.isEditModalOpen && editTipoDocumento && (
        <ModalEdit
          title={Module}
          modules={modules}
          handleClose={() => {
            handleCloseModal();
            setEditTipoDocumento(null);
          }}
          value={editTipoDocumento}
          handleEdit={handleEditSubmit}
          inert={inertValue}
        />
        )}

        {visibility.isShowModalOpen && showTipoDocumento && (
        <ModalShow
          title={Module}
          modules={modules}
          handleClose={handleCloseModal}
          value={showTipoDocumento}
        />
        )}
      </>
    );
  }
}


export default Index;