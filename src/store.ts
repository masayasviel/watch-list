import { configureStore, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'

import { ListInterface } from './interfaces/list.interface';

export interface RootStateType {
    state: {
        authentication: boolean;
        animeList: ListInterface[];
    };
}

const InitialState: RootStateType['state'] = {
    authentication: false,
    animeList: [],
};

export const stateSlice = createSlice({
    name: 'state',
    initialState: InitialState,
    reducers: {
        saveToken(state, action: PayloadAction<{ authentication: boolean }>) {
            state.authentication = action.payload.authentication;
        },
        setList(state, action: PayloadAction<{ animeList: ListInterface[] }>) {
            state.animeList = action.payload.animeList;
        }
    },
});

export const store = configureStore({
    reducer: {
        state: stateSlice.reducer
    },
});
