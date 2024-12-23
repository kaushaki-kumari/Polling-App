import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  password: "",
  errors: {
    email: "",
    password: "",
  },
  isSubmitted: false,
  showPassword: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateEmail: (state, action) => {
      state.email = action.payload;
      state.errors.email = "";
      state.isSubmitted = false;
    },
    updatePassword: (state, action) => {
      state.password = action.payload;
      state.errors.password = "";
      state.isSubmitted = false;
    },
    setCredentials: (state, action) => {
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.errors = { email: "", password: "" };
      state.isSubmitted = false;
    },
    validateForm: (state) => {
      state.isSubmitted = true;

      if (!state.email) {
        state.errors.email = "Email address is required";
      } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(state.email)) {
          state.errors.email = "Please enter a valid email address";
        } else {
          state.errors.email = "";
        }
      }
      if (!state.password) {
        state.errors.password = "Password is required";
      } else {
        const hasMinLength = state.password.length >= 6;
        const hasLetter = /[A-Za-z]/.test(state.password);
        const hasNumber = /\d/.test(state.password);

        if (!hasMinLength || !hasLetter || !hasNumber) {
          state.errors.password =
            "Password must be at least 6 characters long and include both letters and numbers";
        } else {
          state.errors.password = "";
        }
      }
    },
    togglePasswordVisibility: (state) => {
      state.showPassword = !state.showPassword;
    },
    resetForm: (state) => {
      return initialState;
    },
  },
});

export const {
  updateEmail,
  updatePassword,
  setCredentials,
  validateForm,
  togglePasswordVisibility,
  resetForm,
} = userSlice.actions;

export default userSlice.reducer;
