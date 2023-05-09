import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import Logger from "../../features/logger";

export interface ProductId {
  product_id: number | null | string;
  quantity?: number;
  cart_token?: string;
  dataLength?:number
}

const initialState = {
  product_id: null,
} as ProductId;

export const asyncAddToCartThunk = createAsyncThunk(
  "addToCart",
  async (params: ProductId, { rejectWithValue }) => {
    try {
      return await Logger({
        method: "POST",
        url: `https://pwaback.ayotech.am/api/account/add-to-cart`,
        body: { ...params },
      });
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const addToCartSlice = createSlice({
  name: "AddToCart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      asyncAddToCartThunk.fulfilled,
      (state: ProductId, action: PayloadAction<any>) => {
        !localStorage.getItem("cart_token") &&
          localStorage.setItem("cart_token", action?.payload?.cartinfo?.token);
          state.dataLength = action?.payload?.cartinfo?.items?.length
      }
    );
  },
});

export default addToCartSlice.reducer;
export const quantitySelector = (state: any) => state.addToCart.dataLength;
