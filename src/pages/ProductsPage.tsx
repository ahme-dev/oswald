import { PlusIcon } from "@heroicons/react/24/solid";
import { ActionIcon, Affix, Flex, Input, Stack, Title } from "@mantine/core";
import { useState } from "react";
import { ProductList } from "../components/ProductList";
import { useDBFiltered } from "../utils/useDB";

export function ProductsPage() {
	let [search, setSearch] = useState("");

	let filterQuery = useDBFiltered({
		filter: `name ~ "%${search.trim()}%"`,
	});

	// render
	return (
		<Stack h={"100%"}>
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
			<ProductList {...filterQuery}></ProductList>
			<Affix position={{ bottom: 20, right: 20 }}>
				<ActionIcon size={"xl"} variant="gradient" radius={"xl"} p={8}>
					<PlusIcon></PlusIcon>
				</ActionIcon>
			</Affix>
		</Stack>
	);
}
