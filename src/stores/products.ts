import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { pb } from "../utils/pbase";

// types

export type Product = {
	id: string;
	name: string;
	quantity_available: number;
	price_current: number;
	about: string;
};

export type ProductsState = {
	loading: boolean;
	list: Product[];
};

type ProductsActions = {};

// data

const initialProducts: ProductsState = {
	loading: false,
	list: [],
};

export const productsSlice = createSlice<ProductsState, ProductsActions>({
	name: "products",
	initialState: initialProducts,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getProducts.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(getProducts.fulfilled, (state, action) => {
			state.loading = false;
			state.list = action.payload;
		});
	},
});

// thunks

// get all the products
export const getProducts = createAsyncThunk("products/get", async () => {
	let products = await pb.collection("products").getList(1, 25);
	return products.items.map((product) => {
		return {
			id: product.id,
			name: product.name,
			quantity_available: product.quantity_available,
			price_current: product.price_current,
			about: product.about,
		};
	});
});

// create a new product
export const createProduct = createAsyncThunk(
	"products/create",
	async (
		vals: {
			name: string;
			price: number;
			quantity: number;
			about: string;
		},
		{ dispatch },
	) => {
		const data = {
			name: vals.name,
			price_current: vals.price,
			quantity_available: vals.quantity,
			about: vals.about,
		};

		await pb.collection("products").create(data);

		dispatch(getProducts());
	},
);
