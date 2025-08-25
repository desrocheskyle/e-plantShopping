import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // [{ name, image, cost, quantity }]
  },
  reducers: {
    addItem: (state, action) => {
      const { name, image, cost } = action.payload;
      const existing = state.items.find((i) => i.name === name);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ name, image, cost, quantity: 1 });
      }
    },

    // payload: string (name)
    removeItem: (state, action) => {
      state.items = state.items.filter((i) => i.name !== action.payload);
    },

    // payload: { name, quantity }
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const item = state.items.find((i) => i.name === name);
      if (!item) return;
      item.quantity = quantity;
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;
export default CartSlice.reducer;