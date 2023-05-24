import { createSlice } from "@reduxjs/toolkit";

export const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        isOpenDateModal : false
    },
    reducers:{
        onOpenDateModal: (state) => {
            state.isOpenDateModal = true;
        },
        onCloseDateModal: (state) => {
            state.isOpenDateModal = false;
        }
    }
});

export const { onOpenDateModal, onCloseDateModal } = uiSlice.actions;