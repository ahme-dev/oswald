import { Card, Flex, Loader, Stack, Text } from "@mantine/core";
import { TitleText } from "../components/TitleText";
import { useCollection } from "../utils/pbase";

export function TransactionsPage() {
	let query = useCollection("transactions");

	if (query.loading) return <Loader></Loader>;
	if (!query.data) return <Text>Hi</Text>;

	return (
		<Stack h={"100%"}>
			<Flex justify={"space-between"} align="center" gap={"lg"}>
				<TitleText title="Transactions" />
			</Flex>
			<Stack>
				{query.data.items.map((item) => {
					return <Card key={item.id}>{item.date}</Card>;
				})}
			</Stack>
		</Stack>
	);
}
