import { createSlice } from "@reduxjs/toolkit";
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    suggestedUsers: [],
    userProfile: null,
    loading: false,
  },
  reducers:{
    setAuthUser:(state,action)=> {
      state.user = action.payload;
    },
    setSuggestedUsers: (state, action) => {
        state.suggestedUsers = action.payload;
    },
    setUserProfile: (state, action) => {
        state.userProfile = action.payload;
    },
    setLoading: (state, action) => {
        state.loading = action.payload;
    },
    updateFollowing: (state, action) => {
        const userId = action.payload;
        if (state.user?.following?.includes(userId)) {
            // unfollow
            state.user.following = state.user.following.filter((id) => id !== userId);
        } else if (state.user) {
            // follow
            if (!state.user.following) state.user.following = [];
            state.user.following.push(userId);
        }
    },
    updateBookmarks: (state, action) => {
        const postId = action.payload;
        if (state.user?.bookmarks?.includes(postId)) {
            state.user.bookmarks = state.user.bookmarks.filter((id) => id !== postId);
        } else if (state.user) {
            if (!state.user.bookmarks) state.user.bookmarks = [];
            state.user.bookmarks.push(postId);
        }
    }
  }
})
export const {setAuthUser, setSuggestedUsers, setUserProfile, updateFollowing, updateBookmarks, setLoading} = authSlice.actions;
export default authSlice.reducer;