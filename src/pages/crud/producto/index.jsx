import React, { useState, useEffect } from "react";

// Componentes
import AppBreadcrumb        from "@html/breadcrumb";
import AppThTableOrder      from "@html/thTableOrder";
import {AppBtnActions, AppBtnInfoCount, AppBtnTableSetting, AppBtnCodeBarDownload, AppBtnCodeBar}           from "@html/btn";
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
import { getProductos, getProducto, createProducto, updateProducto, getColumns, getDefaultVisibility } from "@/api/productos";

const Index = () => {
  const columns = getColumns();
  const defaultVisibility = getDefaultVisibility();
  const [flash, notify] = useFlash();

  const [showProducto, setShowProducto] = useState(null);
  const [editProducto, setEditProducto] = useState(null);
  const { resource: productos, fetchResource: fetchProductos, loading, error } = useResource(
    getProductos,
    getColumns,
    getDefaultVisibility
  );

  const currentFilters = productos.filters;

  async function handEdit(id) {
    const item = await handleEditClick(id, setVisibility);
    setEditProducto(item); }

  async function handShow(id) {
    const item = await handleShowClick(id, setVisibility, setShowProducto); }
    
  // Hooks factorizaos
  const { module, modules, Module, Modules } = useModuleNames("producto", "productos");
  const { visibility, handleToggle, setVisibility, handleFalse,
  checkedItems, handleToggleAll, handleToggleItem, handleSort, handleDate 
  } = useIndexTable({
      items: productos.data,
      modules,
      //route,
      filters: productos.filters,
      columns: columns,
      defaultVisibility: defaultVisibility  });
       
  const {handleEditClick, handleShowClick, handleEditSubmit, handleCreateClick, handleCreateSubmit, handleCloseModal} = useModalHandlers({Module, modules, currentFilters, handleFalse, notify,
    fetchItem: getProducto,         // GET /productos/:id
    createItem: createProducto,     // POST /productos
    updateItem: updateProducto,     // PUT /productos/:id
    onSuccess: fetchProductos
  });
  const inertValue = !visibility.isEditModalOpen ? "true" : undefined;
  const Moneda = useMoneda();
    
  if (error) {
    return (
      <>
        <AppBreadcrumb
          title={Modules}
          sites={["Tablas", Modules]}
          links={["/tablas", appRoutes.producto]} />

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
          links={["/tablas", appRoutes.producto]}
        />

        {flash && <AppNotification type={flash.type} message={flash.message} /> }

        <div className="div-uno">
          <div className="div-dos">
            <div className="div-tres">
              <div className="table-info-action relative">
                <h5>
                  <p className="text-gray-500">Total de {modules}:</p>
                  <p className="dark:text-white"> {productos.total} </p>
                </h5>
                <AppBtnInfoCount from={productos.from} to={productos.to} total={productos.total}  />
              </div>
              <AppBtnTableSetting visibility={visibility} toggleColumn={handleToggle} columns={columns} />
              <AppBtnActions modules={modules} checkedItems={checkedItems} currentFilters={currentFilters} endpoints={{ massDestroy: "/productos/massDestroy", truncate: "/productos/truncate" }} onSuccess={fetchProductos}/>
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
                    {visibility.codigo &&
                    <AppThTableOrder handleSort={() => handleSort('codigo', currentFilters)} label="CODIGO" />}
                    {visibility.codigoBarra &&
                    <AppThTableOrder handleSort={() => handleSort('codigoBarra', currentFilters)} label="CODIGO BARRA" />}
                    {visibility.nombre &&
                    <AppThTableOrder handleSort={() => handleSort('nombre', currentFilters)} label="NOMBRE" />}
                    {visibility.descripcion &&
                    <AppThTableOrder handleSort={() => handleSort('descripcion', currentFilters)} label="DESCRIPCIÓN" />}
                    {visibility.minimo &&
                    <AppThTableOrder handleSort={() => handleSort('minimo', currentFilters)} label="MIN" />}
                    {visibility.maximo &&
                    <AppThTableOrder handleSort={() => handleSort('maximo', currentFilters)} label="MAX" />}
                    {visibility.fecha &&
                    <AppThTableOrder handleSort={() => handleSort('fecha', currentFilters)} label="FECHA" />}
                    {visibility.activo &&
                    <AppThTableOrder handleSort={() => handleSort('activo', currentFilters)} label="ACTIVO" />}
                    {visibility.precio &&
                    <AppThTableOrder handleSort={() => handleSort('precio', currentFilters)} label="PRECIO" />}
                    {visibility.medidaId &&
                    <AppThTableOrder handleSort={() => handleSort('medidaId', currentFilters)} label="ID MEDIDA" />}
                    {visibility.medida &&
                    <AppThTableOrder handleSort={() => handleSort('medida', currentFilters)} label="MEDIDA" />}
                    {visibility.medidaAbreviado &&
                    <AppThTableOrder handleSort={() => handleSort('medidaAbreviado', currentFilters)} label="ABREVIATURA MEDIDA" />}
                    {visibility.marcaId &&
                    <AppThTableOrder handleSort={() => handleSort('marcaId', currentFilters)} label="ID MARCA" />}
                    {visibility.marca &&
                    <AppThTableOrder handleSort={() => handleSort('marca', currentFilters)} label="MARCA" />}
                    {visibility.categoriaId &&
                    <AppThTableOrder handleSort={() => handleSort('categoriaId', currentFilters)} label="ID CATEGORÍA" />}
                    {visibility.categoria &&
                    <AppThTableOrder handleSort={() => handleSort('categoria', currentFilters)} label="CATEGORÍA" />}
                    {visibility.presentacionId &&
                    <AppThTableOrder handleSort={() => handleSort('presentacionId', currentFilters)} label="ID PRESENTACIÓN" />}
                    {visibility.presentacion &&
                    <AppThTableOrder handleSort={() => handleSort('presentacion', currentFilters)} label="PRESENTACIÓN" />}
                    {visibility.actualizadoEn &&
                    <AppThTableOrder handleSort={() => handleSort('actualizadoEn', currentFilters)}label="actualizadoEn" />}
                    {visibility.creadoEn &&
                    <AppThTableOrder handleSort={() => handleSort('creadoEn', currentFilters)}label="creadoEn" />}
                    <th scope="col" className="p-4">ACTION </th>
                  </tr>
                </thead>
                <tbody>
                  {productos.data.map((producto) => ( 
                  <tr className="tbody-tr border-b dark:border-gray-700" key={producto.id}>
                    <td className="px-4 py-3 w-4">
                      <Checkbox id={"chk_"+producto.id} name={"chk_"+producto.id} className="chk-td" checked={checkedItems[producto.id] || false} onChange={() => handleToggleItem(producto.id)} />
                    </td>
                    {visibility.id &&
                    <td className="px-4 py-3 w-4">
                    {producto.id}
                    </td>}
                    {visibility.codigo &&
                    <td className="px-4 py-3 w-4">
                    {producto.codigoBarra}
                    </td>}
                    {visibility.codigoBarra &&
                    <td className="px-4 py-3 w-32">
                      {producto.codigoBarra && (
                      <><AppBtnCodeBarDownload codigo={producto.codigoBarra} modules={modules} w="w-48" /></>
                      )}
                    </td>}
                    {visibility.nombre &&
                    <td className="px-4 py-3 w-4">
                    {producto.nombre}
                    </td>}
                    {visibility.descripcion &&
                    <td className="px-4 py-3 w-4">
                    {producto.descripcion}
                    </td>}
                    {visibility.minimo &&
                    <td className="px-4 py-3 w-4">
                    {producto.minimo}
                    </td>}
                    {visibility.maximo &&
                    <td className="px-4 py-3 w-4">
                    {producto.maximo}
                    </td>}
                    {visibility.fecha &&
                    <td className="px-4 py-3 w-4">
                    {producto.fecha}
                    </td>}
                    {visibility.activo &&
                    <td className="px-4 py-3 w-4">
                    {producto.activo}
                    </td>}
                    {visibility.precio &&
                    <td className="px-4 py-3 w-4 text-right">
                    {Moneda(producto.precio)}
                    </td>}
                    {visibility.medidaId &&
                    <td className="px-4 py-3 w-4">
                    {producto.medidaId}
                    </td>}
                    {visibility.medida &&
                    <td className="px-4 py-3 w-4">
                    {producto.medida}
                    </td>}
                    {visibility.medidaAbreviado &&
                    <td className="px-4 py-3 w-4">
                    {producto.medidaAbreviado}
                    </td>}
                    {visibility.marcaId &&
                    <td className="px-4 py-3 w-4">
                    {producto.marcaId}
                    </td>}
                    {visibility.marca &&
                    <td className="px-4 py-3 w-4">
                    {producto.marca}
                    </td>}
                    {visibility.categoriaId &&
                    <td className="px-4 py-3 w-4">
                    {producto.categoriaId}
                    </td>}
                    {visibility.categoria &&
                    <td className="px-4 py-3 w-4">
                    {producto.categoria}
                    </td>}
                    {visibility.presentacionId &&
                    <td className="px-4 py-3 w-4">
                    {producto.presentacionId}
                    </td>}
                    {visibility.presentacionId &&
                    <td className="px-4 py-3 w-4">
                    {producto.presentacionId}
                    </td>}
                    {visibility.presentacion &&
                    <td className="px-4 py-3 w-4">
                    {producto.presentacion}
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
                        <AppBtnEdit   modulo={modules} id={producto.id} onEdit={() => handEdit(producto.id)} />
                        <AppBtnShowM  modulo={modules} id={producto.id} onShow={() => handShow(producto.id)}/>
                        <AppBtnDelete id={producto.id} modulo="productos" currentFilters={currentFilters} onSuccess={() => fetchProductos()} />
                      </div>
                    </td>
                  </tr>
                  ))}
                </tbody>
              </table>
            </div>

          <div className="table-footer" aria-label="Table navigation">
            <span className="footer-table-span">
              Mostrando <span className="font-semibold text-gray-900 dark:text-white">{" "+productos.from+" - "+productos.to+" "}</span>
              of <span className="font-semibold text-gray-900 dark:text-white">{" "+productos.total+" "}</span>
            </span>
            <AppPagination
              page_links={productos.links}
              search={productos.filters.search}
              perPage={productos.filters.perPage}
              onPageChange={(page) => fetchProductos({ page })}
            />
          </div>              
        </div>
      </div>

      {visibility.isCreateModalOpen && (
        <div className="modal-create">
          <ModalCreate onSuccess={handleCreateSubmit} title={Module} handleClose={() => handleCreateClick(setVisibility)} modules={modules} />
        </div> )}
      
      {visibility.isEditModalOpen && editProducto && (
      <ModalEdit
        title={Module}
        modules={modules}
        handleClose={() => { handleCloseModal(); setEditProducto(null); }}
        value={editProducto}
        handleEdit={handleEditSubmit}
        inert={inertValue} />
      )}

      {visibility.isShowModalOpen && showProducto && (
      <ModalShow
        title={Module}
        modules={modules}
        handleClose={handleCloseModal}
        value={showProducto} />
      )}
      </>
    );
  }
}

export default Index;