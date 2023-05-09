import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import Logger from "../../features/logger";

export interface EditCartItems {
  item_id: number | null | string;
  cart_token?: string | null;
  quantity:number | null
}

const initialState = {
  item_id: null,
  cart_token: "",
  quantity:0
} as EditCartItems

export const asyncEditCartThunk = createAsyncThunk(
  "edit/Cart",
  async (params:EditCartItems, { rejectWithValue }) => {
    try {
      return await Logger({
        method: "POST",
        url: `https://pwaback.ayotech.am/api/account/edit-cart-item-qty`,
        body: { ...params },
      });
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const EditCartSlice = createSlice({
  name: "EditCart",
  initialState,
  reducers: {},
//   extraReducers: (builder) => {
//     builder.addCase(
//       asyncDeleteCartThunk.fulfilled,
//       (state: EditCartItems, action: PayloadAction<any>) => {
//         state.cart_token = localStorage.getItem("cart_token");
//       }
//     );
//   },
});

// export default deleteCartSlice.reducer;
// export const token = (state: any) => state.deleteCart.cart_token
