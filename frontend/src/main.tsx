import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'
import App from './App.js'
import './index.css'

import { HelmetProvider } from 'react-helmet-async'
import './index.css'
import HomePage from './pages/HomePage'
import ProductPage from './pages/ProductPage'
import Login from './pages/Login'
import Buy from './pages/buyFolder/Buy.js'
import Sell from './pages/sellFolder/Sell.js'
import About from './pages/AboutUs.js'

import axios from 'axios'

axios.defaults.baseURL =
  process.env.NODE_ENV === 'development' ? 'http://localhost:4000' : '/'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} element={<HomePage />} />
      <Route path="product/:slug" element={<ProductPage />} />
      <Route path="login" element={<Login />} />
      <Route path="buy" element={<Buy />} />
      <Route path="sell" element={<Sell />} />
      <Route path="about_us" element={<About />} />
      {/* <Route path="dashboard" element={<Dashboard />} /> */}
      {/* ... etc. */}
    </Route>
  )
)
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  </React.StrictMode>
)
