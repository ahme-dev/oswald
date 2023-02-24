import { MinusIcon, PlusIcon } from "@heroicons/react/24/solid";
import {
	Card,
	Stack,
	Title,
	Text,
	Button,
	Group,
	Grid,
	ActionIcon,
} from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { ProductList } from "../components/ProductList";
import { checkoutActions, checkoutSelector } from "../stores/root";
import { usePBFiltered } from "../utils/usePB";

export function MainPage() {
	let filterQuery = usePBFiltered();

	let { items: checkoutItems } = useSelector(checkoutSelector);
	let dispatch = useDispatch();

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
						checkout
					></ProductList>
				</Grid.Col>
				<Grid.Col span={12} md={5}>
					<Stack spacing={"md"} justify={"space-between"}>
						<Group position="apart">
							<Title size={"h3"}>Customer</Title>
						</Group>
						{/* Checkout items from store */}
						<Stack spacing={"sm"}>
							{checkoutItems.length === 0 ? (
								<Text>No items in checkout</Text>
							) : (
								checkoutItems.map((e) => (
									<Card key={e.id}>
										<Group position="apart">
											<Text weight={"bold"}>{e.name}</Text>
											<Group spacing={"sm"}>
												<ActionIcon>
													<MinusIcon></MinusIcon>
												</ActionIcon>
												<Text>{e.qty}</Text>
												<ActionIcon>
													<PlusIcon></PlusIcon>
												</ActionIcon>
											</Group>
										</Group>
									</Card>
								))
							)}
						</Stack>
						{/* Checkout items from store end */}
						<Group position="apart">
							<Title size={"h3"}>Total</Title>
							<Group>
								<Button onClick={() => dispatch(checkoutActions.clear())}>
									Clear
								</Button>
								<Button>Checkout</Button>
							</Group>
						</Group>
					</Stack>
				</Grid.Col>
			</Grid>
		</Stack>
	);
}
