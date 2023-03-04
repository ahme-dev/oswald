import { Stack, Grid } from "@mantine/core";
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
	let checkoutState = useAppSelector((state) => state.checkout);
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
						data={query.data}
						loading={query.loading}
						itemClickFunc={(id, name, price) =>
							dispatch(
								checkoutActions.add({
									id,
									name,
									price,
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
						apply={() => dispatch(apply(checkoutState.items))}
						clear={() => dispatch(checkoutActions.clear())}
						changeQuantity={qtyFunc}
					></Checkout>
				</Grid.Col>
			</Grid>
		</Stack>
	);
}
