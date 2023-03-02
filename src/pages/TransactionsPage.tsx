import { Card, Flex, Loader, Stack, Text, Title } from "@mantine/core";
import { useCollection } from "../utils/pb";

export function TransactionsPage() {
	let query = useCollection("transactions");

	if (query.loading) return <Loader></Loader>;
	if (!query.data) return <Text>Hi</Text>;

	return (
		<Stack h={"100%"}>
			<Flex justify={"space-between"} align="center" gap={"lg"}>
				<Title size={"h2"} weight="bold">
					Transactions
				</Title>
			</Flex>
			<Stack>
				{query.data.items.map((item) => {
					return <Card key={item.id}>{item.date}</Card>;
				})}
			</Stack>
		</Stack>
	);
}
