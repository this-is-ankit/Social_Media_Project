import { createSlice } from "@reduxjs/toolkit";

const rtnSlice = createSlice({
    name: 'realTimeNotification',
    initialState: [],
    reducers: {
        setLikeNotification: (state, action) => {
            if (action.payload.type === 'like') {
                return [action.payload, ...state];
            } else if (action.payload.type === 'dislike') {
                return state.filter((item) => item.userId !== action.payload.userId);
            }
        },
        setNotifications: (state, action) => {
            return [action.payload, ...state];
        },
        clearNotifications: (state) => {
            return [];
        }
    }
});

export const { setLikeNotification, setNotifications, clearNotifications } = rtnSlice.actions;
export default rtnSlice.reducer;
