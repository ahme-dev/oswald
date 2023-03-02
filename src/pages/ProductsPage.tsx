import { PlusIcon } from "@heroicons/react/24/solid";
import { ActionIcon, Affix, Flex, Input, Stack } from "@mantine/core";
import { useState } from "react";
import { ProductList } from "../components/ProductList";
import { TitleText } from "../components/TitleText";
import { useCollection } from "../utils/pb";

export function ProductsPage() {
	let [search, setSearch] = useState("");

	let query = useCollection("products");

	// render
	return (
		<Stack h={"100%"}>
			<Flex justify={"space-between"} align="center" gap={"lg"}>
				<TitleText title="Products" />
				<Input
					placeholder="search for a product"
					value={search}
					onInput={(e: any) => setSearch(e.target.value)}
				></Input>
			</Flex>
			<ProductList
				data={query.data}
				loading={query.loading}
				name={search}
			></ProductList>
			<Affix position={{ bottom: 20, right: 20 }}>
				<ActionIcon size={"xl"} variant="gradient" radius={"xl"} p={8}>
					<PlusIcon></PlusIcon>
				</ActionIcon>
			</Affix>
		</Stack>
	);
}
