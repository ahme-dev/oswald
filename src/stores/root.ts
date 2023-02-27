import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { checkoutSlice } from "./checkout";
import { settingsSlice } from "./settings";
import storage from "reduxjs-toolkit-persist/lib/storage";
import {
	persistCombineReducers,
	persistStore,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from "reduxjs-toolkit-persist";

const persistedReducers = persistCombineReducers(
	{
		key: "root",
		storage,
	},
	{
		checkout: checkoutSlice.reducer,
		settings: settingsSlice.reducer,
	},
);

// root store configuration

export const store = configureStore({
	reducer: persistedReducers,
	middleware: getDefaultMiddleware({
		serializableCheck: {
			/* ignore persistance actions */
			ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
		},
	}),
});

export const persistor = persistStore(store);

type RootState = ReturnType<typeof store.getState>;

// selectors and actions

export const checkoutSelector = (state: RootState) => state.checkout;
export const checkoutActions = checkoutSlice.actions;

export const settingsSelector = (state: RootState) => state.settings;
export const settingsActions = settingsSlice.actions;
