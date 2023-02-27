import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// types

export interface CheckoutItem {
	id: string;
	name: string;
	qty: number;
	price: number;
}

type CheckoutState = {
	items: CheckoutItem[];
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
		action: PayloadAction<{ id: string; qty: number }>,
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
		clear: (state) => {
			state.items = [];
			state.total = 0;
		},
		setItemQty: (state, action) => {
			// find the item's index in the array
			let itemIndex = state.items.findIndex(
				(item) => item.id === action.payload.id,
			);

			// if not found return
			if (itemIndex === -1) return;
			console.log(action.payload.qty);

			// if requested qty is under 1 then return
			if (action.payload.qty < 1) return;

			// set the item's qty
			state.items[itemIndex].qty = action.payload.qty;

			// recalculate the total
			state.total = state.items.reduce((total, item) => {
				return total + item.qty * item.price;
			}, 0);
		},
	},
});
