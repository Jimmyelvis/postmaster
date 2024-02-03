import { createSlice, current } from '@reduxjs/toolkit';
import { fetchProfile, updateProfile, createProfile } from '../thunks/profileThunk';


const initialState = {
  profile: null,
  error: null,
  loading: true
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
    clearProfile: (state, action) => {
      state.profile = null;
    },
  },
  extraReducers (builder) {
    builder.addCase(createProfile.pending, (state, action) => {
      state.loading = true;
    })
    builder.addCase(createProfile.fulfilled, (state, action) => {
      state.profile = action.payload;
      state.loading = false;
    })
    builder.addCase(createProfile.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    })
    builder.addCase(fetchProfile.pending, (state, action) => {
      state.loading = true;
    })
    builder.addCase(fetchProfile.fulfilled, (state, action) => {
      state.profile = action.payload?.profile
      state.loading = false;
    })
    builder.addCase(fetchProfile.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    })
    builder.addCase(updateProfile.fulfilled, (state, action) => {
      state.profile = action.payload;
      state.loading = false;
    })
    builder.addCase(updateProfile.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    })
  }
});

export const profileReducer = profileSlice.reducer;

export const { setProfile, clearProfile } = profileSlice.actions;