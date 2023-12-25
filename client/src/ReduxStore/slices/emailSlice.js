import { createSlice, current } from '@reduxjs/toolkit';
import { fetchEmails, addEmail, editEmail, deleteEmail, multiDeleteEmails } from '../thunks/emailThunk';

const initialState = {
  email: '',
  emailList: [],
  loading: false,
  error: '',
};

const emailSlice = createSlice({
  name: 'emails',
  initialState,
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    clearEmail: (state, action) => {
      state.email = '';
    },
    setEmailList: (state, action) => {
      state.emailList = action.payload;
    },
    clearEmailList: (state, action) => {
      state.emailList = [];
    },
  },
  extraReducers(builder) {
    builder
    .addCase(fetchEmails.pending, (state, action) => {
      state.loading = true;
    })
    .addCase(fetchEmails.fulfilled, (state, action) => {
      state.emailList = action.payload;
    })
    .addCase(fetchEmails.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    })
    .addCase(addEmail.pending, (state, action) => {
      state.loading = true;
    })
    .addCase(addEmail.fulfilled, (state, action) => {
      state.emailList = action.payload;
    })
    .addCase(addEmail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    })
    .addCase(deleteEmail.pending, (state, action) => {
      state.loading = true;
    })
    .addCase(editEmail.pending, (state, action) => {
      state.loading = true;
    })
    .addCase(editEmail.fulfilled, (state, action) => {
      state.emailList = action.payload;
    })
    .addCase(editEmail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    })
    .addCase(deleteEmail.fulfilled, (state, action) => {
      state.emailList = action.payload;
    })
    .addCase(deleteEmail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    })
    .addCase(multiDeleteEmails.pending, (state, action) => {
      state.loading = true;
    })
    .addCase(multiDeleteEmails.fulfilled, (state, action) => {
      state.emailList = action.payload;
    })
    .addCase(multiDeleteEmails.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    })
  },
});

export const { setEmail, clearEmail, setEmailList, clearEmailList } = emailSlice.actions;

export const emailReducer = emailSlice.reducer;