import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createTransaction } from "../utils/pbase";

// types

export type CheckoutState = {
	items: {
		id: string;
		name: string;
		qty: number;
		price: number;
	}[];
	total: number;
};

type CheckoutActions = {
	add: (
		state: CheckoutState,
		action: PayloadAction<{ id: string; name: string; price: number }>,
	) => void;
	clear: (state: CheckoutState) => void;
	setItemQty: (
		state: CheckoutState,
		action: PayloadAction<{ index: number; qty: number }>,
	) => void;
};

// data

const initialCheckout: CheckoutState = {
	items: [],
	total: 0,
};

export const checkoutSlice = createSlice<CheckoutState, CheckoutActions>({
	name: "checkout",
	initialState: initialCheckout,
	reducers: {
		// add an item to checkout
		add: (state, action) => {
			// check if item already exists and return if it does
			const itemIndex = state.items.findIndex(
				(item) => item.id === action.payload.id,
			);
			if (itemIndex !== -1) return;

			// add the item
			state.items.push({
				id: action.payload.id,
				name: action.payload.name,
				qty: 1,
				price: action.payload.price,
			});

			// price * quantity
			state.total += action.payload.price * 1;
		},
		// clear all items in checkout and reset total
		clear: (state) => {
			state.items = [];
			state.total = 0;
		},
		// set quantity of an item in checkout
		setItemQty: (state, action) => {
			const itemIndex = action.payload.index;

			// if requested qty is under 1 then return
			if (action.payload.qty < 1 || action.payload.qty === undefined) return;

			// calculate qty differerence and total price differerence
			const qtyDiff = action.payload.qty - state.items[itemIndex].qty;
			const totalDiff = qtyDiff * state.items[itemIndex].price;

			// add on total price difference to the total
			state.total += totalDiff;

			// set new qty for item
			state.items[itemIndex].qty = action.payload.qty;
		},
	},
	extraReducers: (builder) => {
		// when apply is done, clear out checkout items and reset total
		builder.addCase(apply.fulfilled, (state) => {
			state.items = [];
			state.total = 0;
		});
	},
});

// thunks

// create a new transaction using the checkout state
export const apply = createAsyncThunk(
	"checkout/apply",
	async (items: CheckoutState["items"]) => {
		await createTransaction(items);
	},
);
