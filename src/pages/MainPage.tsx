import {
	Card,
	SimpleGrid,
	Stack,
	Title,
	Text,
	Button,
	Group,
} from "@mantine/core";
import { ProductList } from "../components/ProductList";
import { useDBFiltered } from "../utils/useDB";

export function MainPage() {
	let filterQuery = useDBFiltered({
		filter: `name ~ "%"`,
	});

	return (
		<Stack>
			<Title size={"h2"} weight="bold">
				Sell
			</Title>
			<SimpleGrid cols={2}>
				<ProductList
					data={filterQuery.data}
					loading={filterQuery.loading}
				></ProductList>
				<Card>
					<Stack spacing={"md"}>
						<Group position="apart">
							<Title size={"h3"}>Customer</Title>
						</Group>
						<Stack spacing={"sm"}>
							<Text>QTY 1 - item1</Text>
							<Text>QTY 2 - item1</Text>
						</Stack>
						<Group position="apart">
							<Title size={"h3"}>Total</Title>
							<Button>Checkout</Button>
						</Group>
					</Stack>
				</Card>
			</SimpleGrid>
		</Stack>
	);
}
