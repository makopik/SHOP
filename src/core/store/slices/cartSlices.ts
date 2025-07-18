import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "@core/models/products/products.interface";

interface CartItem extends Product {
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  itemsCount: number;
  totalPrice: number;
}

const initialState: CartState = {
  items: [],
  itemsCount: 0,
  totalPrice: 0,
};

const updateTotals = (state: CartState) => {
  state.itemsCount = state.items.reduce((sum, item) => sum + item.quantity, 0);
  state.totalPrice = state.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart(_, action: PayloadAction<CartState>) {
      return action.payload;
    },
    addToCart(state, action: PayloadAction<Product>) {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id,
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      updateTotals(state);
    },
    removeFromCart(state, action: PayloadAction<number>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
      updateTotals(state);
    },
    updateQuantity(
      state,
      action: PayloadAction<{ id: number; quantity: number }>,
    ) {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
        updateTotals(state);
      }
    },
    clearCart(state) {
      state.items = [];
      updateTotals(state);
    },
  },
});

export const { setCart, addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;

export const selectCartItems = (state: { cart: CartState }) => state.cart.items;
export const selectTotalItems = (state: { cart: CartState }) =>
  state.cart.itemsCount;
export const selectTotalPrice = (state: { cart: CartState }) =>
  state.cart.totalPrice;

export default cartSlice.reducer;
