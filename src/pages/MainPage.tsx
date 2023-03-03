import { Stack, Grid } from "@mantine/core";
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
import { useCollection } from "../utils/pbase";

export function MainPage() {
	let query = useCollection("products");
	const { t } = useTranslation();
	let checkoutState = useAppSelector((state) => state.checkout);
	let dispatch = useAppDispatch();

	// function to dispatch checkout action of set quantity
	const qtyFunc = (id: string, qty: number) => {
		dispatch(
			checkoutActions.setItemQty({
				id,
				qty,
			}),
		);
	};

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
					<Checkout
						state={checkoutState}
						apply={() => dispatch(apply(checkoutState.items))}
						clear={() => dispatch(checkoutActions.clear())}
						changeQuantity={qtyFunc}
					></Checkout>
				</Grid.Col>
			</Grid>
		</Stack>
	);
}
