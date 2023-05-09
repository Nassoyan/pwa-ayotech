import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import Logger from "../../features/logger"
import type { PayloadAction } from '@reduxjs/toolkit'

const name = "AUTHENTICATION"

type token = string

interface LoginProps {
    email:string | number
}

const initialState = {
    email:"",
}

export const  asyncForgotThunk = createAsyncThunk(`${name}/forgotPassword`,
async (params:LoginProps, {rejectWithValue}) => {
    try {
        return await Logger({
            method: 'POST',
            url: `https://pwaback.ayotech.am/api/forgot-password`,
            body: {...params}
        })
    } catch (err) {
        return rejectWithValue(err)
    }
})



  const forgotPasswordSlice = createSlice({
    name:"forgot",
    initialState,
    reducers:{},
      extraReducers:(builder)=> {
        builder
        .addCase(asyncForgotThunk.fulfilled, (state, action:PayloadAction<any>) => {
        //   Cookies.set("authorized", action.payload.access_token)
          state.email = action.payload
        })
      }
    })


  // export const { clearMessage } = loginSlice.actions

  export default forgotPasswordSlice.reducer




