import { PlusIcon } from "@heroicons/react/24/solid";
import {
	ActionIcon,
	Affix,
	Card,
	Center,
	Flex,
	Input,
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
	let [search, setSearch] = useState("");

	useEffect(() => {
		(async () => {
			try {
				const resultList = await pb
					.collection("products")
					.getList(1, 50, { filter: `name ~ "%${search}%"` });
				console.log(resultList);
				setResult(resultList);
			} catch {
				console.log("Error fetching products");
			}
		})();
	}, [search]);

	if (!result)
		return (
			<Center h={"100%"}>
				<Loader></Loader>
			</Center>
		);

	return (
		<Stack>
			<Flex justify={"space-between"} align="center" gap={"lg"}>
				<Title size={"h2"} weight="bold">
					Products
				</Title>
				<Input
					placeholder="search for a product"
					value={search}
					onInput={(e: any) => setSearch(e.target.value)}
				></Input>
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
							<Text italic>{item.price_current}</Text>
						</Card>
					);
				})}
			</SimpleGrid>
			<Affix position={{ bottom: 20, right: 20 }}>
				<ActionIcon size={"xl"} variant="gradient" radius={"xl"} p={8}>
					<PlusIcon></PlusIcon>
				</ActionIcon>
			</Affix>
		</Stack>
	);
}
