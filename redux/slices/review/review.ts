 import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
 import  Logger  from "../../features/logger"

 interface Review {
    product_id:number | null
    comment:string
    rating:number
 }

 const initialState = {
    product_id:null,
    comment:"",
    rating:0
 } as Review


export const asyncReviewThunk = createAsyncThunk(
    "review/comment",
    async (params:Review, {rejectWithValue}) => {
        try {
            return await Logger({
                method: 'POST',
                url: `https://pwaback.ayotech.am/api/add-review`,
                body: {...params}
            })
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)

export const reviewSlice = createSlice({
    name:"review",
    initialState,
    reducers:{}
})

export default reviewSlice.reducer