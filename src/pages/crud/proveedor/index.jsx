import React, { useState, useEffect } from "react";

//import { appRoutes } from "../../../routes/appRoutes";

// Componentes
import AppBreadcrumb        from "./../../../components/html/breadcrumb";
import AppBtnActions        from "./../../../components/html/btnActions";
import AppBtnInfoCount      from "./../../../components/html/btnInfoCount";
import AppBtnTableSetting   from "./../../../components/html/btnTableSetting";
import AppThTableOrder      from "./../../../components/html/thTableOrder";
import AppBtnCreate         from "./../../../components/form/btncreate";
import AppBtnShowM          from "./../../../components/form/btnshow_m";
import AppBtnEdit           from "./../../../components/form/btnedit";
import AppBtnDelete         from "./../../../components/form/btndelete";
import AppBtnX              from "./../../../components/form/btnX";
import Checkbox             from './../../../components/form/check';
import ModalEdit            from "./edit";
import ModalShow            from "./show";
import ModalCreate          from "./create";
import useIndexTable        from "./../../../hook/useIndexTable";
import useModuleNames       from "./../../../hook/UseModuleName";
import useModalHandlers       from "./../../../hook/useModalHandlers";
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
  const [proveedores, setProveedores] = useState({
    data: [],
    total: 0,
    from: 0,
    to: 0,
    links: [],
    filters: { search: '', perPage: 10, page: 1, orderBy: 'id', orderDir: 'asc' },
    columns: getColumns(),
    defaultVisibility: getDefaultVisibility()
  });

  const fetchProveedores = async (filters = {}) => {
    try {
      const newFilters = { ...proveedores.filters, ...filters };
      const json = await getProveedores(newFilters);
      setProveedores({...json, filters: newFilters});

    } catch (error) {
      console.error("Error al obtener proveedores:", error);
    }
  };

  useEffect(() => {
    fetchProveedores();
  }, []);

  async function handEdit(id) {
    const item = await handleEditClick(id, setVisibility);
    setEditProveedor(item); }

  async function handShow(id) {
    const item = await handleShowClick(id, setVisibility, setShowProveedor); }

  const currentFilters = {
    search: proveedores.filters.search,
    perPage: proveedores.filters.perPage,
    page: proveedores.filters.page,
    orderBy: proveedores.filters.orderBy,
    orderDir: proveedores.filters.orderDir
  };
    
  // Hooks factorizaos
  const { module, modules, Module, Modules } = useModuleNames("proveedor", "proveedores");
  const { visibility, handleToggle, setVisibility, handleFalse,
  checkedItems, handleToggleAll, handleToggleItem, handleSort, handleDate 
  } = useIndexTable({
      items: proveedores.data,
      modules,
      //route,
      //filters,
      columns: columns,
      defaultVisibility: defaultVisibility  });
       
  const {handleEditClick, handleShowClick, handleEditSubmit, handleCreateClick, handleCreateSubmit, handleCloseModal} = useModalHandlers({Module, modules, currentFilters, handleFalse, notify,
    fetchItem: getProveedor,         // GET /proveedores/:id
    createItem: createProveedor,     // POST /proveedores
    updateItem: updateProveedor,     // PUT /proveedores/:id
    onSuccess: fetchProveedores
  });
  const inertValue = !visibility.isEditModalOpen ? "true" : undefined;

  return (
    <>
      <AppBreadcrumb
        title={Modules}
        sites={["Tablas",Modules]}
        links={["/tablas", appRoutes.proveedor]}
      />

      {flash && <AppNotification type={flash.type} message={flash.message} />
    }

        <div className="div-uno">
          <div className="div-dos">
            <div className="div-tres">
              <div className="flex-1 flex items-center space-x-2 relative">
                <h5>
                  <p className="text-gray-500">Total de {modules}:</p>
                  <p className="dark:text-white"> {proveedores.total} </p>
                </h5>
                <AppBtnInfoCount from={proveedores.from} to={proveedores.to} total={proveedores.total}  />
              </div>
              <AppBtnTableSetting visibility={visibility} toggleColumn={handleToggle} columns={columns} />
            </div>

          {visibility.isCreateModalOpen && (
            <div className="flex w-full items-center align-middle">
              <ModalCreate onSuccess={handleCreateSubmit} title={Module} handleClose={() => handleCreateClick(setVisibility)} modules={modules}/>
            </div>
          )}

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
                      <input id="checkbox-all" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" checked={visibility.chkTable} onChange={handleToggleAll} />
                      <label htmlFor="checkbox-all" className="sr-only">checkbox</label>
                    </div>
                  </th>
                  {visibility.id &&
                  <AppThTableOrder handleSort={() => handleSort('id', currentFilters)} label="ID" />}
                  {visibility.codigo &&
                  <AppThTableOrder handleSort={() => handleSort('codigo', currentFilters)} label="CODIGO" />}
                  {visibility.nombre &&
                  <AppThTableOrder handleSort={() => handleSort('nombre', currentFilters)} label="NOMBRE" />}
                  {visibility.referencia &&
                  <AppThTableOrder handleSort={() => handleSort('referencia', currentFilters)} label="REFERENCIA" />}
                  {visibility.descripcion &&
                  <AppThTableOrder handleSort={() => handleSort('descripcion', currentFilters)} label="DESCRIPCIÓN" />}
                  {visibility.plazo &&
                  <AppThTableOrder handleSort={() => handleSort('plazo', currentFilters)} label="PLAZO" />}
                  {visibility.updated_at &&
                  <AppThTableOrder handleSort={() => handleSort('updated_at', currentFilters)}label="updated_at" />}
                  {visibility.created_at &&
                  <AppThTableOrder handleSort={() => handleSort('created_at', currentFilters)}label="created_at" />}
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
                  {visibility.created_at &&
                  <td className="px-4 py-3 w-4">
                   {proveedor.created_at}
                  </td>}
                  {visibility.updated_at &&
                  <td className="px-4 py-3 w-4">
                   {proveedor.updated_at}
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

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4" aria-label="Table navigation">
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
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
        
        {visibility.isEditModalOpen && editProveedor && (
        <ModalEdit
          title={Module}
          modules={modules}
          handleClose={() => {
            handleCloseModal();
            setEditProveedor(null);
          }}
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


export default Index;