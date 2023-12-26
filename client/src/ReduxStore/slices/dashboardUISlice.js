// sidebarSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isSideBarOpen: false,
  // uiMode: 'light',
  uiMode: localStorage.getItem('uiMode') || 'light',
  isModalOpen: false,
  origin: null
}

export const dashBoardUiSlice = createSlice({
  name: 'dashBoardUi',
  initialState: initialState,
  reducers: {
    toggleSideBar: (state) => {
      state.isSideBarOpen = !state.isSideBarOpen;
    },
    toggleUiMode: (state) => {
      state.uiMode = state.uiMode === 'light' ? 'dark' : 'light';
    },
    toggleModal: (state, action) => {
      state.isModalOpen = !state.isModalOpen;
      state.origin = action.payload;
    },
    openModal: (state, action) => {
      state.isModalOpen = true;
      state.origin = action.payload;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
      state.origin = null;
    },
    setOrigin: (state, action) => {
      state.origin = action.payload;
    },
  },
});

export const { toggleSideBar, toggleUiMode, openModal, closeModal, setOrigin,
toggleModal } = dashBoardUiSlice.actions;

export const dashBoardUiReducer = dashBoardUiSlice.reducer;
