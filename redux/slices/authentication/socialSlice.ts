// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// // import Cookies from "js-cookie";
// import Logger from "../../features/logger"
// import type { PayloadAction } from '@reduxjs/toolkit'

// const name = "AUTHENTICATION"

// const initialState = {
   
// }

// export const  asyncGoogleThunk = createAsyncThunk(`${name}/login`,
// async (params:any, {rejectWithValue}) => {
//     try {
//         return await Logger({
//             method: 'GET',
//             url: 'https://pwaback.ayotech.am/api/login/google',
//             body: {...params}
//         })
//     } catch (err) {
//         return rejectWithValue(err)
//     }
// })

// export const logOutThunk = createAsyncThunk(
//       `logout/products`,
//       async () => {
//         const response = await fetch(
//           "https://arformeback.ayotech.am/api/auth/logout",{
//             method: "GET",
//             headers: {
//               "Content-Type": "application/json",
//               "Access-Control-Allow-Origin" : "*",
//               "Accept": "application/json",
    
//             },
//           }
//         );
//         return await response.json();
//       }
//     );

//   const socialSlice = createSlice({
//     name:"logUser",
//     initialState,
//     reducers:{},
//       extraReducers:(builder)=> {
//         builder
//         .addCase(asyncGoogleThunk.fulfilled, (state, action:PayloadAction<any>) => {
//         //   Cookies.set("authorized", action.payload.access_token)
//         //   state.status = action.payload.access_token
//         })
//       }
//   })



//   export default socialSlice.reducer




