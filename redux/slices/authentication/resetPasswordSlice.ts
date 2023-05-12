import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import Logger from "../../features/logger"
import Router  from "next/router";
import { RootState } from "@/redux/features/store";

const name = "AUTHENTICATION"

type message = string


export interface ResetProps {
    token:[string]
    password:string
    password_confirmation:string
    message?:message
}

const initialState = {
    token:"",
    password:"",
    password_confirmation:"",
    message:""
}


export const  asyncResetPasswordThunk = createAsyncThunk(`${name}/resetPassword`,
async (params:ResetProps, {rejectWithValue}) => {
    try {
        return await Logger({
            method: 'POST',
            url: `https://pwaback.ayotech.am/api/reset-password`,
            body: {...params}
        }) as ResetProps
    } catch (err) {
        return rejectWithValue(err)
    }
})

  const resetPasswordSlice = createSlice({
    name:"reset",
    initialState,
    reducers:{},
    extraReducers(builder) {
        builder.addCase(asyncResetPasswordThunk.fulfilled, (state:any, action) => {
            state.message = action.payload.message
            Router.push("/")
        })
    },
  })


  export const forgotMessageSelector = (state:RootState) => state.resetPassword.message
  export default resetPasswordSlice.reducer




