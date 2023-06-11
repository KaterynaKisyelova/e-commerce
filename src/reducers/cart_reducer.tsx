import { CartActionTypes } from "../actions";
import { SingleCartItem, SingleProduct } from "../utils/types";

type CartState = {
  cart: SingleCartItem[];
  totalItems: number;
  totalAmount: number;
  shippingFee: number;
};

type AddToCartItem = {
  id: string;
  color: string;
  amount: number;
  product: SingleProduct;
};

type ChangeAmountItem = { id: string; value: "inc" | "dec" };

type CartAction = {
  type: CartActionTypes;
  payload?: AddToCartItem | { id: string } | ChangeAmountItem;
};

function isAddToCartItem(
  item: AddToCartItem | { id: string } | ChangeAmountItem | undefined
): item is AddToCartItem {
  return (item as AddToCartItem).product !== undefined;
}

function isChangeAmountItem(
  item: AddToCartItem | { id: string } | ChangeAmountItem | undefined
): item is ChangeAmountItem {
  return (item as ChangeAmountItem).value !== undefined;
}

const cart_reducer = (
  state: CartState,
  { type, payload }: CartAction
): CartState => {
  switch (type) {
    case CartActionTypes.ADD_TO_CART:
      if (!isAddToCartItem(payload)) {
        return { ...state };
      }

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

    case CartActionTypes.REMOVE_CART_ITEM:
      if (payload === undefined) {
        return { ...state };
      }

      const tempCart = state.cart.filter((item) => item.id !== payload.id);

      return { ...state, cart: tempCart };

    case CartActionTypes.CLEAR_CART:
      return { ...state, cart: [] };

    case CartActionTypes.TOGGLE_CART_ITEM_AMOUNT:
      if (!isChangeAmountItem(payload)) {
        return { ...state };
      }

      const newCart = state.cart.map((item) => {
        if (item.id === payload.id) {
          let newAmount;
          if (payload.value === "inc") {
            newAmount = item.amount < item.max ? item.amount + 1 : item.max;

            return { ...item, amount: newAmount };
          }

          newAmount = item.amount <= 1 ? (item.amount = 1) : item.amount - 1;

          return { ...item, amount: newAmount };
        }

        return item;
      });

      return { ...state, cart: newCart };

    case CartActionTypes.COUNT_CART_TOTALS:
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
      return { ...state };
  }
};

export default cart_reducer;
