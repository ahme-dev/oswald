import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { pb } from "../utils/pbase";

// types

export type Product = {
	id: string;
	name: string;
	quantity_available: number;
	price_current: number;
	about: string;
	category?: string;
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
export const getProducts = createAsyncThunk(
	"products/get",
	async (): Promise<Product[]> => {
		// get the products from the database
		let products = await pb
			.collection("products")
			.getList(1, 25, { expand: "category" });

		// change them into a product list
		let productList = products.items.map((product) => {
			// if expanded field has multiple relations take the first one
			// this is to fix type errors
			const category = Array.isArray(product.expand.category)
				? product.expand.category[0]
				: product.expand.category;

			return {
				id: product.id,
				name: product.name,
				about: product.about,
				category: category.name,
				price_current: product.price_current,
				quantity_available: product.quantity_available,
			};
		});

		return productList;
	},
);

// create a new product
export const createProduct = createAsyncThunk(
	"products/create",
	async (product: Omit<Product, "id">, { dispatch }) => {
		const data = {
			name: product.name,
			about: product.about,
			price_current: product.price_current,
			quantity_available: product.quantity_available,
		};

		await pb.collection("products").create(data);

		dispatch(getProducts());
	},
);

// edit an existing product using the id
export const editProduct = createAsyncThunk(
	"products/edit",
	async (product: Product, { dispatch }) => {
		const data = {
			name: product.name,
			price_current: product.price_current,
			quantity_available: product.quantity_available,
			about: product.about,
		};

		await pb.collection("products").update(product.id, data);

		dispatch(getProducts());
	},
);

// delete an existing product using the id
export const deleteProduct = createAsyncThunk(
	"products/delete",
	async (product: Pick<Product, "id">, { dispatch }) => {
		await pb.collection("products").delete(product.id);

		dispatch(getProducts());
	},
);
