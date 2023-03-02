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
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

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
		thunk: true,
		serializableCheck: {
			/* ignore persistance actions */
			ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
		},
	}),
});

export const persistor = persistStore(store);

type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// selectors and actions

export const checkoutSelector = (state: RootState) => state.checkout;
export const checkoutActions = checkoutSlice.actions;

export const settingsSelector = (state: RootState) => state.settings;
export const settingsActions = settingsSlice.actions;
