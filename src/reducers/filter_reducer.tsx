import { FilterActionTypes } from "../actions";
import { Product } from "../utils/types";

type FilterState = {
  filteredProducts: Product[];
  allProducts: Product[];
  gridView: boolean;
  sort: string;
  filters: {
    text: string;
    company: string;
    category: string;
    color: string;
    minPrice: number;
    maxPrice: number;
    price: number;
    shipping: boolean;
  };
};

function isProductsArray(
  payload: Product[] | undefined | UpdateFiltersPayload | SortPayload
): payload is Product[] {
  return Array.isArray(payload as Product[]);
}

function isUpdateFiltersPayload(
  payload: Product[] | undefined | UpdateFiltersPayload | SortPayload
): payload is UpdateFiltersPayload {
  return (payload as UpdateFiltersPayload).name !== undefined;
}

function isSortPayload(
  payload: Product[] | undefined | UpdateFiltersPayload | SortPayload
): payload is SortPayload {
  return (payload as SortPayload).value !== undefined;
}

type UpdateFiltersPayload = {
  name: string;
  value: string | number | boolean;
};

type SortPayload = { value: string };

type FilterAction = {
  type: FilterActionTypes;
  payload?: Product[] | UpdateFiltersPayload | SortPayload;
};

const filter_reducer = (
  state: FilterState,
  { type, payload }: FilterAction
): FilterState => {
  switch (type) {
    case FilterActionTypes.LOAD_PRODUCTS:
      if (!isProductsArray(payload)) {
        return { ...state };
      }

      const maxPrice = Math.max(...payload.map((product) => product.price));

      return {
        ...state,
        allProducts: [...payload],
        filteredProducts: [...payload],
        filters: { ...state.filters, maxPrice, price: maxPrice },
      };
    case FilterActionTypes.SET_GRID_VIEW:
      return { ...state, gridView: true };
    case FilterActionTypes.SET_LIST_VIEW:
      return { ...state, gridView: false };
    case FilterActionTypes.UPDATE_SORT:
      if (!isSortPayload(payload)) {
        return { ...state };
      }

      return { ...state, sort: payload.value };
    case FilterActionTypes.SORT_PRODUCTS:
      const { sort, filteredProducts } = state;
      let tempProducts = [...filteredProducts];

      if (sort === "price-lowest") {
        tempProducts = tempProducts.sort((a, b) => a.price - b.price);
      }
      if (sort === "price-highest") {
        tempProducts = tempProducts.sort((a, b) => b.price - a.price);
      }
      if (sort === "name-a") {
        tempProducts = tempProducts.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
      }
      if (sort === "name-z") {
        tempProducts = tempProducts.sort((a, b) =>
          b.name.localeCompare(a.name)
        );
      }

      return { ...state, filteredProducts: tempProducts };
    case FilterActionTypes.UPDATE_FILTERS:
      if (!isUpdateFiltersPayload(payload)) {
        return { ...state };
      }

      const { name, value } = payload;

      return { ...state, filters: { ...state.filters, [name]: value } };
    case FilterActionTypes.FILTER_PRODUCTS:
      const { text, category, company, color, price, shipping } = state.filters;
      let filtered = [...state.allProducts];

      if (text) {
        filtered = filtered.filter((product) =>
          product.name.toLowerCase().startsWith(text)
        );
      }
      if (category !== "all") {
        filtered = filtered.filter((product) => product.category === category);
      }
      if (company !== "all") {
        filtered = filtered.filter((product) => product.company === company);
      }
      if (color !== "all") {
        filtered = filtered.filter((product) =>
          product.colors.find((c) => c === color)
        );
      }
      if (price) {
        filtered = filtered.filter((product) => product.price <= price);
      }
      if (shipping) {
        filtered = filtered.filter((product) => product.shipping === true);
      }

      return { ...state, filteredProducts: filtered };
    case FilterActionTypes.CLEAR_FILTERS:
      return {
        ...state,
        filters: {
          ...state.filters,
          text: "",
          company: "all",
          category: "all",
          color: "all",
          price: state.filters.maxPrice,
          shipping: false,
        },
      };
    default:
      return { ...state };
  }
};

export default filter_reducer;
