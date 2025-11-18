//import { useEffect } from "react";

//import { appRoutes } from "../../../routes/appRoutes";

// Componentes
//import AppNotification, { useFlash } from "./../../../components/html/notification";
import AppBreadcrumb        from "./../../../components/html/breadcrumb";
//import AppBtnActions        from "./../../../components/html/btnActions";
import AppBtnInfoCount      from "./../../../components/html/btnInfoCount";
import AppBtnTableSetting   from "./../../../components/html/btnTableSetting";
//import AppPagination        from "./../../../components/html/pagination";
//import AppThTableOrder      from "./../../../components/html/thTableOrder";
import AppBtnCreate         from "./../../../components/form/btncreate";
//import AppBtnShowM          from "./../../../components/form/btnshow_m";
//import AppBtnEdit           from "./../../../components/form/btnedit";
//import AppBtnDelete         from "./../../../components/form/btndelete";
import AppBtnX              from "./../../../components/form/btnX";
import Checkbox             from './../../../components/form/check';
//import AppSearchIndex       from "./../../../components/form/search_index";
//import ModalEdit            from "./edit";
//import ModalShow            from "./show";
//import ModalCreate          from "./create";
//import Layout               from "./../../../components/app/layout";
import useIndexTable        from "./../../../hook/useIndexTable";
import useModuleNames       from "./../../../hook/UseModuleName";
import useModalHandlers       from "./../../../hook/useModalHandlers";

import { appRoutes } from "../../../routes/appRoutes";

const Index = () => {
////////////// Esta parte debería venir del backend o de una configuración global /////////////

    const getColumns = () => [
        { key: 'id',         label: 'ID' },
        { key: 'nombre',       label: 'Nombre' },
        { key: 'abreviado',  label: 'Abreviado' },
        { key: 'updated_at', label: 'Actualizado' },
        { key: 'created_at', label: 'Creado' },
    ];
    const columns = getColumns();

    const getDefaultVisibility = () => ({
        id: false,
        nombre: true,
        abreviado: false,
        updated_at: false,
        created_at: false,
    });
    const defaultVisibility = getDefaultVisibility();
///////////////////////////

    //const route = appRoutes();
    
    // Hooks factorizaos
    const { module, modules, Module, Modules } = useModuleNames("unidad de medida", "unidades de medida");

    const { visibility, handleToggle, setVisibility, handleFalse,
    checkedItems, handleToggleAll, handleToggleItem, handleSort, handleDate 
    } = useIndexTable({
        items: ["Kg"], //unidades_de_medida.data,
        modules,
        //route,
        //filters,
        columns: columns,
        defaultVisibility: defaultVisibility  });

    const {handleCreateClick} = useModalHandlers(Module, modules, handleFalse);

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
                  <p className="dark:text-white"> #000# </p>
                </h5>
                <AppBtnInfoCount from="#000#" to="#000#" total="#000#"  />
              </div>
              <AppBtnTableSetting visibility={visibility} toggleColumn={handleToggle} columns={columns} />
            </div>

          {visibility.isCreateModalOpen && (
            <div className="flex w-full items-center align-middle">
              {/* <ModalCreate onSuccess={() => {fetchUnidades();}} /> */}
              <AppBtnX $route={modules+'.index'} handleClose={() => handleCreateClick(setVisibility)} />
            </div>
          )}

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
                  { /* Aqui falta crear el currentFilters antes de continuar
                  visibility.id &&
                  <AppThTableOrder handleSort={() => handleSort('id', currentFilters)} label="ID" />}
                  {visibility.nombre &&
                  <AppThTableOrder handleSort={() => handleSort('nombre', currentFilters)} label="NOMBRE" />}
                  {visibility.abreviado &&
                  <AppThTableOrder handleSort={() => handleSort('abreviado', currentFilters)} label="ABREVIADO" />}
                  {visibility.updated_at &&
                  <AppThTableOrder handleSort={() => handleSort('updated_at', currentFilters)}label="updated_at" />}
                  {visibility.created_at &&
                  <AppThTableOrder handleSort={() => handleSort('created_at', currentFilters)}label="created_at" /> */}
                  <th scope="col" className="p-4">ACTION </th>
                </tr>
              </thead>
              <tbody>
                {/*u_medida.data.map((unidades) => ( */}
                <tr className="tbody-tr border-b dark:border-gray-700" key={1}> {/* unidades.id */}
                  <td className="px-4 py-3 w-4">
                    { /* Este era antes
                    <Checkbox id={"chk_"+tabla.id} name={"chk_"+tabla.id} className="chk-td" checked={checkedItems[tabla.id] || false} onChange={() => handleToggleItem(tabla.id)} />
                    */}
                    <Checkbox id={"chk_1"} name={"chk_1" /*+tabla.id*/} className="chk-td" checked={false} onChange={() => handleToggleItem(1)} />
                  </td>
                  <td className="px-4 py-3 w-48">
                    <div className="flex items-center space-x-4">
                      {/* Aqui remplazar el 1 por tabla.id 
                      <AppBtnEdit   modulo={modules} id={tabla.id} onEdit={() => handleEditClick(tabla.id, setVisibility)} />
                      <AppBtnShowM  modulo={modules} id={tabla.id} onShow={() => handleShowClick(tabla.id, setVisibility) }/>
                      <AppBtnDelete modulo={modules} id={tabla.id} currentFilters={currentFilters} /> */}
                    </div>
                  </td>
                </tr>
                {/*))*/}
              </tbody>
            </table>
          </div>
          
          </div>
        </div>
      </>
    );

}


export default Index;