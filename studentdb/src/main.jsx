import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import Login from './Login.jsx'
import Form from './Form.jsx'

const router = createBrowserRouter([
  {
    path:"/",
    element:<Login/>
  },
  {
    path:"/form",
    element:<Form/>
  }
])

createRoot(document.getElementById('root')).render(
<StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)


