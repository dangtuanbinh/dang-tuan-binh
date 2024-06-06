import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IModalObj } from "../../../utils/types/modal";

const initialState: IModalObj = {
  template: "default",
  data: {},
  isOpen: false,
  size: "",
  tag: "",
  content: ""
};

const customModal = createSlice({
  name: "customModal",
  initialState,
  reducers: {
    openModal: (state: IModalObj, action: PayloadAction<any>) => {
      state.isOpen = true;
      state.template = action.payload.template;
      state.data = action.payload.data;
      state.size = action.payload.size;
      state.tag = action.payload.tag;
      state.content = action.payload.content
    },
    closeModal: (state: IModalObj, action: PayloadAction) => {
      state.isOpen = false;
      state.template = "default";
      state.data = {};
    },
  },
});

const { reducer, actions } = customModal;
export const { openModal, closeModal } = actions;
export default reducer;
