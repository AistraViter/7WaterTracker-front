import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    isModalOpen: false,
    isSettingModalOpen: false,
    islogOutModal: false,
  },
  reducers: {
    openModal: (state) => {
      state.isModalOpen = true;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
      state.isSettingModalOpen = false;
      state.islogOutModal = false;
    },
    settingModal: (state) => {
      state.isSettingModalOpen = true;
    },
    logOutModal: (state) => {
      state.islogOutModal = true;
    },
  },
});

export const { openModal, closeModal, settingModal, logOutModal } =
  modalSlice.actions;

export const modalReducer = modalSlice.reducer;
