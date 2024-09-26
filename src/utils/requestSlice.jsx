import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
    name: "request",
    initialState: null,
    reducers: {
        addRequests: (state, action) => {
                return action.payload;
        },
        removeRequests: (state, action) => {
            const newState = state.filter(request => request._id !== action.payload)
            return newState;
        },
    },
    });

export const { addRequests, removeRequests } = requestSlice.actions;
export default requestSlice.reducer;