import {
	Card,
	Stack,
	Title,
	Text,
	Button,
	Group,
	Grid,
	Divider,
	NumberInput,
} from "@mantine/core";
import { useTranslation } from "react-i18next";
import { ProductList } from "../components/ProductList";
import { TitleText } from "../components/TitleText";
import { apply, CheckoutState } from "../stores/checkout";
import {
	checkoutActions,
	checkoutSelector,
	useAppDispatch,
	useAppSelector,
} from "../stores/root";
import { useCollection } from "../utils/pbase";

export function MainPage() {
	let query = useCollection("products");
	const { t } = useTranslation();
	let checkoutState: CheckoutState = useAppSelector(checkoutSelector);
	let dispatch = useAppDispatch();

	return (
		<Stack h={"100%"}>
			<TitleText title={t("Sell")} />
			<Grid>
				<Grid.Col span={12} sm={7}>
					<ProductList
						data={query.data}
						loading={query.loading}
						checkout
						smaller
						name={""}
					></ProductList>
				</Grid.Col>
				<Grid.Col span={12} sm={5}>
					<Stack spacing={"md"} justify={"space-between"}>
						<Group position="apart">
							<Title size={"h3"}>{t("Customer")}</Title>
						</Group>
						{/* Checkout items from store */}
						<Stack spacing={"sm"}>
							{checkoutState.items.length === 0 ? (
								<Text>{t("No items in checkout")}</Text>
							) : (
								checkoutState.items.map((chItem) => (
									<Card py="xs" key={chItem.id}>
										<Group position="apart">
											<Group spacing={"sm"}>
												<Text weight={"bold"}>{chItem.price}</Text>
												<Divider size="md" orientation="vertical"></Divider>
												<Text weight={"bold"}>{chItem.name}</Text>
											</Group>
											<Group spacing={"sm"}>
												<NumberInput
													min={1}
													sx={{ width: "4rem" }}
													value={chItem.qty}
													onChange={(evt: any) => {
														dispatch(
															checkoutActions.setItemQty({
																id: chItem.id,
																qty: evt,
															}),
														);
													}}
												></NumberInput>
											</Group>
										</Group>
									</Card>
								))
							)}
						</Stack>
						{/* Checkout items from store end */}
						<Group position="apart" align={"center"}>
							<Card py={"xs"}>
								<Group>
									<Group spacing={"xs"}>
										<Text weight={"bold"}>{checkoutState.total}</Text>
										<Text weight={"bold"}>{t("in total")}</Text>
									</Group>
									<Divider size="md" orientation="vertical"></Divider>
									<Group spacing={"xs"}>
										<Text weight={"bold"}>
											{checkoutState.items.reduce((total, item) => {
												total += item.qty;
												return total;
											}, 0)}
										</Text>
										<Text weight={"bold"}>{t("items")}</Text>
										{/* <Title size={"h4"}>{checkoutState.total}</Title>
									<Title size={"h4"}>{t("in total")}</Title> */}
									</Group>
								</Group>
							</Card>
							<Group>
								<Button
									variant="light"
									onClick={() => dispatch(checkoutActions.clear())}
								>
									{t("Clear")}
								</Button>
								<Button
									variant="light"
									onClick={() => dispatch(apply(checkoutState.items))}
								>
									{t("Checkout")}
								</Button>
							</Group>
						</Group>
					</Stack>
				</Grid.Col>
			</Grid>
		</Stack>
	);
}
