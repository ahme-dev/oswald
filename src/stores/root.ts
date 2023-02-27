import { configureStore } from "@reduxjs/toolkit";
import { checkoutSlice } from "./checkout";
import { settingsSlice } from "./settings";

// root store configuration

export const store = configureStore({
	reducer: {
		checkout: checkoutSlice.reducer,
		settings: settingsSlice.reducer,
	},
});

type RootState = ReturnType<typeof store.getState>;

// selectors and actions

export const checkoutSelector = (state: RootState) => state.checkout;
export const checkoutActions = checkoutSlice.actions;

export const settingsSelector = (state: RootState) => state.settings;
export const settingsActions = settingsSlice.actions;
