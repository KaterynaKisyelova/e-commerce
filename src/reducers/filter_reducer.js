import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";

const filter_reducer = (state, { type, payload }) => {
  switch (type) {
    case LOAD_PRODUCTS:
      const maxPrice = Math.max(...payload.map((product) => product.price));

      return {
        ...state,
        allProducts: [...payload],
        filteredProducts: [...payload],
        filters: { ...state.filters, maxPrice, price: maxPrice },
      };
    case SET_GRIDVIEW:
      return { ...state, gridView: true };
    case SET_LISTVIEW:
      return { ...state, gridView: false };
    case UPDATE_SORT:
      return { ...state, sort: payload };
    case SORT_PRODUCTS:
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
    case UPDATE_FILTERS:
      const { name, value } = payload;

      return { ...state, filters: { ...state.filters, [name]: value } };
    case FILTER_PRODUCTS:
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
    case CLEAR_FILTERS:
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
      throw new Error(`No Matching "${type}" - action type`);
  }
};

export default filter_reducer;
