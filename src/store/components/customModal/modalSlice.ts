import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { modalObj } from "../../../utils/types/modal";

const initialState: modalObj = {
  template: "default",
  data: {},
  isOpen: false,
  size: "",
};

const customModal = createSlice({
  name: "customModal",
  initialState,
  reducers: {
    openModal: (state: modalObj, action: PayloadAction<any>) => {
      state.isOpen = true;
      state.template = action.payload.template;
      state.data = action.payload.data;
      state.size = action.payload.size;
    },
    closeModal: (state: modalObj, action: PayloadAction) => {
      state.isOpen = false;
      state.template = "default";
      state.data = {};
    },
    updateModalData: (state: modalObj, action: PayloadAction<any>) => {
      state.data = action.payload;
    },
  },
});

const { reducer, actions } = customModal;
export const { openModal, closeModal, updateModalData } = actions;
export default reducer;
