import { createSlice } from '@reduxjs/toolkit';
import { loginUser, fetchUser, handleToken, registerUser } from '../thunks/getUser';


const initialState = {
  user: null,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // setAuthUser: (state, action) => {
    //   return action.payload || false;
    // },
  },
  extraReducers (builder) {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.user = action.payload;
    })
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.user = action.payload;
    })
    builder.addCase(handleToken.fulfilled, (state, action) => {
      state.user = action.payload;
    })
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.user = action.payload;
    })
    builder.addCase(registerUser.rejected, (state, action) => {
      state.error = action.payload;
    })
    
  },  
});

export const authReducer = authSlice.reducer;
