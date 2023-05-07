import { CurrencyEuroIcon, MinusIcon } from "@heroicons/react/24/solid";
import {
	ActionIcon,
	Badge,
	Card,
	Center,
	Group,
	Loader,
	ScrollArea,
	SimpleGrid,
	Stack,
	Text,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Product } from "../stores/products";
import { useAppSelector } from "../stores/root";
import { dineroFormat } from "../utils/currency";

export function ProductList(props: {
	loading: boolean;
	data: Product[];
	filterName: string;
	filterCategories: string[];
	filterCategoriesChanges: number;
	filterMinPrice: number | null;
	filterMaxPrice: number | null;
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
		// if loading, don't filter
		if (props.loading) return;

		// if there is no data, don't filter
		// and indicate that filtering is done
		if (!props.data || props.data.length === 0) {
			setIsFiltering(false);
			return;
		}

		// make new data using filters
		let data = props.data.filter((item) => {
			// does name field match filterName
			const containsName = item.name
				.toLowerCase()
				.includes(props.filterName.toLowerCase());
			// does about field match filterName
			const containsAbout = item.about
				.toLowerCase()
				.includes(props.filterName.toLowerCase());
			// only if categories are not empty
			// does category field match filterCategories
			const containsCategory =
				props.filterCategories.length > 0
					? props.filterCategories.every((el) => el === item.category.name)
					: true;

			// does price field match filterMinPrice and filterMaxPrice
			// if min or max price is null, don't filter
			const containsPrice = props.filterMinPrice
				? item.price_current >= props.filterMinPrice
				: true && props.filterMaxPrice
				? item.price_current <= props.filterMaxPrice
				: true;

			// if filter term is not in name or about
			// or category is not in filterCategories
			// don't include in filtered data
			if (
				(!containsName && !containsAbout) ||
				!containsCategory ||
				!containsPrice
			)
				return false;

			// if no problems occured
			return true;
		});

		// set filtered data
		setFilteredData(data);

		setIsFiltering(false);
	}, [
		props.filterName,
		props.filterCategoriesChanges,
		props.loading,
		props.filterMinPrice,
		props.filterMaxPrice,
	]);

	// render

	// if result is loading, show loader
	if (isFiltering) {
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
		<Stack h={"83vh"}>
			<ScrollArea offsetScrollbars type="auto">
				<SimpleGrid
					cols={props.smaller ? 3 : 4}
					spacing="sm"
					breakpoints={[
						{ maxWidth: 980, cols: props.smaller ? 2 : 3, spacing: "md" },
						{ maxWidth: 755, cols: 2, spacing: "sm" },
						{ maxWidth: 600, cols: 1, spacing: "sm" },
					]}
				>
					{/* filtered data items */}
					{filteredData.map((item) => {
						if (props.smaller && item.quantity_available === 0) return null;

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
											{dineroFormat(item.price_current)}
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
									{!props.smaller && item.category.name && (
										<Text size={"sm"} weight="lighter">
											{item.category.name}
										</Text>
									)}

									{!props.smaller && (
										<Text italic weight="lighter">
											{item.about}
										</Text>
									)}
								</Stack>
							</Card>
						);
					})}
					{/* filtered data items end */}
				</SimpleGrid>
			</ScrollArea>
		</Stack>
	);
}
