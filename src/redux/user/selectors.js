export const selectCurrentUserInfo = (state) => state.user.user;
export const selectUserDailyNorm = (state) => state.user.user ? state.user.user.dailyNorm : null;
export const selectIsUserLoading = (state) => state.user.loading;
