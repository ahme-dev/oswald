import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { pb } from "../utils/pbase";
import { getProducts, Product } from "./products";
import { getTransactions } from "./transactions";
import { DateTime } from "luxon";

// types

type CheckoutItemType = {
	id: string;
	name: string;
	qtyWanted: number;
	qtyLimit: number;
	price: number;
};

export type CheckoutType = {
	items: CheckoutItemType[];
	total: number;
	count: number;
};

export type CheckoutState = {
	current: number;
	checkouts: CheckoutType[];
};

type CheckoutActions = {
	changeCurrent: (state: CheckoutState, action: PayloadAction<number>) => void;
	add: (state: CheckoutState, action: PayloadAction<Product>) => void;
	clear: (state: CheckoutState) => void;
	setItemQty: (
		state: CheckoutState,
		action: PayloadAction<{ index: number; qty: number }>,
	) => void;
};

// data

const initialCheckout: CheckoutState = {
	current: 0,
	checkouts: [
		{
			items: [],
			total: 0,
			count: 0,
		},
		{
			items: [],
			total: 0,
			count: 0,
		},
		{
			items: [],
			total: 0,
			count: 0,
		},
	],
};

export const checkoutSlice = createSlice<CheckoutState, CheckoutActions>({
	name: "checkout",
	initialState: initialCheckout,
	reducers: {
		// change the current selected checkout
		changeCurrent: (state, action) => {
			state.current = action.payload;
		},

		// add an item to checkout
		add: (state, action) => {
			// check if item already exists and return if it does
			const itemIndex = state.checkouts[state.current].items.findIndex(
				(item) => item.id === action.payload.id,
			);
			if (itemIndex !== -1) return;

			// add the item
			state.checkouts[state.current].items.push({
				id: action.payload.id,
				name: action.payload.name,
				qtyWanted: 1,
				qtyLimit: action.payload.quantity_available,
				price: action.payload.price_current,
			});

			// price * quantity
			state.checkouts[state.current].total += action.payload.price_current * 1;
			state.checkouts[state.current].count += 1;
		},
		// clear all items in checkout and reset total
		clear: (state) => {
			state.checkouts[state.current].items = [];
			state.checkouts[state.current].total = 0;
			state.checkouts[state.current].count = 0;
		},
		// set quantity of an item in checkout
		setItemQty: (state, action) => {
			const itemIndex = action.payload.index;

			// if requested qty is under 1 then return
			if (action.payload.qty < 1 || action.payload.qty === undefined) return;
			// if requested qty is over available qty then return
			if (
				action.payload.qty >
				state.checkouts[state.current].items[itemIndex].qtyLimit
			)
				return;

			// calculate qty differerence and total price differerence
			const qtyDiff =
				action.payload.qty -
				state.checkouts[state.current].items[itemIndex].qtyWanted;
			const totalDiff =
				qtyDiff * state.checkouts[state.current].items[itemIndex].price;

			// add on items count difference to the count
			state.checkouts[state.current].count += qtyDiff;

			// add on total price difference to the total
			state.checkouts[state.current].total += totalDiff;

			// set new qty for item
			state.checkouts[state.current].items[itemIndex].qtyWanted =
				action.payload.qty;
		},
	},
	extraReducers: (builder) => {
		// when apply is done, clear out checkout items and reset total
		builder.addCase(apply.fulfilled, (state) => {
			state.checkouts[state.current].items = [];
			state.checkouts[state.current].total = 0;
			state.checkouts[state.current].count = 0;
		});
	},
});

// thunks

// create a new transaction using the items (transactionProducts)
export const apply = createAsyncThunk(
	"checkout/apply",
	async (items: CheckoutItemType[], { dispatch }) => {
		let transactionProductsIDs = [];

		// go through each item
		for (let i = 0; i < items.length; i++) {
			// create a new transactionProduct with the item
			const transactionProduct = await pb
				.collection("transaction_products")
				.create({
					product_id: items[i].id,
					price_sold: items[i].price,
					qty_sold: items[i].qtyWanted,
				});

			// get the product record
			const product = await pb.collection("products").getOne(items[i].id);

			// substract the transaction quantity from the product available quantity
			await pb.collection("products").update(items[i].id, {
				quantity_available: product.quantity_available - items[i].qtyWanted,
			});

			// add the product id to the transactionProductsIDs array
			transactionProductsIDs.push(transactionProduct.id);
		}

		// get datetime of now
		const nowDateTime = DateTime.now().toFormat("yyyy-MM-dd HH:mm:ss");

		// create the transaction data using the transactionProductsIDs array
		const data = {
			date: nowDateTime,
			transaction_product_ids: transactionProductsIDs,
			isRefund: false,
		};
		await pb.collection("transactions").create(data);

		dispatch(getProducts());
		dispatch(getTransactions());
	},
);
