import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import Logger from "../../features/logger";

export interface Empty {
  cart_token: any;
}

const initialState = {
  cart_token: null,
} as Empty;

export const asyncEmptyCartThunk = createAsyncThunk(
  "deleteCart",
  async (params: Empty, { rejectWithValue }) => {
    try {
      return await Logger({
        method: "POST",
        url: `https://pwaback.ayotech.am/api/account/empty-cart`,
        body: { ...params },
      });
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const emptyCartSlice = createSlice({
  name: "deleteItem",
  initialState,
  reducers: {},
//   extraReducers: (builder) => {
//     builder.addCase(
//         asyncEmptyCartThunk.fulfilled,
//       (state: Delete, action: PayloadAction<any>) => {
//         state.cart_token = localStorage.getItem("cart_token");
//       }
//     );
//   },
});

// export default deleteCartSlice.reducer;
// export const token = (state: any) => state.deleteCart.cart_token
