import { createSlice } from "@reduxjs/toolkit";

// Reducer Functions
const updateUser = (state, action) => {
    state.user.id = action.payload.id;
    state.user.userName = action.payload.userName;
};

const initialState = {
    user: { id: null, userName: "" },
};
const currentUserSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        updateUser,
    },
});

export const userActions = currentUserSlice.actions;

export default currentUserSlice;
