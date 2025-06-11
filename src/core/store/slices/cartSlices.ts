import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "@core/models/products/products.interface";

interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  totalItem: number;
  totalPrice: number;
}

const initialState: CartState = {
  items: [],
  totalItem: 0,
  totalPrice: 0,
};

const updateTotals = (state: CartState) => {
  state.totalItem = state.items.reduce((sum, item) => sum + item.quantity, 0);
  state.totalPrice = state.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
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

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;

export const selectTotalItems = (state: { cart: CartState }) =>
  state.cart.totalItem;
export const selectTotalPrice = (state: { cart: CartState }) =>
  state.cart.totalPrice;

export default cartSlice.reducer;
