import { Card, Center, Loader, SimpleGrid, Text } from "@mantine/core";
import { ListResult, Record } from "pocketbase";
import { useDispatch } from "react-redux";
import { checkoutActions } from "../stores/root";

export function ProductList(props: {
	loading: boolean;
	data: ListResult<Record> | undefined;
	checkout?: boolean;
	smaller?: boolean;
}) {
	const dispatch = useDispatch();

	// if result doesn't exist
	if (props.loading) {
		return (
			<Center h={"100%"}>
				<Loader></Loader>
			</Center>
		);
	}

	if (!props.data) {
		return (
			<Center h={"100%"}>
				<Text>Data: not found</Text>
			</Center>
		);
	}

	if (props.data.items.length === 0) {
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
			{props.data.items.map((item) => {
				return (
					<Card
						onClick={() =>
							props.checkout &&
							dispatch(checkoutActions.add({ id: item.id, name: item.name }))
						}
						key={item.id}
						h={"fit-content"}
						sx={{ cursor: "pointer" }}
					>
						<Text weight={"bold"}>{item.name}</Text>
						<Text italic>{item.price_current}</Text>
					</Card>
				);
			})}
		</SimpleGrid>
	);
}
