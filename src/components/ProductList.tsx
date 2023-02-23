import { Card, Center, Loader, SimpleGrid, Text } from "@mantine/core";
import { ListResult, Record } from "pocketbase";

export function ProductList(props: {
	loading: boolean;
	data: ListResult<Record> | undefined;
}) {
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
			cols={4}
			spacing="lg"
			breakpoints={[
				{ maxWidth: 980, cols: 3, spacing: "md" },
				{ maxWidth: 755, cols: 2, spacing: "sm" },
				{ maxWidth: 600, cols: 1, spacing: "sm" },
			]}
		>
			{props.data.items.map((item) => {
				return (
					<Card key={item.id}>
						<Text weight={"bold"}>{item.name}</Text>
						<Text italic>{item.price_current}</Text>
					</Card>
				);
			})}
		</SimpleGrid>
	);
}
