import {
	Card,
	SimpleGrid,
	Stack,
	Title,
	Text,
	Button,
	Group,
	Grid,
} from "@mantine/core";
import { ProductList } from "../components/ProductList";
import { useDBFiltered } from "../utils/useDB";

export function MainPage() {
	let filterQuery = useDBFiltered({
		filter: `name ~ "%"`,
	});

	return (
		<Stack h={"100%"}>
			<Title size={"h2"} weight="bold">
				Sell
			</Title>
			<Grid h={"100%"}>
				<Grid.Col span={12} md={7}>
					<ProductList
						data={filterQuery.data}
						loading={filterQuery.loading}
					></ProductList>
				</Grid.Col>
				<Grid.Col span={12} md={5}>
					<Card>
						<Stack spacing={"md"} justify={"space-between"}>
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
				</Grid.Col>
			</Grid>
		</Stack>
	);
}
