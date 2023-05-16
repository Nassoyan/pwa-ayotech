import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import Logger from "../../features/logger"
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from "@/redux/features/store";

const name = "AUTHENTICATION"

type status = string
type error = string

interface LoginProps {
    email:string
    password: string 
    status?:status
    guest_cart_token?:string | null | undefined
}

const initialState = {
    email:"",
    password:"",
    status:'',
}

export const  asyncLoginThunk = createAsyncThunk(`${name}/login`,
async (params:LoginProps, {rejectWithValue}) => {
    try {
        return await Logger({
            method: 'POST',
            url: `https://pwaback.ayotech.am/api/auth/login`,
            body: {...params}
        })
    } catch (err) {
        return rejectWithValue(err)
    }
})

  const loginSlice = createSlice({
    name:"logUser",
    initialState,
    reducers:{
      // clearMessage: (state) => {
      //   state.message = ""
      // }
    },
      extraReducers:(builder)=> {
        builder
        .addCase(asyncLoginThunk.fulfilled, (state, action:PayloadAction<any>) => {
          Cookies.set("authorized", action.payload.access_token)
          state.status = action.payload.access_token
        })
        // .addCase(logOutThunk.fulfilled, (state, action:PayloadAction<any>) => {
        //   Cookies.remove("authorized", action.payload.access_token)
        // })
        // .addCase(asyncChangePassword.fulfilled, (state, action:PayloadAction<any>) => {
        //   state.message = action.payload.message
        // })
      }
  })

  export const statusSelector = ((state:RootState) => state.login.status)
  // export const { clearMessage } = loginSlice.actions

  export default loginSlice.reducer




