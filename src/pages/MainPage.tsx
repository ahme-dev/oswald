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
	Divider,
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
				<Grid.Col span={12} sm={7}>
					<ProductList
						data={filterQuery.data}
						loading={filterQuery.loading}
						checkout
						smaller
					></ProductList>
				</Grid.Col>
				<Grid.Col span={12} sm={5}>
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
											<Group>
												<Text weight={"bold"}>2500</Text>
												<Divider size="md" orientation="vertical"></Divider>
												<Text weight={"bold"}>{e.name}</Text>
											</Group>
											<Group spacing={"sm"}>
												<ActionIcon variant="filled" size={"sm"}>
													<MinusIcon></MinusIcon>
												</ActionIcon>
												<Text>{e.qty}</Text>
												<ActionIcon variant="filled" size={"sm"}>
													<PlusIcon></PlusIcon>
												</ActionIcon>
											</Group>
										</Group>
									</Card>
								))
							)}
						</Stack>
						{/* Checkout items from store end */}
						<Group position="apart" align={"center"}>
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
