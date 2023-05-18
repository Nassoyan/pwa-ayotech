import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import Logger from "../../features/logger";
import { RootState } from "@/redux/features/store";

export interface Item {
  cart_token:any
  getCart?:any
  item_id?:number
  items?:any
}

export interface ItemProps {
  data?: Item[]
  cart_token?:any
  isLoading?:boolean
}

const initialState:ItemProps = {
  data:[],
  isLoading:false
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
        state.isLoading = true
      })
  }
});

export default getCartSlice.reducer;
export const tokenSelector = ((state:RootState) => state.getCart.cart_token)
export const dataSelector = ((state:RootState) => state.getCart.data)
export const loadingSelector = ((state:RootState) => state.getCart.isLoading)
