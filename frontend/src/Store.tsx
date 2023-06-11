import React from "react";
import { Cart, CartItem } from "./types/Cart.js";
// Define the AppState type
type AppState = {
  mode: string;
  cart: Cart;
};

// Define the initial state
const initialState: AppState = {
  mode: localStorage.getItem("mode")
    ? localStorage.getItem("mode")!
    : window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light",
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems")!)
      : [],
    shippingAddress: localStorage.getItem("shippingAddress")
      ? JSON.parse(localStorage.getItem("shippingAddress")!)
      : {},
    paymentMethod: localStorage.getItem("paymentMethod")
      ? localStorage.getItem("paymentMethod")!
      : "PayPal",
    itemsPrice: 0,
    shippingPrice: 0,
    taxPrice: 0,
    totalPrice: 0,
  },
};

// Define the supported actions
type Action =
  | { type: "SWITCH_MODE" }
  | { type: "CART_ADD_ITEM"; payload: CartItem }
  | { type: 'CART_REMOVE_ITEM'; payload: CartItem }
  | { type: "UPDATE_SHIPPING_ADDRESS"; payload: Cart["shippingAddress"] };

// Define the reducer function
function reducer(state: AppState, action: Action): AppState {
  console.log("reducer", action);
  switch (action.type) {
    case "SWITCH_MODE": {
      const mode = state.mode === "dark" ? "light" : "dark";
      localStorage.setItem("mode", mode);
      return { ...state, mode };
    }
    case "CART_ADD_ITEM": {
      const newItem = action.payload;
      console.log("newItem", newItem);
      const existItem = state.cart.cartItems.find(
        (item: CartItem) => item._id === newItem._id
      );
      const cartItems = existItem
        ? state.cart.cartItems.map((item: CartItem) =>
            item._id === existItem._id ? newItem : item
          )
        : [...state.cart.cartItems, newItem];

      localStorage.setItem("cartItems", JSON.stringify(cartItems));

      return { ...state, cart: { ...state.cart, cartItems } };
    }
    case 'CART_REMOVE_ITEM': {
      const cartItems = state.cart.cartItems.filter(
        (item: CartItem) => item._id !== action.payload._id
      )
      localStorage.setItem('cartItems', JSON.stringify(cartItems))
      return { ...state, cart: { ...state.cart, cartItems } }
    }

    case "UPDATE_SHIPPING_ADDRESS": {
      const shippingAddress = action.payload;

      localStorage.setItem("shippingAddress", JSON.stringify(shippingAddress));

      return {
        ...state,
        cart: { ...state.cart, shippingAddress },
      }
      }
    default:
      return state;
  }
}

// Create the default dispatch function
const defaultDispatch: React.Dispatch<Action> = () => initialState;

// Create the Store context
const Store = React.createContext({
  state: initialState,
  dispatch: defaultDispatch,
});

// Create the StoreProvider component
function StoreProvider(props: React.PropsWithChildren<{}>) {
  const [state, dispatch] = React.useReducer<React.Reducer<AppState, Action>>(
    reducer,
    initialState
  );

  return <Store.Provider value={{ state, dispatch }} {...props} />;
}

// Export the Store and StoreProvider
export { Store, StoreProvider };
