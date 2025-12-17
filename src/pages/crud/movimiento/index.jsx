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
import { getMovimientos, getMovimiento, createMovimiento, updateMovimiento, getColumns, getDefaultVisibility } from "../../../api/movimientos";

const Index = () => {
  const columns = getColumns();
  const defaultVisibility = getDefaultVisibility();
  const [flash, notify] = useFlash();

  const [showMovimiento, setShowMovimiento] = useState(null);
  const [editMovimiento, setEditMovimiento] = useState(null);
  const { resource: movimientos, fetchResource: fetchMovimientos, loading, error } = useResource(
    getMovimientos,
    getColumns,
    getDefaultVisibility
  );

  const currentFilters = movimientos.filters;

  async function handEdit(id) {
    const item = await handleEditClick(id, setVisibility);
    setEditMovimiento(item); }

  async function handShow(id) {
    const item = await handleShowClick(id, setVisibility, setShowMovimiento); }
    
  // Hooks factorizaos
  const { module, modules, Module, Modules } = useModuleNames("movimiento", "movimientos");
  const { visibility, handleToggle, setVisibility, handleFalse,
  checkedItems, handleToggleAll, handleToggleItem, handleSort, handleDate 
  } = useIndexTable({
      items: movimientos.data,
      modules,
      //route,
      filters: movimientos.filters,
      columns: columns,
      defaultVisibility: defaultVisibility  });
       
  const {handleEditClick, handleShowClick, handleEditSubmit, handleCreateClick, handleCreateSubmit, handleCloseModal} = useModalHandlers({Module, modules, currentFilters, handleFalse, notify,
    fetchItem: getMovimiento,         // GET /movimientos/:id
    createItem: createMovimiento,     // POST /movimientos
    updateItem: updateMovimiento,     // PUT /movimientos/:id
    onSuccess: fetchMovimientos
  });
  const inertValue = !visibility.isEditModalOpen ? "true" : undefined;
    
  if (error) {
    return (
      <>
        <AppBreadcrumb
          title={Modules}
          sites={["Tablas", Modules]}
          links={["/tablas", appRoutes.movimiento]} />

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
          links={["/tablas", appRoutes.movimiento]}
        />

        {flash && <AppNotification type={flash.type} message={flash.message} /> }

        <div className="div-uno">
          <div className="div-dos">
            <div className="div-tres">
              <div className="table-info-action relative">
                <h5>
                  <p className="text-gray-500">Total de {modules}:</p>
                  <p className="dark:text-white"> {movimientos.total} </p>
                </h5>
                <AppBtnInfoCount from={movimientos.from} to={movimientos.to} total={movimientos.total}  />
              </div>
              <AppBtnTableSetting visibility={visibility} toggleColumn={handleToggle} columns={columns} />
              <AppBtnActions modules={modules} checkedItems={checkedItems} currentFilters={currentFilters} endpoints={{ massDestroy: "/movimientos/massDestroy", truncate: "/movimientos/truncate" }} onSuccess={fetchMovimientos}/>
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
                    {visibility.tipoDocumentoId &&
                    <AppThTableOrder handleSort={() => handleSort('tipoDocumentoId', currentFilters)} label="ID TIPO DOCUMENTO" />}
                    {visibility.tipoDocumento &&
                    <AppThTableOrder handleSort={() => handleSort('tipoDocumento', currentFilters)} label="TIPO DOCUMENTO" />}
                    {visibility.bodegaId &&
                    <AppThTableOrder handleSort={() => handleSort('bodegaId', currentFilters)} label="ID BODEGA" />}
                    {visibility.bodega &&
                    <AppThTableOrder handleSort={() => handleSort('bodega', currentFilters)} label="BODEGA" />}
                    {visibility.proveedorId &&
                    <AppThTableOrder handleSort={() => handleSort('proveedorId', currentFilters)} label="ID PROVEEDOR" />}
                    {visibility.proveedor &&
                    <AppThTableOrder handleSort={() => handleSort('proveedor', currentFilters)} label="PLAZO" />}
                    {visibility.destinatarioId &&
                    <AppThTableOrder handleSort={() => handleSort('destinatarioId', currentFilters)} label="ID DESTINATARIO" />}
                    {visibility.destinatario &&
                    <AppThTableOrder handleSort={() => handleSort('destinatario', currentFilters)} label="DESTINATARIO" />}
                    {visibility.fecha &&
                    <AppThTableOrder handleSort={() => handleSort('fecha', currentFilters)} label="FECHA" />}
                    {visibility.tipoMovimiento &&
                    <AppThTableOrder handleSort={() => handleSort('tipoMovimiento', currentFilters)} label="TIPO DE MOVIMIENTO" />}
                    {visibility.observacion &&
                    <AppThTableOrder handleSort={() => handleSort('observacion', currentFilters)} label="OBSERVACIÓN" />}
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
                  {movimientos.data.map((movimiento) => ( 
                  <tr className="tbody-tr border-b dark:border-gray-700" key={movimiento.id}>
                    <td className="px-4 py-3 w-4">
                      <Checkbox id={"chk_"+movimiento.id} name={"chk_"+movimiento.id} className="chk-td" checked={checkedItems[movimiento.id] || false} onChange={() => handleToggleItem(movimiento.id)} />
                    </td>
                    {visibility.id &&
                    <td className="px-4 py-3 w-4">
                    {movimiento.id}
                    </td>}
                    {visibility.tipoDocumentoId &&
                    <td className="px-4 py-3 w-4">
                    {movimiento.tipoDocumentoId}
                    </td>}
                    {visibility.tipoDocumento &&
                    <td className="px-4 py-3 w-4">
                    {movimiento.tipoDocumento}
                    </td>}
                    {visibility.bodegaId &&
                    <td className="px-4 py-3 w-4">
                    {movimiento.bodegaId}
                    </td>}
                    {visibility.bodega &&
                    <td className="px-4 py-3 w-4">
                    {movimiento.bodega}
                    </td>}
                    {visibility.proveedorId &&
                    <td className="px-4 py-3 w-4">
                    {movimiento.proveedorId}
                    </td>}
                    {visibility.proveedor &&
                    <td className="px-4 py-3 w-4">
                    {movimiento.proveedor}
                    </td>}
                    {visibility.destinatarioId &&
                    <td className="px-4 py-3 w-4">
                    {movimiento.destinatarioId}
                    </td>}
                    {visibility.destinatario &&
                    <td className="px-4 py-3 w-4">
                    {movimiento.destinatario}
                    </td>}
                    {visibility.fecha &&
                    <td className="px-4 py-3 w-4">
                    {movimiento.fecha}
                    </td>}
                    {visibility.tipoMovimiento &&
                    <td className="px-4 py-3 w-4">
                    {movimiento.tipoMovimiento}
                    </td>}
                    {visibility.observacion &&
                    <td className="px-4 py-3 w-4">
                    {movimiento.observacion}
                    </td>}
                    {visibility.naturaleza &&
                    <td className="px-4 py-3 w-4">
                    {movimiento.naturaleza}
                    </td>}
                    {visibility.created_at &&
                    <td className="px-4 py-3 w-4">
                    {movimiento.created_at}
                    </td>}
                    {visibility.updated_at &&
                    <td className="px-4 py-3 w-4">
                    {movimiento.updated_at}
                    </td>}
                    <td className="px-4 py-3 w-48">
                      <div className="flex items-center space-x-4">
                        <AppBtnEdit   modulo={modules} id={movimiento.id} onEdit={() => handEdit(movimiento.id)} />
                        <AppBtnShowM  modulo={modules} id={movimiento.id} onShow={() => handShow(movimiento.id)}/>
                        <AppBtnDelete id={movimiento.id} modulo="movimientos" currentFilters={currentFilters} onSuccess={() => fetchMovimientos()} />
                      </div>
                    </td>
                  </tr>
                  ))}
                </tbody>
              </table>
            </div>

          <div className="table-footer" aria-label="Table navigation">
            <span className="footer-table-span">
              Mostrando <span className="font-semibold text-gray-900 dark:text-white">{" "+movimientos.from+" - "+movimientos.to+" "}</span>
              of <span className="font-semibold text-gray-900 dark:text-white">{" "+movimientos.total+" "}</span>
            </span>
            <AppPagination
              page_links={movimientos.links}
              search={movimientos.filters.search}
              perPage={movimientos.filters.perPage}
              onPageChange={(page) => fetchMovimientos({ page })}
            />
          </div>              
        </div>
      </div>

      {visibility.isCreateModalOpen && (
        <div className="modal-create">
          <ModalCreate onSuccess={handleCreateSubmit} title={Module} handleClose={() => handleCreateClick(setVisibility)} modules={modules}/>
        </div>
      )}
      
      {visibility.isEditModalOpen && editMovimiento && (
      <ModalEdit
        title={Module}
        modules={modules}
        handleClose={() => {
          handleCloseModal();
          setEditMovimiento(null);
        }}
        value={editMovimiento}
        handleEdit={handleEditSubmit}
        inert={inertValue}
      />
      )}

      {visibility.isShowModalOpen && showMovimiento && (
      <ModalShow
        title={Module}
        modules={modules}
        handleClose={handleCloseModal}
        value={showMovimiento}
      />
      )}
        
      </>
    );
  }
}


export default Index;