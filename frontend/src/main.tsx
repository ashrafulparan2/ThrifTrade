import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import App from "./App.js";
import "./index.css";

import { HelmetProvider } from "react-helmet-async";
import "./index.css";
import HomePage from "./pages/HomePage.js";
import ProductPage from "./pages/ProductPage.js";
// import Login from "./pages/Login.js";
// import Buy from "./pages/buyFolder/Buy.js";
// import About from "./pages/AboutUs.js";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { StoreProvider } from "./Store.js";
import CartPage from "./pages/CartPage.js";
import Sell from "./pages/Sell.js";
import SigninPage from "./pages/SignInPage.js";
import SignupPage from './pages/SignupPage.js'
import ShippingAddressPage from "./pages/ShippingAddressPage.js";
import PaymentMethodPage from "./pages/PaymentMethodPage.js";
import ProtectedRoute from "./components/ProtectedRoute.js";
import PlaceOrderPage from './pages/PlaceOrderPage.js'
import OrderPage from './pages/OrderPage.js'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import OrderHistoryPage from './pages/OrderHistoryPage.js'
import Auction from "./pages/Auction.js";
// import {CartPage} from './pages/CartPage.js';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} element={<HomePage />} />
      <Route path="product/:slug" element={<ProductPage />} />
      <Route path="/signin" element={<SigninPage />} />
      <Route path="signup" element={<SignupPage />} />
      <Route path="cart" element={<CartPage />} />
      {/* <Route path="buy" element={<Buy />} /> */}
      <Route path="sell" element={<Sell />} />
      <Route path="" element={<ProtectedRoute />}>
        <Route path="shipping" element={<ShippingAddressPage />} />
        <Route path="payment" element={<PaymentMethodPage />} />
        <Route path="placeorder" element={<PlaceOrderPage />} />
        <Route path="/order/:id" element={<OrderPage />} />
      <Route path="/orderhistory" element={<OrderHistoryPage />} />
      <Route path="/auction" element={<Auction />} />

      </Route>
      
      {/* <Route path="about_us" element={<About />} /> */}
      {/* <Route path="dashboard" element={<Dashboard />} /> */}
      {/* ... etc. */}
    </Route>
  )
);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
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
);
