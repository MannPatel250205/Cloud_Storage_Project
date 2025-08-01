// src/features/auth/authSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { registerUser, loginUser, updateUser, deleteUser, getUser } from './authThunk';
import { getStoredToken, clearAuthData, setAuthData } from '../../../utils/tokenUtils.js';

const stored = localStorage.getItem('user');
const token = localStorage.getItem('token');
const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: stored ? JSON.parse(stored) : null,
        token: token || null,
        isLoggedIn: !!stored,
        loading: false,
        error: null,
    },
    reducers: {
        logoutUser: (state) => {
            state.user = null;
            state.token = null;
            state.isLoggedIn = false;
            clearAuthData();
        },
        loadUserFromStorage: (state) => {
            const stored = localStorage.getItem('user');
            const token = getStoredToken();
            if (stored && token) {
                state.user = JSON.parse(stored);
                state.token = token;
                state.isLoggedIn = true;
            } else {
                clearAuthData();
                state.user = null;
                state.token = null;
                state.isLoggedIn = false;
            }
        }
    },
    extraReducers: (builder) => {
        builder
            // REGISTER
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.isLoggedIn = true;
                localStorage.setItem('user', JSON.stringify(action.payload));
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Registration failed';
            })

            // LOGIN
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.isLoggedIn = true;
                setAuthData(action.payload.token, action.payload.user);
            })
            .addCase(loginUser.rejected, (state, action) => {
                console.log(action);

                state.loading = false;
                state.error = action.payload || 'Login failed';
            })
            // updateUser
            .addCase(updateUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                localStorage.setItem('user', JSON.stringify(action.payload));
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.error || 'Update failed';
            })
            // deleteUser
            .addCase(deleteUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = null;
                state.isLoggedIn = false;
                localStorage.removeItem('user');
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.error || 'Delete failed';
            })
            // getUser
            .addCase(getUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.loading = false;
                console.log(action.payload);

                state.user = action.payload;
                // localStorage.setItem('user',JSON.stringify(action.payload));
            })
            .addCase(getUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.error || 'Get user failed';
            })


    }
});

export const { logoutUser, loadUserFromStorage } = authSlice.actions;
export default authSlice.reducer;
