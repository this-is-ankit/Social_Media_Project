import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
    name: "chat",
    initialState: {
        onlineUsers: [],
        messages: [],
        selectedUser: null,
    },
    reducers: {
        setOnlineUsers: (state, action) => {
            state.onlineUsers = action.payload;
        },
        setMessages: (state, action) => {
            state.messages = action.payload;
        },
        pushMessage: (state, action) => {
            state.messages.push(action.payload);
        },
        setSelectedUser: (state, action) => {
            state.selectedUser = action.payload;
        }
    }
});

export const { setOnlineUsers, setMessages, setSelectedUser, pushMessage } = chatSlice.actions;
export default chatSlice.reducer;
