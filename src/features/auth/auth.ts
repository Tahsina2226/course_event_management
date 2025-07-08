import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface AuthState {
  token: string | null;
  email: string | null;
  role: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: localStorage.getItem("token"),
  email: localStorage.getItem("email"),
  role: localStorage.getItem("role"),
  loading: false,
  error: null,
};

function decodeJwt(token: string) {
  try {
    const payload = token.split(".")[1];
    if (!payload) return null;
    const decodedJson =
      typeof window !== "undefined"
        ? atob(payload)
        : Buffer.from(payload, "base64").toString("utf8");
    return JSON.parse(decodedJson);
  } catch {
    return null;
  }
}

export const login = createAsyncThunk<
  { token: string; role: string; email: string },
  { email: string; password: string },
  { rejectValue: string }
>("auth/login", async (credentials, thunkAPI) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/admin/login",
      credentials
    );
    const { token, role } = response.data;
    const decoded = decodeJwt(token);
    const email = decoded?.email || "";
    localStorage.setItem("token", token);
    localStorage.setItem("email", email);
    localStorage.setItem("role", role);
    return { token, role, email };
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Login failed"
    );
  }
});

export const register = createAsyncThunk<
  { token: string; role: string; email: string },
  { email: string; password: string },
  { rejectValue: string }
>("auth/register", async (credentials, thunkAPI) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/admin/register",
      credentials
    );
    const { token, role } = response.data;
    const decoded = decodeJwt(token);
    const email = decoded?.email || "";
    localStorage.setItem("token", token);
    localStorage.setItem("email", email);
    localStorage.setItem("role", role);
    return { token, role, email };
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Registration failed"
    );
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
      state.email = null;
      state.role = null;
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      localStorage.removeItem("role");
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
        state.token = action.payload.token;
        state.role = action.payload.role;
        state.email = action.payload.email;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to login";
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.role = action.payload.role;
        state.email = action.payload.email;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to register";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
