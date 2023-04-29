import { configureStore, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'
import { UserCredential } from 'firebase/auth';


export interface RootStateType {
    authentication: UserCredential | null;
}

const initialState: RootStateType = {
    authentication: null,
};

export const authSlice = createSlice({
    name: 'authentication',
    initialState,
    reducers: {
        saveToken(state, action: PayloadAction<{ authentication: UserCredential | null }>) {
            state.authentication = action.payload.authentication;
        }
    },
});

export const store = configureStore({
    reducer: {
        authentication: authSlice.reducer,
    },
});
