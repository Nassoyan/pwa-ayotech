import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';


const name = "AUTHENTICATION";

type message = string


export interface EmailVerificationState {
  first_name: string
  last_name: string
  email:string | number,
  phone_number: string | number,
  password: string | number,
  message?:any,
  regIsFulfiled?: boolean
  };


const initialState: EmailVerificationState = {
  first_name: "",
  last_name: "",
  email:"",
  phone_number: "",
  password: "",
  message:'',
  regIsFulfiled:false
};

export const asyncRegisterThunk = createAsyncThunk(
    `${name}/registerThunk`,
    async (value:EmailVerificationState) => {
      const response = await fetch(
        "https://pwaback.ayotech.am/api/auth/register",{
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin" : "*",
            "Accept": "application/json",
          },
          body: JSON.stringify(value),
        }
      );
      return await response.json();
    }
  );

export const registerSlice = createSlice({
  name: 'registration',
  initialState,
  reducers: {},
  extraReducers:(builder)=> {
    builder
    .addCase(asyncRegisterThunk.fulfilled, (state:EmailVerificationState, action:PayloadAction<any>) => {
      state.message = action.payload
    })
}});

export default registerSlice.reducer;

export const emailSelector = ((state:any) => state.register.email)
export const registarationFulfiled = ((state:any) => state.register.regIsFulfiled)
export const messageSelector = ((state:any) => state.register.message)






