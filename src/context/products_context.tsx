import axios from "axios";
import reducer from "../reducers/products_reducer";
import { createContext, useContext, useEffect, useReducer } from "react";
import { products_url as url } from "../utils/constants";
import { ProductsActionTypes } from "../actions";
import { Product, SingleProduct } from "../utils/types";

type ProductsProviderProps = {
  children: React.ReactNode;
};

type InitialContext = {
  isSidebarOpen: boolean;
  productsLoading: boolean;
  productsError: boolean;
  products: Product[];
  featuredProducts: Product[];
  singleProductLoading: boolean;
  singleProductError: boolean;
  singleProduct: SingleProduct;
  openSidebar: () => void;
  closeSidebar: () => void;
  fetchSingleProduct: (url: string) => void;
};

const initialContext = {
  isSidebarOpen: false,
  productsLoading: false,
  productsError: false,
  products: [],
  featuredProducts: [],
  singleProductLoading: false,
  singleProductError: false,
  singleProduct: {
    category: "",
    colors: [],
    company: "",
    description: "",
    featured: false,
    id: "",
    images: [],
    name: "",
    price: 0,
    stock: 0,
    stars: 0,
    reviews: 0,
  },
  openSidebar: () => {},
  closeSidebar: () => {},
  fetchSingleProduct: (url: string) => {},
};

const initialState = {
  isSidebarOpen: false,
  productsLoading: false,
  productsError: false,
  products: [],
  featuredProducts: [],
  singleProductLoading: false,
  singleProductError: false,
  singleProduct: {
    category: "",
    colors: [],
    company: "",
    description: "",
    featured: false,
    id: "",
    images: [],
    name: "",
    price: 0,
    shipping: false,
    stock: 0,
    stars: 0,
    reviews: 0,
  },
};

const ProductsContext = createContext<InitialContext>(initialContext);

export const ProductsProvider = ({ children }: ProductsProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const openSidebar = () =>
    dispatch({ type: ProductsActionTypes.SIDEBAR_OPEN });
  const closeSidebar = () =>
    dispatch({ type: ProductsActionTypes.SIDEBAR_CLOSE });

  const fetchProducts = async (url: string) => {
    dispatch({ type: ProductsActionTypes.GET_PRODUCTS_BEGIN });
    try {
      const response = await axios.get(url);
      const products = response.data;

      dispatch({
        type: ProductsActionTypes.GET_PRODUCTS_SUCCESS,
        payload: products,
      });
    } catch (err) {
      dispatch({ type: ProductsActionTypes.GET_PRODUCTS_ERROR });
    }
  };

  const fetchSingleProduct = async (url: string) => {
    dispatch({ type: ProductsActionTypes.GET_SINGLE_PRODUCT_BEGIN });
    try {
      const response = await axios.get(url);
      const singleProduct = response.data;
      console.log(singleProduct);
      dispatch({
        type: ProductsActionTypes.GET_SINGLE_PRODUCT_SUCCESS,
        payload: singleProduct,
      });
    } catch (err) {
      dispatch({ type: ProductsActionTypes.GET_SINGLE_PRODUCT_ERROR });
    }
  };

  useEffect(() => {
    fetchProducts(url);
  }, []);

  return (
    <ProductsContext.Provider
      value={{ ...state, openSidebar, closeSidebar, fetchSingleProduct }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProductsContext = () => {
  return useContext(ProductsContext);
};
