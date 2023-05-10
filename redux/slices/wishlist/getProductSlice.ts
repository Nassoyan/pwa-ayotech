import { RootState } from "@/redux/features/store";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export interface Product {
  image: string
  is_wished:boolean
  name:string
  price:number
  id:number
  stock:string
}

interface ProductProps {
    data:Product[]
}



const initialState:ProductProps = {
    data:[],
}

export const getProductThunk = createAsyncThunk(
    `/get/products`,
    async (value) => {
      const response = await fetch(
        "https://pwaback.ayotech.am/api/products",{
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin" : "*",
            "Accept": "application/json",
          },
          body: JSON.stringify(value),
        }
      );
      return await response.json() as ProductProps;
    }
  );


    const getProductSlice = createSlice({
        name:"product",
        initialState,
        reducers:{},
        extraReducers: (builder) => {
            builder
            .addCase(getProductThunk.fulfilled, (state:ProductProps, action:any) => {
                state.data = action.payload.data
            })
        }
    })

    export default getProductSlice.reducer
    export const getProductSelector = ((state:RootState) => state.getProduct.data)
   
