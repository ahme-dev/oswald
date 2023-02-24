import { configureStore } from "@reduxjs/toolkit";
import { checkoutSlice } from "./checkout";

export const store = configureStore({
	reducer: {
		checkout: checkoutSlice.reducer,
	},
});

type RootState = ReturnType<typeof store.getState>;

// selectors and actions
export const checkoutSelector = (state: RootState) => state.checkout;
export const checkoutActions = checkoutSlice.actions;
