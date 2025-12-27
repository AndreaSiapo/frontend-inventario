import React, { useState, useEffect } from "react";

// Componentes
import AppBreadcrumb        from "@html/breadcrumb";
import AppNotification, { useFlash } from "@html/notification";
import AppPagination        from "@html/pagination";
import AppThTableOrder      from "@html/thTableOrder";
import {AppBtnActions, AppBtnInfoCount, AppBtnTableSetting}           from "@html/btn";
import {AppBtnCreate, AppBtnShowM, AppBtnEdit, AppBtnDelete, AppBtnX} from "@form/btn";
import Checkbox             from '@form/check';
import ModalEdit            from "./edit";
import ModalShow            from "./show";
import ModalCreate          from "./create";
import {useIndexTable, useModalHandlers, useModuleNames, useResource, useMoneda} from "@/hook/useHandler";
//import AppSearchIndex       from "@form/search_index";
//import Layout               from "@app/layout";

import { appRoutes } from "@route";
import { getExistencias, getExistencia, createExistencia, updateExistencia, getColumns, getDefaultVisibility } from "@/api/existencias";

const Index = () => {
  const columns = getColumns();
  const defaultVisibility = getDefaultVisibility();
  const [flash, notify] = useFlash();

  const [showExistencia, setShowExistencia] = useState(null);
  const [editExistencia, setEditExistencia] = useState(null);
  const { resource: existencias, fetchResource: fetchExistencias, loading, error } = useResource(
    getExistencias,
    getColumns,
    getDefaultVisibility
  );

  const currentFilters = existencias.filters;

  async function handEdit(id) {
    const item = await handleEditClick(id, setVisibility);
    setEditExistencia(item); }

  async function handShow(id) {
    const item = await handleShowClick(id, setVisibility, setShowExistencia); }
    
  // Hooks factorizaos
  const { module, modules, Module, Modules } = useModuleNames("existencia", "existencias");
  const { visibility, handleToggle, setVisibility, handleFalse,
  checkedItems, handleToggleAll, handleToggleItem, handleSort, handleDate 
  } = useIndexTable({
      items: existencias.data,
      modules,
      //route,
      filters: existencias.filters,
      columns: columns,
      defaultVisibility: defaultVisibility  });
       
  const {handleEditClick, handleShowClick, handleEditSubmit, handleCreateClick, handleCreateSubmit, handleCloseModal} = useModalHandlers({Module, modules, currentFilters, handleFalse, notify,
    fetchItem: getExistencia,         // GET /existencias/:id
    createItem: createExistencia,     // POST /existencias
    updateItem: updateExistencia,     // PUT /existencias/:id
    onSuccess: fetchExistencias
  });
  const inertValue = !visibility.isEditModalOpen ? "true" : undefined;
  const Moneda = useMoneda();
    
  if (error) {
    return (
      <>
        <AppBreadcrumb
          title={Modules}
          sites={["Tablas", Modules]}
          links={["/tablas", appRoutes.existencia]} />

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
          links={["/tablas", appRoutes.existencia]}
        />

        {flash && <AppNotification type={flash.type} message={flash.message} /> }

        <div className="div-uno">
          <div className="div-dos">
            <div className="div-tres">
              <div className="flex-1 flex items-center space-x-2 relative">
                <h5>
                  <p className="text-gray-500">Total de {modules}:</p>
                  <p className="dark:text-white"> {existencias.total} </p>
                </h5>
                <AppBtnInfoCount from={existencias.from} to={existencias.to} total={existencias.total}  />
              </div>
              <AppBtnTableSetting visibility={visibility} toggleColumn={handleToggle} columns={columns} />
            </div>

            <div className="div-cuatro">
              <div className="relative w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 shrink-0">
                <AppBtnCreate onCreate={() => handleCreateClick(setVisibility)} />
                <AppBtnActions modules={modules} checkedItems={checkedItems} currentFilters={currentFilters} endpoints={{ massDestroy: "/existencias/massDestroy", truncate: "/existencias/truncate" }} onSuccess={fetchExistencias}/>
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
                    {visibility.productoId &&
                    <AppThTableOrder handleSort={() => handleSort('productoId', currentFilters)} label="PRODUCTO ID" />}
                    {visibility.producto &&
                    <AppThTableOrder handleSort={() => handleSort('producto', currentFilters)} label="PRODUCTO" />}
                    {visibility.bodegaId &&
                    <AppThTableOrder handleSort={() => handleSort('bodegaId', currentFilters)} label="BODEGA ID" />}
                    {visibility.bodega &&
                    <AppThTableOrder handleSort={() => handleSort('bodega', currentFilters)} label="BODEGA" />}
                    {visibility.loteId &&
                    <AppThTableOrder handleSort={() => handleSort('loteId', currentFilters)} label="BODEGA ID" />}
                    {visibility.lote &&
                    <AppThTableOrder handleSort={() => handleSort('lote', currentFilters)} label="BODEGA" />}
                    {visibility.stockMinimo &&
                    <AppThTableOrder handleSort={() => handleSort('stockMinimo', currentFilters)} label="MIN" />}
                    {visibility.stockMaximo &&
                    <AppThTableOrder handleSort={() => handleSort('stockMaximo', currentFilters)} label="MAX" />}
                    {visibility.costoPromedio &&
                    <AppThTableOrder handleSort={() => handleSort('costoPromedio', currentFilters)} label="PROMEDIO" />}
                    {visibility.fechaUltimoMovimiento &&
                    <AppThTableOrder handleSort={() => handleSort('fechaUltimoMovimiento', currentFilters)} label="FEC. ULT. MOV." />}
                    {visibility.cantidadActual &&
                    <AppThTableOrder handleSort={() => handleSort('cantidadActual', currentFilters)} label="CANT. ACTUAL" />}
                    {visibility.actualizadoEn &&
                    <AppThTableOrder handleSort={() => handleSort('actualizadoEn', currentFilters)}label="actualizadoEn" />}
                    {visibility.creadoEn &&
                    <AppThTableOrder handleSort={() => handleSort('creadoEn', currentFilters)}label="creadoEn" />}
                    <th scope="col" className="p-4">ACTION </th>
                  </tr>
                </thead>
                <tbody>
                  {existencias.data.map((existencia) => ( 
                  <tr className="tbody-tr border-b dark:border-gray-700" key={existencia.id}>
                    <td className="px-4 py-3 w-4">
                      <Checkbox id={"chk_"+existencia.id} name={"chk_"+existencia.id} className="chk-td" checked={checkedItems[existencia.id] || false} onChange={() => handleToggleItem(existencia.id)} />
                    </td>
                    {visibility.id &&
                    <td className="px-4 py-3 w-4">
                    {existencia.id}
                    </td>}
                    {visibility.productoId &&
                    <td className="px-4 py-3 w-4">
                    {existencia.productoId}
                    </td>}
                    {visibility.producto &&
                    <td className="px-4 py-3 w-4">
                    {existencia.producto}
                    </td>}
                    {visibility.bodegaId &&
                    <td className="px-4 py-3 w-4">
                    {existencia.bodegaId}
                    </td>}
                    {visibility.bodega &&
                    <td className="px-4 py-3 w-4">
                    {existencia.bodega}
                    </td>}
                    {visibility.loteId &&
                    <td className="px-4 py-3 w-4">
                    {existencia.loteId}
                    </td>}
                    {visibility.lote &&
                    <td className="px-4 py-3 w-4">
                    {existencia.lote}
                    </td>}
                    {visibility.stockMinimo &&
                    <td className="px-4 py-3 w-4">
                    {existencia.stockMinimo}
                    </td>}
                    {visibility.stockMaximo &&
                    <td className="px-4 py-3 w-4">
                    {existencia.stockMaximo}
                    </td>}
                    {visibility.costoPromedio &&
                    <td className="px-4 py-3 w-4">
                    {Moneda(existencia.costoPromedio)}
                    </td>}
                    {visibility.fechaUltimoMovimiento &&
                    <td className="px-4 py-3 w-4">
                    {existencia.fechaUltimoMovimiento}
                    </td>}
                    {visibility.cantidadActual &&
                    <td className="px-4 py-3 w-4">
                    {existencia.cantidadActual}
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
                        <AppBtnEdit   modulo={modules} id={existencia.id} onEdit={() => handEdit(existencia.id)} />
                        <AppBtnShowM  modulo={modules} id={existencia.id} onShow={() => handShow(existencia.id)}/>
                        <AppBtnDelete id={existencia.id} modulo="existencias" currentFilters={currentFilters} onSuccess={() => fetchExistencias()} />
                      </div>
                    </td>
                  </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="table-footer" aria-label="Table navigation">
              <span className="footer-table-span">
                Mostrando <span className="font-semibold text-gray-900 dark:text-white">{" "+existencias.from+" - "+existencias.to+" "}</span>
                of <span className="font-semibold text-gray-900 dark:text-white">{" "+existencias.total+" "}</span>
              </span>
              <AppPagination
                page_links={existencias.links}
                search={existencias.filters.search}
                perPage={existencias.filters.perPage}
                onPageChange={(page) => fetchExistencias({ page })}
              />
            </div>              
          </div>
        </div>

        {visibility.isCreateModalOpen && (
          <div className="modal-create">
            <ModalCreate onSuccess={handleCreateSubmit} title={Module} handleClose={() => handleCreateClick(setVisibility)} modules={modules}/>
          </div>
        )}
        
        {visibility.isEditModalOpen && editExistencia && (
        <ModalEdit
          title={Module}
          modules={modules}
          handleClose={() => {
            handleCloseModal();
            setEditExistencia(null);
          }}
          value={editExistencia}
          handleEdit={handleEditSubmit}
          inert={inertValue}
        />
        )}

        {visibility.isShowModalOpen && showExistencia && (
        <ModalShow
          title={Module}
          modules={modules}
          handleClose={handleCloseModal}
          value={showExistencia}
        />
        )}
      </>
    );
  }
}

export default Index;