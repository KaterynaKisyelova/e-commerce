import reducer from "../reducers/cart_reducer";
import { useEffect, useContext, useReducer, createContext } from "react";
import { SingleCartItem, SingleProduct } from "../utils/types";
import { CartActionTypes } from "../actions";

const getLocalStorage = () => {
  let cart = localStorage.getItem("cart");

  if (cart) {
    return JSON.parse(cart);
  }

  return [];
};

type InitialContext = {
  cart: SingleCartItem[];
  totalItems: number;
  totalAmount: number;
  shippingFee: number;
  addToCart: (
    id: string,
    color: string,
    amount: number,
    product: SingleProduct
  ) => void;
  removeItem: (id: string) => void;
  toggleAmount: (id: string, value: "inc" | "dec") => void;
  clearCart: () => void;
};

const initialContext = {
  cart: [],
  totalItems: 0,
  totalAmount: 0,
  shippingFee: 0,
  addToCart: (
    id: string,
    color: string,
    amount: number,
    product: SingleProduct
  ) => {},
  removeItem: (id: string) => {},
  toggleAmount: (id: string, value: "inc" | "dec") => {},
  clearCart: () => {},
};

type CartProviderProps = {
  children: React.ReactNode;
};

const initialState = {
  cart: getLocalStorage(),
  totalItems: 0,
  totalAmount: 0,
  shippingFee: 500,
};

const CartContext = createContext<InitialContext>(initialContext);

export const CartProvider = ({ children }: CartProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: CartActionTypes.COUNT_CART_TOTALS });
    localStorage.setItem("cart", JSON.stringify(state.cart));
  }, [state.cart]);

  const addToCart = (
    id: string,
    color: string,
    amount: number,
    product: SingleProduct
  ) => {
    dispatch({
      type: CartActionTypes.ADD_TO_CART,
      payload: { id, color, amount, product },
    });
  };

  const removeItem = (id: string) => {
    dispatch({ type: CartActionTypes.REMOVE_CART_ITEM, payload: { id } });
  };

  const toggleAmount = (id: string, value: "inc" | "dec") => {
    dispatch({
      type: CartActionTypes.TOGGLE_CART_ITEM_AMOUNT,
      payload: { id, value },
    });
  };

  const clearCart = () => {
    dispatch({ type: CartActionTypes.CLEAR_CART });
  };

  return (
    <CartContext.Provider
      value={{ ...state, addToCart, removeItem, toggleAmount, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  return useContext(CartContext);
};
