import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./utils/userSlice";
import feedReducer from "./utils/feedSlice"

export const store = configureStore({
    reducer: {
        user: userSlice,
        feed: feedReducer
    }
})