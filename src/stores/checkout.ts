import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// types

type CheckoutState = {
	items: { id: string; name: string; qty: number }[];
};

type CheckoutActions = {
	add: (
		state: CheckoutState,
		action: PayloadAction<{ id: string; name: string }>,
	) => void;
	clear: (state: CheckoutState) => void;
};

// data

const initialCheckout: CheckoutState = {
	items: [],
};

export const checkoutSlice = createSlice<CheckoutState, CheckoutActions>({
	name: "checkout",
	initialState: initialCheckout,
	reducers: {
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
			});
		},
		clear: (state) => {
			state.items = [];
		},
	},
});
