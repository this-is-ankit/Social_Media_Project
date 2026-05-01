import { createSlice } from "@reduxjs/toolkit";
const postSlice = createSlice({
    name: 'post',
    initialState: {
        posts: [],
        explorePosts: [],
        selectedPost: null,
    },
    reducers: {
        setPosts: (state, action) => {
            state.posts = action.payload;
        },
        setExplorePosts: (state, action) => {
            state.explorePosts = action.payload;
        },
        setSelectedPost: (state, action) => {
            state.selectedPost = action.payload;
        }
    }
});
export const { setPosts, setSelectedPost, setExplorePosts } = postSlice.actions;
export default postSlice.reducer;