import PocketBase from "pocketbase";
import { ListResult, Record } from "pocketbase";
import { useEffect, useState } from "react";

export const pb = new PocketBase("http://127.0.0.1:8090");

// create a new transaction using the items (transactionProducts)
export async function createTransaction(items: any[]) {
	let transactionProductsIDs = [];

	// go through each item
	for (let i = 0; i < items.length; i++) {
		// create a new transactionProduct with the item
		const transactionProduct = await pb
			.collection("transaction_products")
			.create({
				product_id: items[i].id,
				quantity: items[i].qty,
			});

		// get the product record
		const product = await pb.collection("products").getOne(items[i].id);

		// substract the transaction quantity from the product available quantity
		await pb.collection("products").update(items[i].id, {
			quantity_available: product.quantity_available - items[i].qty,
		});

		// add the product id to the transactionProductsIDs array
		transactionProductsIDs.push(transactionProduct.id);
	}

	// create the transaction data using the transactionProductsIDs array
	const data = {
		date: "2023-02-09 12:00:00",
		transaction_product_ids: transactionProductsIDs,
	};

	try {
		await pb.collection("transactions").create(data);
	} catch (e) {
		console.log(e);
	}
}

// create a new product
export async function createProduct(
	name: string,
	price: number,
	quantity: number,
	about: string,
) {
	const data = {
		name,
		price_current: price,
		quantity_available: quantity,
		about,
	};

	try {
		await pb.collection("products").create(data);
	} catch (e) {
		console.log(e);
	}
}

// edit an existing product using the id
export async function editProduct(
	id: string,
	name: string,
	price: number,
	quantity: number,
	about: string,
) {
	const data = {
		name,
		price_current: price,
		quantity_available: quantity,
		about,
	};

	try {
		await pb.collection("products").update(id, data);
	} catch (e) {
		console.log(e);
	}
}

// delete an existing product using the id
export async function deleteProduct(id: string) {
	try {
		await pb.collection("products").delete(id);
	} catch (e) {
		console.log(e);
	}
}

// hook to get a collection in the database
export function useCollection(collection: string) {
	let [data, setData] = useState<ListResult<Record>>();
	let [loading, setLoading] = useState(true);

	// run everytime search changes
	useEffect(() => {
		(async () => {
			// set loading state
			setLoading(true);
			try {
				// get data from products filtered
				const resultList = await pb.collection(collection).getList(1, 25);

				// set data to result list
				setData(resultList);

				// finally set loading state to false
				setLoading(false);
			} catch (e) {
				// console.log("Error in useCollection", e);
			}
		})();
	}, []);

	return {
		loading,
		data,
	};
}
