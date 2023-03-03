import {
	AnyAction,
	configureStore,
	getDefaultMiddleware,
	Reducer,
} from "@reduxjs/toolkit";
import { checkoutSlice, CheckoutState } from "./checkout";
import { settingsSlice, SettingsState } from "./settings";
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

interface RootState {
	checkout: CheckoutState;
	settings: SettingsState;
}

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
	reducer: persistedReducers as Reducer<RootState, AnyAction>,
	middleware: getDefaultMiddleware({
		thunk: true,
		serializableCheck: {
			/* ignore persistance actions */
			ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
		},
	}),
});

export const persistor = persistStore(store);

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// selectors and actions

export const checkoutActions = checkoutSlice.actions;
export const settingsActions = settingsSlice.actions;
