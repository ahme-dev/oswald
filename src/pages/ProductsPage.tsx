import {
	Box,
	Button,
	Card,
	Center,
	Flex,
	Grid,
	Loader,
	SimpleGrid,
	Stack,
	Text,
	Title,
} from "@mantine/core";
import { ListResult, Record } from "pocketbase";
import { useEffect, useState } from "react";
import { pb } from "../utils/db";

export function ProductsPage() {
	let [result, setResult] = useState<ListResult<Record>>();

	useEffect(() => {
		(async () => {
			await fetchProducts();
		})();
	}, []);

	const fetchProducts = async () => {
		try {
			const resultList = await pb.collection("products").getList(1, 50);
			console.log(resultList);
			setResult(resultList);
		} catch {
			console.log("Error fetching products");
		}
	};

	if (!result)
		return (
			<Center h={"100%"}>
				<Loader></Loader>
			</Center>
		);

	return (
		<Stack>
			<Flex justify={"space-between"}>
				<Title>Products</Title>
				<Button>Search</Button>
			</Flex>
			<SimpleGrid
				cols={4}
				spacing="lg"
				breakpoints={[
					{ maxWidth: 980, cols: 3, spacing: "md" },
					{ maxWidth: 755, cols: 2, spacing: "sm" },
					{ maxWidth: 600, cols: 1, spacing: "sm" },
				]}
			>
				{result.items.map((item) => {
					return (
						<Card key={item.id}>
							<Text weight={"bold"}>{item.name}</Text>
							<Text>{item.price_current}</Text>
						</Card>
					);
				})}
			</SimpleGrid>
		</Stack>
	);
}
