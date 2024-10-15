import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginUser, signupUser } from './api'; // Import the API functions

// Initial state
const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || { 
    username: null, 
    email: null, 
    id: null 
  },
  token: localStorage.getItem('token') || null,
  loading: false,
  error: null,
};

// Async thunk for login
export const login = createAsyncThunk('user/login', async ({ username, password }, thunkAPI) => {
  try {
    const data = await loginUser(username, password);
    return data; // Expecting { user, token } in the response
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

// Async thunk for signup
export const signup = createAsyncThunk('user/signup', async ({ username, email, password }, thunkAPI) => {
  try {
    const data = await signupUser(username, email, password);
    return data; // Expecting { message } in the response
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

// User slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = { username: null, email: null, id: null };
      state.token = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user.username = action.payload.username;
        state.user.email = action.payload.email;
        state.user.id = action.payload.rid;
        state.token = action.payload.token;
        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('user', JSON.stringify({
          username: action.payload.username,
          email: action.payload.email,
          id: action.payload.rid
        }));
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
