export const selectCurrentUserInfo = (state) => state.user.user;
export const selectUserDailyNorm = (state) => state.auth.user.dailyNorm ?? 2000;
export const selectIsUserLoading = (state) => state.user.loading;

//1234qwerASDF!@#$
