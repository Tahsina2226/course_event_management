import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface AuthState {
  token: string | null;
  email: string | null;
  role: string | null;
  department: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: localStorage.getItem("token"),
  email: localStorage.getItem("email"),
  role: localStorage.getItem("role"),
  department: localStorage.getItem("department"),
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
  { token: string; role: string; email: string; department: string | null },
  { email: string; password: string },
  { rejectValue: string }
>("auth/login", async ({ email, password }, thunkAPI) => {
  try {
    const response = await axios.post(
      "https://university-lp-backend.vercel.app/api/admin/login",
      { email, password }
    );
    const { token, role } = response.data;
    const decoded = decodeJwt(token);
    const userEmail = decoded?.email || "";

    let department = null;
    try {
      const enrollRes = await axios.get(
        `https://university-lp-backend.vercel.app/api/enroll/${userEmail}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      department = enrollRes.data.batch_department || null;
    } catch {
      department = null;
    }

    localStorage.setItem("token", token);
    localStorage.setItem("email", userEmail);
    localStorage.setItem("role", role);
    if (department) localStorage.setItem("department", department);

    return { token, role, email: userEmail, department };
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Login failed"
    );
  }
});

export const register = createAsyncThunk<
  { token: string; role: string; email: string },
  { name: string; email: string; role: string; password: string },
  { rejectValue: string }
>("auth/register", async ({ name, email, role, password }, thunkAPI) => {
  try {
    const response = await axios.post(
      "https://university-lp-backend.vercel.app/api/admin/register",
      { name, email, role, password }
    );
    const { token, role: userRole } = response.data;
    const decoded = decodeJwt(token);
    const userEmail = decoded?.email || "";

    localStorage.setItem("token", token);
    localStorage.setItem("email", userEmail);
    localStorage.setItem("role", userRole);

    return { token, role: userRole, email: userEmail };
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
      state.department = null;
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      localStorage.removeItem("role");
      localStorage.removeItem("department");
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
        state.department = action.payload.department;
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
        state.department = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to register";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
