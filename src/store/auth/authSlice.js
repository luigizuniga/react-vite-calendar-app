import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice ({
    name: 'auth',
    initialState: {
        status: 'checking',  // authenticated and not-authenticated
        user: {},
        errorMessage: undefined,
    },
    reducers: {
        checking: (state) => {
            state.status = 'checking',
            state.user = {},
            state.errorMessage = undefined;
        },
        onLogin: (state, { payload }) => {
            state.state = 'authenticated';
            state.user = payload,
            state.errorMessage = undefined;
        }
    },
});

export const { checking } = authSlice.actions;