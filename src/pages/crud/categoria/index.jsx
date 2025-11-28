import React, { useState, useEffect } from "react";

//import { appRoutes } from "../../../routes/appRoutes";

// Componentes
import AppBreadcrumb        from "./../../../components/html/breadcrumb";
import AppThTableOrder      from "./../../../components/html/thTableOrder";
import {AppBtnActions, AppBtnInfoCount, AppBtnTableSetting}   from "./../../../components/html/btn";
import {AppBtnCreate, AppBtnShowM, AppBtnEdit, AppBtnDelete}  from "./../../../components/form/btn";
import Checkbox             from './../../../components/form/check';
import ModalEdit            from "./edit";
import ModalShow            from "./show";
import ModalCreate          from "./create";
import {useIndexTable, useModalHandlers, useModuleNames} from "./../../../hook/useHandler";
import AppNotification, { useFlash } from "./../../../components/html/notification";
import AppPagination        from "./../../../components/html/pagination";
//import AppSearchIndex       from "./../../../components/form/search_index";
//import Layout               from "./../../../components/app/layout";

import { appRoutes } from "../../../routes/appRoutes";
import { getCategorias, getCategoria, createCategoria, updateCategoria, getColumns, getDefaultVisibility } from "../../../api/categorias";

const Index = () => {
  const columns = getColumns();
  const defaultVisibility = getDefaultVisibility();
  const [flash, notify] = useFlash();

  const [showCategoria, setShowCategoria] = useState(null);
  const [editCategoria, setEditCategoria] = useState(null);
  const [categorias, setCategorias] = useState({
    data: [],
    total: 0,
    from: 0,
    to: 0,
    links: [],
    filters: { search: '', perPage: 10, page: 1, orderBy: 'id', orderDir: 'asc' },
    columns: getColumns(),
    defaultVisibility: getDefaultVisibility()
  });

  const fetchCategorias = async (filters = {}) => {
    try {
      const newFilters = { ...categorias.filters, ...filters };
      const json = await getCategorias(newFilters);
      setCategorias({...json, filters: newFilters});

    } catch (error) {
      console.error("Error al obtener categorias:", error.message);
    }
  };

  useEffect(() => {
    fetchCategorias();
  }, []);

  async function handEdit(id) {
    const item = await handleEditClick(id, setVisibility);
    setEditCategoria(item); }

  async function handShow(id) {
    const item = await handleShowClick(id, setVisibility, setShowCategoria); }

  const currentFilters = {
    search: categorias.filters.search,
    perPage: categorias.filters.perPage,
    page: categorias.filters.page,
    orderBy: categorias.filters.orderBy,
    orderDir: categorias.filters.orderDir
  };
    
  // Hooks factorizaos
  const { module, modules, Module, Modules } = useModuleNames("categoria", "categorias");
  const { visibility, handleToggle, setVisibility, handleFalse,
  checkedItems, handleToggleAll, handleToggleItem, handleSort, handleDate 
  } = useIndexTable({
      items: categorias.data,
      modules,
      //route,
      //filters,
      columns: columns,
      defaultVisibility: defaultVisibility  });
       
  const {handleEditClick, handleShowClick, handleEditSubmit, handleCreateClick, handleCreateSubmit, handleCloseModal} = useModalHandlers({Module, modules, currentFilters, handleFalse, notify,
    fetchItem: getCategoria,         // GET /categorias/:id
    createItem: createCategoria,     // POST /categorias
    updateItem: updateCategoria,     // PUT /categorias/:id
    onSuccess: fetchCategorias
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

  return (
    <>
      <AppBreadcrumb
        title={Modules}
        sites={["Tablas",Modules]}
        links={["/tablas", appRoutes.u_medida]}
      />

      {flash && <AppNotification type={flash.type} message={flash.message} />
    }

        <div className="div-uno">
          <div className="div-dos">
            <div className="div-tres">
              <div className="flex-1 flex items-center space-x-2 relative">
                <h5>
                  <p className="text-gray-500">Total de {modules}:</p>
                  <p className="dark:text-white"> {categorias.total} </p>
                </h5>
                <AppBtnInfoCount from={categorias.from} to={categorias.to} total={categorias.total}  />
              </div>
              <AppBtnTableSetting visibility={visibility} toggleColumn={handleToggle} columns={columns} />
            </div>

            <div className="div-cuatro">
              <div className="relative w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 shrink-0">
                <AppBtnCreate onCreate={() => handleCreateClick(setVisibility)} />
                <AppBtnActions modules={modules} checkedItems={checkedItems} currentFilters={currentFilters} endpoints={{ massDestroy: "/categorias/massDestroy", truncate: "/categorias/truncate" }} onSuccess={fetchCategorias}/>
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
                  {visibility.detalle &&
                  <AppThTableOrder handleSort={() => handleSort('detalle', currentFilters)} label="DETALLE" />}
                  {visibility.updated_at &&
                  <AppThTableOrder handleSort={() => handleSort('updated_at', currentFilters)}label="updated_at" />}
                  {visibility.created_at &&
                  <AppThTableOrder handleSort={() => handleSort('created_at', currentFilters)}label="created_at" />}
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
                  {visibility.created_at &&
                  <td className="px-4 py-3 w-4">
                   {categoria.created_at}
                  </td>}
                  {visibility.updated_at &&
                  <td className="px-4 py-3 w-4">
                   {categoria.updated_at}
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

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4" aria-label="Table navigation">
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
              Mostrando <span className="font-semibold text-gray-900 dark:text-white">{" "+categorias.from+" - "+categorias.to+" "}</span>
              of <span className="font-semibold text-gray-900 dark:text-white">{" "+categorias.total+" "}</span>
            </span>
            <AppPagination
              page_links={categorias.links}
              search={categorias.filters.search}
              perPage={categorias.filters.perPage}
              onPageChange={(page) => fetchCategorias({ page })}
            />
          </div>              
        </div>
      </div>

      {visibility.isCreateModalOpen && (
        <div className="flex w-full items-center align-middle">
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
        categoria={categorias.data}
        />
      )}

      {
      visibility.isShowModalOpen && showCategoria && (
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

}


export default Index;