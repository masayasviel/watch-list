import { configureStore, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'

type AuthStateType = {
    token: string;
};

export interface RootStateType {
    authentication: AuthStateType;
}

const initialState: AuthStateType = {
    token: '',
};

export const authSlice = createSlice({
    name: 'authentication',
    initialState,
    reducers: {
        saveToken(state, action: PayloadAction<{ token: string }>) {
            state.token = action.payload.token;
        }
    },
});

export const store = configureStore({
    reducer: {
        authentication: authSlice.reducer,
    },
});
