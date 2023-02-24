import { ListResult, Record } from "pocketbase";
import { useEffect, useState } from "react";
import { pb } from "./pb";

export function usePBFiltered(filter?: string) {
	let [data, setData] = useState<ListResult<Record>>();
	let [loading, setLoading] = useState(true);
	let [error, setError] = useState<unknown>();

	// run everytime search changes
	useEffect(() => {
		(async () => {
			// set loading state
			setLoading(true);
			try {
				// get data from products filtered
				const resultList = await pb.collection("products").getList(1, 25, {
					filter: filter ? filter : ``,
				});

				// set data to result list
				setData(resultList);

				// finally set loading state to false
				setLoading(false);
			} catch (e) {
				setError(e);
			}
		})();
	}, [filter]);

	return {
		loading,
		error,
		data,
	};
}
