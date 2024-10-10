import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    email: "",
    password: "",
    isAuthenticated: false,
    accessToken: null,
    emailVerified: false,
    firstName:"",
    userId:"",
    lastName:"",
  },
  reducers: {
    setCredentials: (state, action) => {
      state.email = action.payload.email;
      state.password = action.payload.password;
    },
    setAuthState: (state, action) => {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.accessToken = action.payload.accessToken;
      state.emailVerified = action.payload.emailVerified;
      state.firstName = action.payload.firstName;
      state.userId = action.payload.userId;
      state.lastName = action.payload.lastName;
      state.email = action.payload.email
      
      // Save to AsyncStorage
      AsyncStorage.setItem('accessToken', action.payload.accessToken ?? '');
      AsyncStorage.setItem('emailVerified', JSON.stringify(action.payload.emailVerified));
      AsyncStorage.setItem('firstName', action.payload.firstName);
      AsyncStorage.setItem('userId', action.payload.userId);
      AsyncStorage.setItem('lastName', action.payload.lastName);
      AsyncStorage.setItem('email', action.payload.email)
    
    },
    clearCredentials: (state) => {
      state.email = "";
      state.password = "";
    },
    logout: (state) => {
      state.email = "";
      state.password = "";
      state.isAuthenticated = false;
      state.accessToken = null;
      state.emailVerified = false;
      
      AsyncStorage.multiRemove(['accessToken', 'emailVerified', 'firstName']);
    },
    setEmailVerified: (state, action) => {
      state.emailVerified = action.payload;
      AsyncStorage.setItem('emailVerified', JSON.stringify(action.payload));
    },
    setAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
  },
});

export const { setCredentials, setAuthState, clearCredentials, logout, setAuthenticated, setEmailVerified } = authSlice.actions;
export default authSlice.reducer;
