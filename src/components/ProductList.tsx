import { Card, Center, Loader, SimpleGrid, Stack, Text } from "@mantine/core";
import { ListResult, Record } from "pocketbase";
import { useEffect, useState } from "react";
import { checkoutActions, useAppDispatch } from "../stores/root";

export function ProductList(props: {
	loading: boolean;
	data: ListResult<Record> | undefined;
	name: string;
	checkout?: boolean;
	smaller?: boolean;
}) {
	const dispatch = useAppDispatch();

	// contain the received data but filtered
	let [filteredData, setFilteredData] = useState<Record[]>([]);

	// filter data on loading finish and filter changes
	useEffect(() => {
		// if loading or no data don't filter
		if (props.loading || !props.data || props.data.items.length === 0) return;

		// make new data using filters
		let data = props.data.items.filter((item) => {
			// filter by name
			if (!item.name.toLowerCase().includes(props.name.toLowerCase()))
				return false;

			return true;
		});

		// set filtered data
		setFilteredData(data);
	}, [props.name, props.loading]);

	// render

	// if result is loading, show loader
	if (props.loading) {
		return (
			<Center h={"100%"}>
				<Loader></Loader>
			</Center>
		);
	}

	// if filtered data returns nothing, show not found message
	if (!filteredData || filteredData.length === 0) {
		return (
			<Center h={"100%"}>
				<Text>No results for the search</Text>
			</Center>
		);
	}

	return (
		<SimpleGrid
			cols={props.smaller ? 3 : 4}
			spacing="lg"
			breakpoints={[
				{ maxWidth: 980, cols: props.smaller ? 2 : 3, spacing: "md" },
				{ maxWidth: 755, cols: 2, spacing: "sm" },
				{ maxWidth: 600, cols: 1, spacing: "sm" },
			]}
		>
			{/* filtered data items */}
			{filteredData.map((item) => {
				return (
					<Card
						// onclick add to checkout if checkout is enabled
						onClick={() =>
							props.checkout &&
							dispatch(
								checkoutActions.add({
									id: item.id,
									name: item.name,
									price: item.price_current,
								}),
							)
						}
						key={item.id}
						sx={{ cursor: "pointer" }}
					>
						<Stack>
							<Text weight={"bold"}>{item.name}</Text>
							{!props.smaller && <Text>{item.about}</Text>}
							<Text italic>{item.price_current}</Text>
						</Stack>
					</Card>
				);
			})}
			{/* filtered data items end */}
		</SimpleGrid>
	);
}
