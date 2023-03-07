import { createSlice } from "@reduxjs/toolkit";

// Reducer Functions
const updateUserName = (state, action) => {
    state.userName = action.payload;
};

const initialState = {
    userName: "",
};
const currentUserSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        updateUserName,
    },
});

export const userActions = currentUserSlice.actions;

export default currentUserSlice;
