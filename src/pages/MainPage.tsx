import {
	Card,
	SimpleGrid,
	Stack,
	Title,
	Text,
	Button,
	Group,
} from "@mantine/core";

export function MainPage() {
	return (
		<Stack>
			<Title size={"h2"} weight="bold">
				Sell
			</Title>
			<SimpleGrid cols={2}>
				<SimpleGrid
					cols={4}
					spacing="lg"
					breakpoints={[
						{ maxWidth: 980, cols: 3, spacing: "md" },
						{ maxWidth: 755, cols: 2, spacing: "sm" },
						{ maxWidth: 600, cols: 1, spacing: "sm" },
					]}
				>
					<Card>
						<h3>Item 1</h3>
					</Card>
					<Card>
						<h3>Item 2</h3>
					</Card>
				</SimpleGrid>
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
