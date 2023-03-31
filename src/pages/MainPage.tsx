import { XMarkIcon } from "@heroicons/react/24/solid";
import { Grid, Tabs } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Checkout } from "../components/Checkout";
import { ProductList } from "../components/ProductList";
import { TitleText } from "../components/TitleText";
import { createTransaction } from "../stores/checkout";
import {
	checkoutActions,
	productsActions,
	useAppDispatch,
	useAppSelector,
} from "../stores/root";

export function MainPage() {
	const { t } = useTranslation();

	let checkoutState = useAppSelector((state) => state.checkout);
	let productsState = useAppSelector((state) => state.products);
	let dispatch = useAppDispatch();

	useEffect(() => {
		// checkout errors
		if (checkoutState.error !== null) {
			showNotification({
				message: t(checkoutState.error),
				icon: <XMarkIcon />,
				autoClose: false,
				onClose: async () => dispatch(checkoutActions.clearError()),
			});
		}

		// products errors
		if (productsState.error !== null) {
			showNotification({
				message: t(productsState.error),
				icon: <XMarkIcon />,
				autoClose: false,
				onClose: async () => dispatch(productsActions.clearError()),
			});
		}
	}, [checkoutState.error, productsState.error]);

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
		<>
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
						filterName={""}
						filterCategories={[]}
						filterCategoriesChanges={0}
						filterMinPrice={null}
						filterMaxPrice={null}
					></ProductList>
				</Grid.Col>
				<Grid.Col span={12} sm={5}>
					{/* checkout tabs */}
					<Tabs
						variant="pills"
						orientation="vertical"
						placement="right"
						defaultValue={"0"}
						styles={(theme) => ({
							tab: {
								backgroundColor:
									theme.colorScheme === "dark"
										? theme.colors.gray[9]
										: theme.colors.gray[0],
								fontWeight: "bolder",
								border: `1px ${
									theme.colorScheme === "dark"
										? theme.colors.gray[7]
										: theme.colors.gray[4]
								} solid`,
							},
						})}
					>
						<Tabs.List sx={{ paddingLeft: "1rem" }}>
							{checkoutState.checkouts.map((_, i) => (
								<Tabs.Tab
									key={i}
									onClick={() => dispatch(checkoutActions.changeCurrent(i))}
									value={i.toString()}
								>
									{i}
								</Tabs.Tab>
							))}
						</Tabs.List>

						{checkoutState.checkouts.map((checkout, i) => (
							<Tabs.Panel value={i.toString()}>
								<Checkout
									state={checkout}
									processItems={() => {
										showNotification({
											message: t("Saving checkout..."),
											autoClose: 1500,
										});
										dispatch(createTransaction(checkout.items));
									}}
									clearItems={() => dispatch(checkoutActions.clear())}
									changeItemQty={qtyFunc}
								></Checkout>
							</Tabs.Panel>
						))}
					</Tabs>
					{/* checkout tabs end */}
				</Grid.Col>
			</Grid>
		</>
	);
}
