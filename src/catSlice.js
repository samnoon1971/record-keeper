import { createSlice } from "@reduxjs/toolkit";

import cats from "./data/cats";
const initialState = {
  cats: cats,
  status: "idle",
  error: null,
};

const catSlice = createSlice({
  name: "cat",
  initialState,
  reducers: {
    addCat: (state, action) => {
      state.cats.push(action.payload);
    },

    updateCat: (state, action) => {
      const { id, updateCat } = action.payload;
      const index = state.cats.findIndex((cat) => cat.id === action.payload.id);
      if (index !== -1) {
        state.cats[index] = { ...state.cats[index], ...updateCat };
      }
    },
    deleteCat: (state, action) => {
      const { id } = action.payload;
      state.cats = state.cats.filter((cat) => cat.id !== id);
    },
  },
});

export const { addCat, updateCat, deleteCat } = catSlice.actions;
export default catSlice.reducer;
