import { createSlice } from "@reduxjs/toolkit";
const postSlice = createSlice({
    name: 'post',
    initialState: {
        posts: [],
        explorePosts: [],
        scrolls: [],
        selectedPost: null,
    },
    reducers: {
        setPosts: (state, action) => {
            state.posts = action.payload;
        },
        setExplorePosts: (state, action) => {
            state.explorePosts = action.payload;
        },
        setScrolls: (state, action) => {
            state.scrolls = action.payload;
        },
        setSelectedPost: (state, action) => {
            state.selectedPost = action.payload;
        }
    }
});
export const { setPosts, setSelectedPost, setExplorePosts, setScrolls } = postSlice.actions;
export default postSlice.reducer;