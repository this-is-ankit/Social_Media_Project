import { createSlice } from "@reduxjs/toolkit";
const postSlice = createSlice({
    name: 'post',
    initialState: {
        posts: [],
        explorePosts: [],
        scrolls: [],
        selectedPost: null,
        loading: false,
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
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        }
    }
});
export const { setPosts, setSelectedPost, setExplorePosts, setScrolls, setLoading } = postSlice.actions;
export default postSlice.reducer;