import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import Logger from "../../features/logger";

export interface Item {
  cart_token:any
  getCart?:any
  item_id?:number
  items?:any
}

export interface ItemProps {
  data?: Item[]
  cart_token?:any
}

const initialState:ItemProps = {
  data:[]
}

export const asyncGetCartThunk = createAsyncThunk("addToCart", async (params:ItemProps, {rejectWithValue}) => {
    try {
      return await Logger({
        method: "POST",
        url: `https://pwaback.ayotech.am/api/account/get-cart`,
        body: { ...params },
      });
    } catch (err) {
      return rejectWithValue(err);
    }
  })

export const getCartSlice = createSlice({
  name: "AddToCart",
  initialState,
  reducers: {},
  extraReducers:(builder) => {
      builder.addCase(asyncGetCartThunk.fulfilled, (state:any, action:PayloadAction<any>) => {
        state.cart_token = localStorage.getItem("cart_token")
        state.data = action.payload.cartinfo
      })
  }
});

export default getCartSlice.reducer;
export const tokenSelector = ((state:Item) => state.getCart.cart_token)
export const dataSelector = ((state:Item) => state.getCart.data)
