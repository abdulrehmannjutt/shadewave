import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modal: false,
  deleteProductModal: false,
  previewModal: false,
  selectedProduct: [],
  products: [],
  isProductsUpdate: false,
  categories: [],
};

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    toggleModal: (state) => {
      state.modal = !state.modal;
    },
    toggleDeleteProductModal: (state) => {
        state.deleteProductModal = !state.deleteProductModal;
    },
    togglePreviewModal: (state, action) => {
        state.previewModal = !state.previewModal;
    },
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload
    },
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setIsProductsUpdate: (state, action) => {
      state.isProductsUpdate = action.payload;
    },
    setCategories: (state, action) => {
      state.categories = action.payload
    }
  },
});

export const { toggleModal, toggleDeleteProductModal, togglePreviewModal, setSelectedProduct, setProducts, setIsProductsUpdate, setCategories } = adminSlice.actions;

export default adminSlice.reducer;
