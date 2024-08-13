import { createSlice } from '@reduxjs/toolkit';

const persistedAccount = localStorage.getItem('khronos::account');

const initialState = {
    isAuthenticated: !!persistedAccount,
    account: persistedAccount ? JSON.parse(persistedAccount) : null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.isAuthenticated = true;
            state.account = action.payload;
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
