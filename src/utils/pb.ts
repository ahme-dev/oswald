import PocketBase from "pocketbase";
import { ListResult, Record } from "pocketbase";
import { useEffect, useState } from "react";

export const pb = new PocketBase("http://127.0.0.1:8090");

// create a new transaction using the items (transactionProducts)
export async function createTransaction(items: any[]) {
	let transactionProducts = [];

	for (let i = 0; i < items.length; i++) {
		const record = await pb.collection("transaction_products").create({
			product_id: items[i].id,
			quantity: items[i].qty,
		});

		transactionProducts.push(record.id);
	}

	const data = {
		date: "2023-02-09 12:00:00",
		customer_id: "sif48ofdvige80p",
		transaction_product_ids: transactionProducts,
	};

	try {
		await pb.collection("transactions").create(data);
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
