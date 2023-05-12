import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import  Logger  from "../../features/logger"
import { RootState } from "@/redux/features/store";

export interface MenuProps {
    id:number
    title:string
    url?:string
}
  
  interface menus {
    data: MenuProps[]
    link?:string
  }
  
  
  
  const initialState = {
    data:[]
  } as menus

export const  asyncMenuItemsThunk = createAsyncThunk(`menu/items`,
async () => {
        return await Logger({
            method: 'POST',
            url: `https://pwaback.ayotech.am/api/menus`
        })
})

export const menuItemSlice = createSlice({
    name:"menu",
    initialState,
    reducers:{},
    extraReducers:(builder) => {
        builder .addCase(asyncMenuItemsThunk.fulfilled, (state, action: PayloadAction<any>) => {
            state.data = action.payload.data
        })
    }
})

 export default menuItemSlice.reducer
 export const menuDataSelector = ((state:RootState) => state.menuItems.data)
 export const linkSelector = ((state:RootState) => state.menuItems.link)
