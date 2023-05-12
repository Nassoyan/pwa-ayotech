import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import Logger from "../../features/logger";
import { RootState } from "@/redux/features/store";

export interface Delete {
  item_id: number | null | string;
  cart_token: string | null;
}

const initialState = {
  item_id: null,
  cart_token: "",
} as Delete;

export const asyncDeleteCartThunk = createAsyncThunk(
  "deleteCart",
  async (params: Delete, { rejectWithValue }) => {
    try {
      return await Logger({
        method: "POST",
        url: `https://pwaback.ayotech.am/api/account/delete-cart-item`,
        body: { ...params },
      });
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const deleteCartSlice = createSlice({
  name: "deleteItem",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      asyncDeleteCartThunk.fulfilled,
      (state: Delete, action: PayloadAction<any>) => {
        state.cart_token = localStorage.getItem("cart_token");
      }
    );
  },
});

export default deleteCartSlice.reducer;
export const token = (state: RootState) => state.deleteCart.cart_token
