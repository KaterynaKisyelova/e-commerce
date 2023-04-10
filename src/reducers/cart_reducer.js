import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from "../actions";

const cart_reducer = (state, { type, payload }) => {
  switch (type) {
    case ADD_TO_CART:
      const tempItem = state.cart.find(
        (item) => item.id === payload.id + payload.color
      );

      if (tempItem) {
        const tempCart = state.cart.map((cartItem) => {
          if (cartItem.id === payload.id + payload.color) {
            let newAmount = cartItem.amount + payload.amount;
            if (newAmount > cartItem.max) {
              newAmount = cartItem.max;
            }
            return { ...cartItem, amount: newAmount };
          }
          return cartItem;
        });
        return { ...state, cart: tempCart };
      }

      const newItem = {
        color: payload.color,
        amount: payload.amount,
        id: payload.id + payload.color,
        name: payload.product.name,
        image: payload.product.images[0].url,
        price: payload.product.price,
        max: payload.product.stock,
      };

      return { ...state, cart: [...state.cart, newItem] };

    case REMOVE_CART_ITEM:
      const tempCart = state.cart.filter((item) => item.id !== payload.id);

      return { ...state, cart: tempCart };

    case CLEAR_CART:
      return { ...state, cart: [] };

    case TOGGLE_CART_ITEM_AMOUNT:
      const newCart = state.cart.map((item) => {
        if (item.id === payload.id) {
          let newAmount;
          if (payload.value === "inc") {
            newAmount = item.amount < item.max ? item.amount + 1 : item.max;

            return { ...item, amount: newAmount };
          }

          if (payload.value === "dec") {
            newAmount = item.amount <= 1 ? (item.amount = 1) : item.amount - 1;
          }

          return { ...item, amount: newAmount };
        }
        return item;
      });

      return { ...state, cart: newCart };

    case COUNT_CART_TOTALS:
      const { totalItems, totalAmount } = state.cart.reduce(
        (total, item) => {
          total.totalItems += item.amount;
          total.totalAmount += item.amount * item.price;

          return total;
        },
        {
          totalItems: 0,
          totalAmount: 0,
        }
      );

      return { ...state, totalItems, totalAmount };

    default:
      throw new Error(`No Matching "${type}" - action type`);
  }
};

export default cart_reducer;
