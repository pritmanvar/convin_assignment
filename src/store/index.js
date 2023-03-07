import { configureStore } from "@reduxjs/toolkit";
import currentUserSlice from "./current-user-slice";

const store = configureStore({
    reducer: {
        CurrentUser: currentUserSlice.reducer,
    },
});

export default store;
