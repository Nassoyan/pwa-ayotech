import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import  Logger  from "../../features/logger"

export interface Brands {
    logo: string[]
    name:string
    id:number
  }
  
  interface BrandProps {
      data:Brands[]
  }
  
  
  
  const initialState:BrandProps = {
      data:[]
  }

export const  asyncGetBrendsThunk = createAsyncThunk(`get/brends`,
async () => {
     
        return await Logger({
            method: 'POST',
            url: `https://pwaback.ayotech.am/api/brands`
        })
    
})

export const brandsSlice = createSlice({
    name:"brends",
    initialState,
    reducers:{},
    extraReducers:(builder) => {
        builder .addCase(asyncGetBrendsThunk.fulfilled, (state, action: PayloadAction<any>) => {
            state.data = action.payload.data
            
        })
    }
})

export default brandsSlice.reducer
export const brandsDataSelector = ((state:any) => state.brands.data)
