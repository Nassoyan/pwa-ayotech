import { RootState } from "../../features/store";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import Logger from "../../features/logger";

export interface Posts {
  id: number;
  image: string;
  link: string;
  title: string;
}

export interface PostProps {
  data: Posts[];
  isloading?:boolean


}

const initialState = {
  data: [],
  isloading:false

} as PostProps;

export const asyncPostsThunk = createAsyncThunk("api/posts", async () => {
  return await Logger({
    method: "GET",
    url: `https://pwaback.ayotech.am/api/posts`,
  });
});

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      asyncPostsThunk.fulfilled,
      (state: PostProps, action: PayloadAction<any>) => {
        state.data = action.payload;
        state.isloading = true
      }
    );
  },
});

export default postSlice.reducer;

export const postSelector = (state: RootState) => state.posts.data;
export const loadingSelector = (state: RootState) => state.posts.isloading;
