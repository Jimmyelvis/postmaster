import { createSlice, current } from '@reduxjs/toolkit';
import { fetchProfile, updateProfile } from '../thunks/profileThunk';


const initialState = {
  profile: null,
  error: null,
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
    builder.addCase(fetchProfile.fulfilled, (state, action) => {
      state.profile = action.payload;
    })
    builder.addCase(fetchProfile.rejected, (state, action) => {
      state.error = action.payload;
    })
    builder.addCase(updateProfile.fulfilled, (state, action) => {
      state.profile = action.payload;
    })
    builder.addCase(updateProfile.rejected, (state, action) => {
      state.error = action.payload;
    })
  }
});

export const profileReducer = profileSlice.reducer;

export const { setProfile, clearProfile } = profileSlice.actions;