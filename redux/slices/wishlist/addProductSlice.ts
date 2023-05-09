import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import  Logger  from "../../features/logger";



interface ProductProps {
    product_id: (String | Number | null)

}



const initialState:ProductProps = {
    product_id: null,
}


// export const addProductToWishlistThunk = createAsyncThunk(
//     `/add/products`,
//     async (value :ProductProps) => {
//       const response = await fetch(
//         "https://pwaback.ayotech.am/api/wishlist/product",{
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             "Access-Control-Allow-Origin" : "*",
//             "Accept": "application/json",
//           },
//           body: JSON.stringify(value),
//         }
//       );
//       return await response.json() as ProductProps;
//     }
//   );

export const  addProductToWishlistThunk = createAsyncThunk(`product/addProduct`,
async (params:ProductProps, {rejectWithValue}) => {
    try {
        return await Logger({
            method: 'POST',
            url: `https://pwaback.ayotech.am/api/wishlist/product`,
            body: {...params}

        })
    } catch (err) {
        return rejectWithValue(err)
    }
})


    const addProductSlice = createSlice({
        name:"Addproduct",
        initialState,
        reducers:{
        //   updateProduct:(state:any, action:PayloadAction<number>) => {
        //     state.data = state.data.map((item:ProductProps) => {
        //       if(item.id === action.payload) {
        //         return{ ...item, ...{is_wished:!item.is_wished} }
        //       }
        //        return item
        //     })
        //     return state
        //   }
         },
        extraReducers: (builder) => {
            builder
            .addCase(addProductToWishlistThunk.fulfilled, (state:ProductProps, action:any) => {
                // Cookies.set("authorized", action.payload.access_token)
                state.product_id = action.payload
            })
        }
    })

    export default addProductSlice.reducer
    // export const { updateProduct } = getProductSlice.actions
   
