import PocketBase from "pocketbase";
import { ListResult, Record } from "pocketbase";
import { useEffect, useState } from "react";

export const pb = new PocketBase("http://127.0.0.1:8090");

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
