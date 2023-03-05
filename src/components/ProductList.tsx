import { CurrencyEuroIcon, MinusIcon } from "@heroicons/react/24/solid";
import {
	ActionIcon,
	Badge,
	Card,
	Center,
	Group,
	Loader,
	SimpleGrid,
	Stack,
	Text,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Product } from "../stores/products";
import { useAppSelector } from "../stores/root";

export function ProductList(props: {
	loading: boolean;
	data: Product[];
	filterTerms: string;
	smaller?: boolean;
	itemClickFunc: (product: Product) => void;
}) {
	const { t } = useTranslation();

	const settingsState = useAppSelector((state) => state.settings);

	// contain the received data but filtered
	let [filteredData, setFilteredData] = useState<Product[]>([]);
	let [isFiltering, setIsFiltering] = useState(true);

	// filter data on loading finish and filter changes
	useEffect(() => {
		// if loading or no data don't filter
		if (props.loading || !props.data || props.data.length === 0) return;

		// make new data using filters
		let data = props.data.filter((item) => {
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

		setIsFiltering(false);
	}, [props.filterTerms, props.loading]);

	// render

	// if result is loading, show loader
	if (props.loading || isFiltering) {
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
								...item,
							});
						}}
						key={item.id}
						withBorder
						sx={{ cursor: "pointer" }}
					>
						<Stack>
							<Text weight="bolder">{item.name}</Text>
							{!props.smaller && <Text italic>{item.about}</Text>}
							<Group>
								<Badge
									pl={0}
									leftSection={
										<ActionIcon color={settingsState.color}>
											<CurrencyEuroIcon />
										</ActionIcon>
									}
									size="lg"
								>
									{item.price_current}
								</Badge>
								<Badge
									pl={0}
									size="lg"
									leftSection={
										<ActionIcon color={settingsState.color}>
											<MinusIcon />
										</ActionIcon>
									}
								>
									{item.quantity_available}
								</Badge>
							</Group>
						</Stack>
					</Card>
				);
			})}
			{/* filtered data items end */}
		</SimpleGrid>
	);
}
