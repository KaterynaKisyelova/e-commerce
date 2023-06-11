import { ProductsActionTypes } from "../actions";
import { Product, SingleProduct } from "../utils/types";

type ProductsState = {
  isSidebarOpen: boolean;
  productsLoading: boolean;
  productsError: boolean;
  products: Product[];
  featuredProducts: Product[];
  singleProductLoading: boolean;
  singleProductError: boolean;
  singleProduct: SingleProduct;
};

type ProductsAction = {
  type: ProductsActionTypes;
  payload?: Product[] | SingleProduct;
};

function isProductsSuccessPayload(
  payload: Product[] | SingleProduct | undefined
): payload is Product[] {
  return Array.isArray(payload as Product[]);
}

function isSingleProductPayload(
  payload: Product[] | SingleProduct | undefined
): payload is SingleProduct {
  return (payload as SingleProduct).id !== undefined;
}

const products_reducer = (
  state: ProductsState,
  { type, payload }: ProductsAction
): ProductsState => {
  switch (type) {
    case ProductsActionTypes.SIDEBAR_OPEN:
      return { ...state, isSidebarOpen: true };
    case ProductsActionTypes.SIDEBAR_CLOSE:
      return { ...state, isSidebarOpen: false };
    case ProductsActionTypes.GET_PRODUCTS_BEGIN:
      return { ...state, productsLoading: true };
    case ProductsActionTypes.GET_PRODUCTS_SUCCESS:
      if (!isProductsSuccessPayload(payload)) {
        return { ...state };
      }

      const featuredProducts = payload.filter(
        (product) => product.featured === true
      );
      return {
        ...state,
        featuredProducts,
        productsLoading: false,
        products: payload,
      };
    case ProductsActionTypes.GET_PRODUCTS_ERROR:
      return { ...state, productsLoading: false, productsError: true };
    case ProductsActionTypes.GET_SINGLE_PRODUCT_BEGIN:
      return {
        ...state,
        singleProductLoading: true,
        singleProductError: false,
      };
    case ProductsActionTypes.GET_SINGLE_PRODUCT_SUCCESS:
      if (!isSingleProductPayload(payload)) {
        return { ...state };
      }
      return {
        ...state,
        singleProductLoading: false,
        singleProduct: payload,
      };
    case ProductsActionTypes.GET_SINGLE_PRODUCT_ERROR:
      return {
        ...state,
        singleProductLoading: false,
        singleProductError: true,
      };
    default:
      return { ...state };
  }
};

export default products_reducer;
