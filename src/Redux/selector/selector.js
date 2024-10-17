import {createSelector} from '@reduxjs/toolkit';

export const userDetails = createSelector(
  [(state) => state.auth.authLogin],
  (authLogin) => authLogin,
);


