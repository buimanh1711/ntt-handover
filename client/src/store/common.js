import { createSlice } from "@reduxjs/toolkit";

export const initState = {
  info: {},
  isLogged: false,
  notifications: 0,
  userInfo: {
    _id: "",
    address: "",
    first_name: "",
    last_name: "",
    avt: "",
    email: "",
    phone: "",
    sex: "",
    role: "",
  },
};

const commonSlice = createSlice({
  name: "common",
  initialState: initState,
  reducers: {
    setUserInfo(state, action) {
      state.userInfo = action.payload;
    },
    toggleLogged(state, action) {
      state.isLogged = action.payload;
    },
    setNotifications(state, action) {
      state.notifications = action.payload;
    },
  },
});

const { actions, reducer } = commonSlice;

export const commonActions = actions;
export default reducer;
