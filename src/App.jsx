// src/App.jsx
import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Layout from   './components/app/layout'
import Error404 from   './components/app/404'
import Index from    './pages/home/index'
import Marca from    './pages/crud/marca/index'
import Categoria from    './pages/crud/categoria/index'
import Proveedor from    './pages/crud/proveedor/index'
import Presentacion from './pages/crud/presentacion/index'
import U_Medida from './pages/crud/u_medida/index'
import viteLogo from '/vite.svg'

function App() {
  const [count, setCount] = useState(0)
  const appName = import.meta.env.VITE_APP_NAME || 'App'
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path='/' element={<Index></Index>}></Route>
              <Route path='/tablas/unidad_medidas' element={<U_Medida></U_Medida>}></Route>
              <Route path='/tablas/marcas' element={<Marca></Marca>}></Route>
              <Route path='/tablas/presentaciones' element={<Presentacion></Presentacion>}></Route>
              <Route path='/tablas/categorias' element={<Categoria></Categoria>}></Route>
              <Route path='/tablas/proveedores' element={<Proveedor></Proveedor>}></Route>
              <Route path='*' element={<Error404></Error404>}></Route>
            </Routes>
          </Layout>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
