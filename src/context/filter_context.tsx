import reducer from "../reducers/filter_reducer";
import { useEffect, useContext, useReducer, createContext } from "react";
import { FilterActionTypes } from "../actions";
import { useProductsContext } from "./products_context";
import { Product } from "../utils/types";

type InitialContext = {
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
  setGridView: () => void;
  setListView: () => void;
  updateSort: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  updateFilters: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.MouseEvent<HTMLButtonElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => void;
  clearFilters: () => void;
};

const initialContext = {
  filteredProducts: [],
  allProducts: [],
  gridView: false,
  sort: "",
  filters: {
    text: "",
    company: "all",
    category: "all",
    color: "all",
    minPrice: 0,
    maxPrice: 0,
    price: 0,
    shipping: false,
  },
  setGridView: () => {},
  setListView: () => {},
  updateSort: (e: React.ChangeEvent<HTMLSelectElement>) => {},
  updateFilters: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.MouseEvent<HTMLButtonElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {},
  clearFilters: () => {},
};

type FilterProviderProps = {
  children: React.ReactNode;
};

const initialState = {
  filteredProducts: [],
  allProducts: [],
  gridView: false,
  sort: "price-lowest",
  filters: {
    text: "",
    company: "all",
    category: "all",
    color: "all",
    minPrice: 0,
    maxPrice: 0,
    price: 0,
    shipping: false,
  },
};

const FilterContext = createContext<InitialContext>(initialContext);

export const FilterProvider = ({ children }: FilterProviderProps) => {
  const { products } = useProductsContext();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: FilterActionTypes.LOAD_PRODUCTS, payload: products });
  }, [products]);

  useEffect(() => {
    dispatch({ type: FilterActionTypes.FILTER_PRODUCTS });
    dispatch({ type: FilterActionTypes.SORT_PRODUCTS });
  }, [products, state.sort, state.filters]);

  const setGridView = () => {
    dispatch({ type: FilterActionTypes.SET_GRID_VIEW });
  };

  const setListView = () => {
    dispatch({ type: FilterActionTypes.SET_LIST_VIEW });
  };

  const updateSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;

    dispatch({ type: FilterActionTypes.UPDATE_SORT, payload: { value } });
  };

  const updateFilters = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.MouseEvent<HTMLButtonElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    if (
      !(e.target instanceof HTMLInputElement) &&
      !(e.target instanceof HTMLButtonElement) &&
      !(e.target instanceof HTMLSelectElement)
    ) {
      return;
    }

    const name = e.target.name;
    let value: string | boolean | number = e.target.value ?? "";

    if (name === "category") {
      value = e.target.textContent ?? "";
    }
    if (name === "color") {
      value = e.target.dataset.color ?? "";
    }
    if (name === "price") {
      value = Number(value);
    }
    if (name === "shipping" && e.target instanceof HTMLInputElement) {
      value = e.target.checked;
    }

    dispatch({
      type: FilterActionTypes.UPDATE_FILTERS,
      payload: { name, value },
    });
  };

  const clearFilters = () => {
    dispatch({ type: FilterActionTypes.CLEAR_FILTERS });
  };

  return (
    <FilterContext.Provider
      value={{
        ...state,
        setGridView,
        setListView,
        updateSort,
        updateFilters,
        clearFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = () => {
  return useContext(FilterContext);
};
