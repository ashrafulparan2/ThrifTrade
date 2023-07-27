import {
    PayPalButtons,
    PayPalButtonsComponentProps,
    SCRIPT_LOADING_STATE,
    usePayPalScriptReducer,
  } from "@paypal/react-paypal-js";
  import { useContext, useEffect } from "react";
  import { Button, Card, Col, ListGroup, Row } from "react-bootstrap";
  import { Helmet } from "react-helmet-async";
  import { Link, useParams } from "react-router-dom";
  import LoadingBox from "../components/LoadingBox.js";
  import MessageBox from "../components/MessageBox.js";
  import {
    useGetOrderDetailsQuery,
    useGetPaypalClientIdQuery,
    usePayOrderMutation,
  } from "../hooks/orderHooks.js";
  import { Store } from "../Store.js";
  import { ApiError } from "../types/ApiError.js";
  import { getError } from "../utils.js";
  import { toast } from "react-toastify";
  
  export default function MenOrderPage() {
    return(
   <div>
      </div>
    );
  }
  