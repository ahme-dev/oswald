import {
	Badge,
	Card,
	Flex,
	Grid,
	Group,
	List,
	Loader,
	SimpleGrid,
	Stack,
	Text,
	Title,
} from "@mantine/core";
import { TitleText } from "../components/TitleText";
import { useAppDispatch, useAppSelector } from "../stores/root";

export function TransactionsPage() {
	// const dispatch = useAppDispatch();
	const transactionsState = useAppSelector((state) => state.transactions);

	// render

	if (transactionsState.loading) return <Loader></Loader>;

	return (
		<Stack h={"100%"}>
			<Flex justify={"space-between"} align="center" gap={"lg"}>
				<TitleText title="Transactions" />
			</Flex>
			<Stack>
				{transactionsState.list.map((item) => {
					return (
						<Card withBorder key={item.id}>
							<Stack spacing={"sm"}>
								<Group>
									<Badge size="lg">{item.date}</Badge>
									<Badge size="lg">{item.customer.name}</Badge>
								</Group>
								{item.transactionProducts.map((trProduct) => (
									<Card p="xs" withBorder key={trProduct.id}>
										<Grid>
											<Grid.Col span={2}>
												<Text>{trProduct.qty_sold}</Text>
											</Grid.Col>
											<Grid.Col span={2}>
												<Text>{trProduct.price_sold}</Text>
											</Grid.Col>
											<Grid.Col span={8}>
												<Text>{trProduct.product.name}</Text>
											</Grid.Col>
										</Grid>
									</Card>
								))}
							</Stack>
						</Card>
					);
				})}
			</Stack>
		</Stack>
	);
}
