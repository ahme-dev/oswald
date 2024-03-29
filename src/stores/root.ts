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
import { productsSlice, ProductsState } from "./products";
import { transactionsSlice, TransactionsState } from "./transactions";

// type of the root state
interface RootState {
	checkout: CheckoutState;
	settings: SettingsState;
	products: ProductsState;
	transactions: TransactionsState;
}

const persistedReducers = persistCombineReducers(
	// persistence configuration
	{
		key: "root",
		storage,
		blacklist: ["products", "transactions"],
	},
	// reducers to put in store and persist
	{
		checkout: checkoutSlice.reducer,
		settings: settingsSlice.reducer,
		products: productsSlice.reducer,
		transactions: transactionsSlice.reducer,
	},
);

// root store configuration

export const store = configureStore({
	reducer: persistedReducers as Reducer<{}, AnyAction>,
	middleware: getDefaultMiddleware({
		thunk: true,
		serializableCheck: {
			/* ignore persistance actions */
			ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
		},
	}),
});

export const persistor = persistStore(store);

// dispatch and selector for app

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// actions of each slice

export const checkoutActions = checkoutSlice.actions;
export const productsActions = productsSlice.actions;
export const settingsActions = settingsSlice.actions;
export const transactionsActions = transactionsSlice.actions;
