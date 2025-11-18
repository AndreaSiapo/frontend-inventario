import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Layout from './components/app/layout'
import Index from './pages/home/index'
import U_Medida from './pages/crud/u_medida/index'
import reactLogo from './assets/react.svg'
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
            </Routes>
          </Layout>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
