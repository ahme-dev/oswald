import { Card, Flex, Loader, Stack, Text } from "@mantine/core";
import { TitleText } from "../components/TitleText";
import { useCollection } from "../utils/pbase";

export function TransactionsPage() {
	// get data from transactions collection
	let query = useCollection("transactions");

	// render

	if (query.loading) return <Loader></Loader>;

	if (!query.data) return <Text>No Data</Text>;

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
