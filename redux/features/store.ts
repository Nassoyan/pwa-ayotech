import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import registerReducer from "../slices/authentication/registerSlice"
import loginReducer from "../slices/authentication/loginSlice"
import getProductReducer from "../slices/wishlist/getProductSlice"
import addProductReducer from "../slices/wishlist/addProductSlice"
import forgotPasswordReducer from "../slices/authentication/forgotSlice"
import resetPasswordReducer from "../slices/authentication/resetPasswordSlice"
// import socialReducer from "../slices/authentication/socialSlice"
import brandsReducer from "../slices/brendSlider/brandSlice"
import addToCartReducer from "../slices/cart/addToCartSlice"
import getCartReducer from "../slices/cart/getCart"
import deleteCartReducer from "../slices/cart/deleteCart"
// import { productApi } from "./product/products-api-alice";

export const store = configureStore({
  reducer: {
    register:registerReducer,
    login:loginReducer,
    getProduct:getProductReducer,
    addProduct:addProductReducer,
    forgotPassword:forgotPasswordReducer,
    resetPassword:resetPasswordReducer,
    brands:brandsReducer,
    addToCart:addToCartReducer,
    getCart:getCartReducer,
    deleteCart:deleteCartReducer
    // [productApi.reducerPath]: productApi.reducer
  },
  // middleware:(getDefaultMiddleware)=> {
  //   return getDefaultMiddleware().concat(productApi.middleware);
  // }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
// export type AppThunk<ReturnType = void> = ThunkAction<
//   ReturnType,
//   RootState,
//   unknown,
//   Action<string>
// >;
