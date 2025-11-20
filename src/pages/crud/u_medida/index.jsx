import React, { useState, useEffect } from "react";

//import { appRoutes } from "../../../routes/appRoutes";

// Componentes
//import AppNotification, { useFlash } from "./../../../components/html/notification";
import AppBreadcrumb        from "./../../../components/html/breadcrumb";
import AppBtnActions        from "./../../../components/html/btnActions";
import AppBtnInfoCount      from "./../../../components/html/btnInfoCount";
import AppBtnTableSetting   from "./../../../components/html/btnTableSetting";
//import AppPagination        from "./../../../components/html/pagination";
import AppThTableOrder      from "./../../../components/html/thTableOrder";
import AppBtnCreate         from "./../../../components/form/btncreate";
import AppBtnShowM          from "./../../../components/form/btnshow_m";
import AppBtnEdit           from "./../../../components/form/btnedit";
import AppBtnDelete         from "./../../../components/form/btndelete";
import AppBtnX              from "./../../../components/form/btnX";
import Checkbox             from './../../../components/form/check';
//import AppSearchIndex       from "./../../../components/form/search_index";
import ModalEdit            from "./edit";
import ModalShow            from "./show";
import ModalCreate          from "./create";
//import Layout               from "./../../../components/app/layout";
import useIndexTable        from "./../../../hook/useIndexTable";
import useModuleNames       from "./../../../hook/UseModuleName";
import useModalHandlers       from "./../../../hook/useModalHandlers";

import { appRoutes } from "../../../routes/appRoutes";
import { getUnidadesMedida, getUnidadMedida, createUnidadMedida, updateUnidadMedida, getColumns, getDefaultVisibility } from "../../../api/umedidas";

const Index = () => {
    const columns = getColumns();
    const defaultVisibility = getDefaultVisibility();

    const [data, setData] = useState([]);
    const [total, setTotal] = useState(0);
    const [showUnidadMedida, setShowUnidadMedida] = useState(null);
    const [editUnidadMedida, setEditUnidadMedida] = useState(null);

    const fetchUnidades = async () => {
      try {
        const json = await getUnidadesMedida();
        const total = json.data ?? json;

        setData(json.data ?? json); // soporta ambas estructuras
        setTotal(total.length); // ← AQUÍ guardas la cantidad de registros
      } catch (error) {
        console.error("Error al obtener unidades:", error);
      }
    };

    useEffect(() => {
      fetchUnidades();
    }, []);

    const currentFilters = {
      search: data.search,
      perPage: data.perPage,
      page: data.page,
      orderBy: data.orderBy,
      orderDir: data.orderDir
    };
    
    // Hooks factorizaos
    const { module, modules, Module, Modules } = useModuleNames("unidad de medida", "unidades de medida");

    const { visibility, handleToggle, setVisibility, handleFalse,
    checkedItems, handleToggleAll, handleToggleItem, handleSort, handleDate 
    } = useIndexTable({
        items: data,
        modules,
        //route,
        //filters,
        columns: columns,
        defaultVisibility: defaultVisibility  });
        
    const {handleEditClick, handleShowClick, handleEditSubmit, handleCreateClick, handleCreateSubmit, handleCloseModal} = useModalHandlers({Module, modules, currentFilters, handleFalse,
      fetchItem: getUnidadMedida,         // GET /umedidas/:id
      createItem: createUnidadMedida,     // POST /umedidas
      updateItem: updateUnidadMedida,     // PUT /umedidas/:id
      onSuccess: fetchUnidades
    });
    const inertValue = !visibility.isEditModalOpen ? "true" : undefined;

    return (
      <>
        <AppBreadcrumb
          title={Modules}
          sites={["Tablas",Modules]}
          links={["/tablas", appRoutes.u_medida]}
        />

        {//flash && <AppNotification type={flash.type} message={flash.message} />
        }

        <div className="div-uno">
          <div className="div-dos">
            <div className="div-tres">
              <div className="flex-1 flex items-center space-x-2 relative">
                <h5>
                  <p className="text-gray-500">Total de {modules}:</p>
                  <p className="dark:text-white"> {total} </p>
                </h5>
                <AppBtnInfoCount from="#000#" to="#000#" total={total}  />
              </div>
              <AppBtnTableSetting visibility={visibility} toggleColumn={handleToggle} columns={columns} />
            </div>

          {visibility.isCreateModalOpen && (
            <div className="flex w-full items-center align-middle">
              <ModalCreate onSuccess={() => {fetchUnidades();}} /> 
              <AppBtnX $route={modules+'.index'} handleClose={() => handleCreateClick(setVisibility)} />
            </div>
          )}

            <div className="div-cuatro">
              <div className="relative w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 shrink-0">
                <AppBtnCreate onCreate={() => handleCreateClick(setVisibility)} />
                <AppBtnActions modules={modules} checkedItems={checkedItems} currentFilters={currentFilters} endpoints={{ massDestroy: "/umedidas/massDestroy", truncate: "/umedidas/truncate" }} onSuccess={fetchUnidades}/>
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
                  {visibility.updated_at &&
                  <AppThTableOrder handleSort={() => handleSort('updated_at', currentFilters)}label="updated_at" />}
                  {visibility.created_at &&
                  <AppThTableOrder handleSort={() => handleSort('created_at', currentFilters)}label="created_at" />}
                  <th scope="col" className="p-4">ACTION </th>
                </tr>
              </thead>
              <tbody>
                {data.map((unidad) => ( 
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
                  {visibility.created_at &&
                  <td className="px-4 py-3 w-4">
                   {unidad.created_at}
                  </td>}
                  {visibility.updated_at &&
                  <td className="px-4 py-3 w-4">
                   {unidad.updated_at}
                  </td>}
                  <td className="px-4 py-3 w-48">
                    <div className="flex items-center space-x-4">
                      <AppBtnEdit   modulo={modules} id={unidad.id} onEdit={async () => {
                          const item = await handleEditClick(unidad.id, setVisibility);
                          setEditUnidadMedida(item);
                      }} />
                      <AppBtnShowM  modulo={modules} id={unidad.id} onShow={async () => {    await handleShowClick(unidad.id, setVisibility, setShowUnidadMedida);}}/>
                      <AppBtnDelete id={unidad.id} modulo="umedidas" currentFilters={currentFilters} onSuccess={() => fetchUnidades()} />
                    </div>
                  </td>
                </tr>
                ))}
              </tbody>
            </table>
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


export default Index;