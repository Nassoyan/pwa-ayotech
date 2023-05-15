import { RootState } from './../../features/store';
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

export interface ProductProps {
    data:Product[]
    paginate?:string
}



const initialState:ProductProps = {
    data:[],
}

export const getProductThunk = createAsyncThunk(
    `/get/products`,
    async (value) => {
      const response = await fetch(
        "https://pwaback.ayotech.am/api/products",{ //this api used also for products page, for getting products
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
                state.paginate = action.payload.links
            })
        }
    })

    export default getProductSlice.reducer
    export const getProductSelector = ((state:RootState) => state.getProduct.data)
    export const paginationSelector = ((state:RootState) => state.getProduct.paginate)
   
