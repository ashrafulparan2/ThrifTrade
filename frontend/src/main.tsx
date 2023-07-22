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
import Buy from './pages/buyFolder/Buy.js'
import HomePage from './pages/HomePage.js'
import ProductPage from './pages/ProductPage.js'

import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import ProtectedRoute from './components/ProtectedRoute.js'
import Auction from './pages/Auction.js'
import CartPage from './pages/CartPage.js'
import OrderHistoryPage from './pages/OrderHistoryPage.js'
import OrderPage from './pages/OrderPage.js'
import PaymentMethodPage from './pages/PaymentMethodPage.js'
import PlaceOrderPage from './pages/PlaceOrderPage.js'
import Sell from './pages/Sell.js'
import ShippingAddressPage from './pages/ShippingAddressPage.js'
import SignupPage from './pages/SignupPage.js'
import { StoreProvider } from './Store.js'

import AboutUs from './pages/AboutUs.js'
import AddBid from './pages/AddBid.js'
import Airbuds from './pages/Airbuds.js'
import BiddingPage from './pages/BiddingPage.js'
import Laptop from './pages/Laptop.js'
import OfferPage from './pages/OfferPage.js'
import Phone from './pages/Phone.js'
import Price from './pages/Price.js'
import PriceUp from './pages/PriceUp.js'
import ProfilePage from './pages/ProfilePage.js'
import SigninPage from './pages/SigninPage.js'
import Watch from './pages/Watch.js'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} element={<HomePage />} />
      <Route path="product/:slug" element={<ProductPage />} />
      <Route path="/signin" element={<SigninPage />} />
      <Route path="signup" element={<SignupPage />} />
      <Route path="cart" element={<CartPage />} />
      <Route path="buy" element={<Buy />} />
      <Route path="phone" element={<Phone />} />
      <Route path="laptop" element={<Laptop />} />
      <Route path="watch" element={<Watch />} />
      <Route path="airbuds" element={<Airbuds />} />
      <Route path="sell" element={<Sell />} />

      <Route path="" element={<ProtectedRoute />}>
        <Route path="/addbid" element={<AddBid />} />
        <Route path="shipping" element={<ShippingAddressPage />} />
        <Route path="payment" element={<PaymentMethodPage />} />
        <Route path="placeorder" element={<PlaceOrderPage />} />
        <Route path="/order/:id" element={<OrderPage />} />
        <Route path="/orderhistory" element={<OrderHistoryPage />} />

        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/auction" element={<Auction />} />
        <Route path="/price" element={<Price />} />
        <Route path="/priceup" element={<PriceUp />} />

        <Route path="/auction/:slug" element={<BiddingPage />} />
        <Route path="/offers" element={<OfferPage />} />
      </Route>

      <Route path="about_us" element={<AboutUs />} />
      {/* <Route path="dashboard" element={<Dashboard />} /> */}
      {/* ... etc. */}
    </Route>
  )
)

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <StoreProvider>
      <PayPalScriptProvider options={{ 'client-id': 'sb' }} deferLoading={true}>
        <HelmetProvider>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </HelmetProvider>
      </PayPalScriptProvider>
    </StoreProvider>
  </React.StrictMode>
)
