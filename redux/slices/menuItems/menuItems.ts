import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import  Logger  from "../../features/logger"

export interface MenuProps {
    id:number
    title:string
}
  
  interface menus {
    data: MenuProps[]
    link?:string
  }
  
  
  
  const initialState:menus = {
    data:[]
  }

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
            console.log(action.payload.data[1].title);
            state.link = action.payload.data[1].title
        })
    }
})

 export default menuItemSlice.reducer
 export const menuDataSelector = ((state:any) => state.menuItems.data)
 export const linkSelector = ((state:any) => state.menuItems.link)
