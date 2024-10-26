export const selectLogOutModal = (state) => {
  console.log('Redux State:', state);
  return state.modal.isLogOutModal;
};
export const selectIsSettingModalOpen = (state) => {
  return state.modal.isSettingModalOpen;
};
