import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { checkAuth, login, logout, registration } from "./asyncActions";

import { ShowUser } from "types/user/user";

interface UserState {
    user: ShowUser,
    isAuth: boolean,
    isLoading: boolean,
}

const initialState: UserState = {
    user: {} as ShowUser,
    isAuth: false,
    isLoading: false,
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setAuth(state, action: PayloadAction<boolean>) {
            state.isAuth = action.payload;
        },
        setUser(state, action: PayloadAction<ShowUser>) {
            state.user = action.payload;
        },
        setLoading(state, action: PayloadAction<boolean>) {
            state.isLoading = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(checkAuth.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(checkAuth.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isAuth = true;
            localStorage.setItem('token', action.payload.access)
        });
        builder.addCase(checkAuth.rejected, (state) => {
            state.isLoading = false;
        });

        builder.addCase(login.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(login.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isAuth = true;
            localStorage.setItem('token', action.payload.access)
        });
        builder.addCase(login.rejected, (state) => {
            state.isLoading = false;
        });

        builder.addCase(registration.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(registration.fulfilled, (state) => {
            state.isLoading = false;
        });
        builder.addCase(registration.rejected, (state) => {
            state.isLoading = false;
        });

        builder.addCase(logout.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(logout.fulfilled, (state) => {
            state.isLoading = false;
            state.isAuth = false;
            localStorage.removeItem('token')
            state.user = {} as ShowUser
        });
        builder.addCase(logout.rejected, (state) => {
            state.isLoading = false;
        });
    },
})

export const { setAuth, setUser, setLoading } = userSlice.actions;

export default userSlice.reducer;