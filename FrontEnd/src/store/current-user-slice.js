import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Reducer Functions
const updateUser = (state, action) => {
    state.user.id = action.payload.id;
    state.user.userName = action.payload.userName;
};

const updateHistory = (state, action) => {
    axios
        .patch(
            `https://convin-assignment.onrender.com/users/${state.user.id}`,
            {
                history: [...state.history, action.payload],
            }
        )
        .then((res) => {
            if (res.status !== 200) {
                throw new Error(res);
            }
        })
        .catch((err) => {
            console.log(err);
        });
    state.history = [...state.history, action.payload];
};

const clearHistory = (state, action) => {
    state.history = [];
};

const initialState = {
    user: { id: null, userName: "" },
    history: [],
};
const currentUserSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        updateUser,
        updateHistory,
        clearHistory,
    },
});

export const userActions = currentUserSlice.actions;

export default currentUserSlice;
