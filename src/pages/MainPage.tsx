import { Stack, Grid } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useTranslation } from "react-i18next";
import { Checkout } from "../components/Checkout";
import { ProductList } from "../components/ProductList";
import { TitleText } from "../components/TitleText";
import { apply } from "../stores/checkout";
import {
	checkoutActions,
	useAppDispatch,
	useAppSelector,
} from "../stores/root";

export function MainPage() {
	const { t } = useTranslation();

	let checkoutState = useAppSelector((state) => state.checkout);
	let productsState = useAppSelector((state) => state.products);

	let dispatch = useAppDispatch();

	// function to dispatch checkout action of set quantity
	const qtyFunc = (index: number, qty: number) => {
		dispatch(
			checkoutActions.setItemQty({
				index,
				qty,
			}),
		);
	};

	return (
		<Stack h={"100%"}>
			<TitleText title={"Sell"} />
			<Grid>
				<Grid.Col span={12} sm={7}>
					<ProductList
						data={productsState.list}
						loading={productsState.loading}
						itemClickFunc={(product) =>
							dispatch(
								checkoutActions.add({
									...product,
								}),
							)
						}
						smaller
						filterTerms={""}
					></ProductList>
				</Grid.Col>
				<Grid.Col span={12} sm={5}>
					<Checkout
						state={checkoutState}
						apply={() => {
							showNotification({
								message: t("Saving checkout..."),
								autoClose: 1500,
							});
							dispatch(apply(checkoutState.items));
						}}
						clear={() => dispatch(checkoutActions.clear())}
						changeQuantity={qtyFunc}
					></Checkout>
				</Grid.Col>
			</Grid>
		</Stack>
	);
}
