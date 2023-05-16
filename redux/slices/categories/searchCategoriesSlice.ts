import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Logger from "../../features/logger"


interface Categories {
  text: string;
}

const initialState = {
    text:"",
} as Categories

export const asyncGetCategoriesThunk = createAsyncThunk(
  "api/categories",
  async (params: Categories, { rejectWithValue }) => {
    try {
      return await Logger({
        method: "GET",
        url: `https://pwaback.ayotech.am/api/categories`,
        body: { ...params },
      });
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const searchCategoriesSlice = createSlice({
    name:"categories",
    initialState,
    reducers:{},
})

export default searchCategoriesSlice.reducer
