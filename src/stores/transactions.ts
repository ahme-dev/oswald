import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { pb } from "../utils/pbase";
import { moveExpandsInline, RecordExpandless } from "pocketbase-expandless";
import { getProducts } from "./products";
import { isError, returnError } from "../utils/errors";

// trypes

export type TransactionProduct = {
	id: string;
	product: {
		id: string;
		name: string;
		category: {
			id: string;
			name: string;
		};
	};
	qty_sold: number;
	price_sold: number;
};

export type Transaction = {
	id: string;
	date: string;
	wasRefunded: boolean;
	customer: { id: string; name: string };
	transactionProducts: TransactionProduct[];
};

export type TransactionsState = {
	error: string | null;
	loading: boolean;
	list: Transaction[];
};

type TransactionsActions = {
	clearError: (state: TransactionsState) => void;
};

// data

export const transactionsSlice = createSlice<
	TransactionsState,
	TransactionsActions
>({
	name: "transactions",
	initialState: {
		error: null,
		loading: false,
		list: [],
	},
	reducers: {
		clearError: (state) => {
			state.error = null;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getTransactions.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(getTransactions.fulfilled, (state, action) => {
			state.loading = false;
			state.list = action.payload;
		});
		builder.addCase(revertTransaction.rejected, (state, action) => {
			state.error = action.payload as string;
		});
	},
});

export const getTransactions = createAsyncThunk(
	"transactions/get",
	async () => {
		let transactions = await pb.collection("transactions").getFullList({
			expand: "transaction_product_ids.product_id.category_id, customer_id",
			sort: "-date",
		});

		const t = moveExpandsInline(transactions) as RecordExpandless[];

		const transactionsList = t.map((transaction: RecordExpandless) => {
			// create a list of all the transactionProducts for the transaction
			const transactionProducts = transaction.transaction_product_ids.map(
				(transactionProduct: RecordExpandless) => {
					return {
						id: transactionProduct.id,
						price_sold: transactionProduct.price_sold,
						qty_sold: transactionProduct.qty_sold,
						product: {
							id: transactionProduct.product_id.id,
							name: transactionProduct.product_id.name,
							category: {
								id: transactionProduct.product_id.category_id.id,
								name: transactionProduct.product_id.category_id.name,
							},
						},
					} satisfies TransactionProduct;
				},
			);

			// create the customer for the transaction
			const customer = transaction.customer_id
				? { id: transaction.customer_id.id, name: transaction.customer_id.name }
				: { id: "", name: "" };

			return {
				id: transaction.id,
				date: transaction.date,
				customer,
				wasRefunded: transaction.wasRefunded,
				transactionProducts,
			} satisfies Transaction;
		});

		return transactionsList;
	},
);

export const revertTransaction = createAsyncThunk(
	"transactions/refund",
	async (transaction: { id: string }, { dispatch, rejectWithValue }) => {
		const transactionData = await pb
			.collection("transactions")
			.getOne(transaction.id + "3f", {
				expand: "transaction_product_ids.product_id.category_id, customer_id",
			})
			.catch(returnError);

		if (isError(transactionData)) {
			return rejectWithValue("Could not find transaction to revert");
		}

		const t = moveExpandsInline(transactionData) as RecordExpandless;

		// list of transaction products to insert into and remove later
		const transactionProductIDs: string[] = [];

		// go through each transaction product
		for (const transactionProduct of t.transaction_product_ids) {
			// update quantity using qty_sold
			const qtyUpdateError = await pb
				.collection("products")
				.update(transactionProduct.product_id.id, {
					quantity_available:
						transactionProduct.qty_sold +
						transactionProduct.product_id.quantity_available,
				})
				.catch(returnError);

			if (isError(qtyUpdateError))
				return rejectWithValue("Could not revert product quantity");

			// add id to list to remove later
			transactionProductIDs.push(transactionProduct.id);
		}

		// add wasRefunded flag to transaction
		const refundFlagError = await pb
			.collection("transactions")
			.update(t.id, {
				wasRefunded: true,
			})
			.catch(returnError);

		if (isError(refundFlagError))
			return rejectWithValue("Could not set refund flag on transaction");

		// fetch the products and transactions lists again
		dispatch(getProducts());
		dispatch(getTransactions());

		return;
	},
);
