import { configureStore } from '@reduxjs/toolkit'
import cartReducer from  './cart/cartSlice'
import favouritesReducer from './favourites/favouritesSlice'
import adminReducer from './admin/adminSlice'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    admin: adminReducer,
    favourites: favouritesReducer
  },
})