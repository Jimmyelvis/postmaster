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
    }
  },
});

export const { toggleSideBar, toggleUiMode } = dashBoardUiSlice.actions;

export const dashBoardUiReducer = dashBoardUiSlice.reducer;
