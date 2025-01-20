import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favourites: JSON.parse(localStorage.getItem("favourites")) || [],
};

const favouritesSlice = createSlice({
  name: "favourites",
  initialState,
  reducers: {
    addToFavourites: (state, action) => {
      const exists = state.favourites.some(
        (item) => item.productId === action.payload.productId
      );
      if (!exists) {
        state.favourites.push(action.payload);
        localStorage.setItem("favourites", JSON.stringify(state.favourites));
      }
    },
    removeFromFavourites: (state, action) => {
      state.favourites = state.favourites.filter(
        (item) => item.productId !== action.payload
      );
      localStorage.setItem("favourites", JSON.stringify(state.favourites));
    },
    clearFavourites: (state) => {
      state.favourites = [];
      localStorage.removeItem("favourites");
    },
  },
});

export const { addToFavourites, removeFromFavourites, clearFavourites } =
  favouritesSlice.actions;

export default favouritesSlice.reducer;
