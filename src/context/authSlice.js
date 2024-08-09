// authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuthenticated: false,
    account: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.isAuthenticated = true;
            state.account = action.payload.accountId;
            localStorage.setItem('khronos::account', JSON.stringify(action.payload));
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.account = null;
            localStorage.removeItem('khronos::account');
        },
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
