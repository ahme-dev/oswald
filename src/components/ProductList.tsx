import { Card, Center, Loader, SimpleGrid, Stack, Text } from "@mantine/core";
import { ListResult, Record } from "pocketbase";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export function ProductList(props: {
	loading: boolean;
	data: ListResult<Record> | undefined;
	filterTerms: string;
	smaller?: boolean;
	itemClickFunc: ({}: {
		id: string;
		name: string;
		price_current: number;
		quantity_available: number;
		about: string;
	}) => void;
}) {
	const { t } = useTranslation();

	// contain the received data but filtered
	let [filteredData, setFilteredData] = useState<Record[]>([]);

	// filter data on loading finish and filter changes
	useEffect(() => {
		// if loading or no data don't filter
		if (props.loading || !props.data || props.data.items.length === 0) return;

		// make new data using filters
		let data = props.data.items.filter((item) => {
			// does name field match filterTerms
			const filterTermsInName = item.name
				.toLowerCase()
				.includes(props.filterTerms.toLowerCase());
			// does about field match filterTerms
			const filterTermsInAbout = item.about
				.toLowerCase()
				.includes(props.filterTerms.toLowerCase());

			// if filter term is not in name or about don't include in filtered data
			if (!filterTermsInName && !filterTermsInAbout) return false;

			return true;
		});

		// set filtered data
		setFilteredData(data);
	}, [props.filterTerms, props.loading]);

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
				<Text>{t("No results for the search")}</Text>
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
						onClick={() => {
							props.itemClickFunc({
								id: item.id,
								name: item.name,
								price_current: item.price_current,
								about: item.about,
								quantity_available: item.quantity_available,
							});
						}}
						key={item.id}
						withBorder
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
