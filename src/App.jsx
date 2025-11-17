import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import Layout from './layouts/Layout'

function App() {
  const [count, setCount] = useState(0)
  const appName = import.meta.env.VITE_APP_NAME || 'App'

  return (
    <>
      <Layout />
    </>
  )
}

export default App
