import { PencilSquareIcon } from "@heroicons/react/24/solid";
import {
	ActionIcon,
	Button,
	Drawer,
	Flex,
	Group,
	NumberInput,
	Select,
	SimpleGrid,
	Stack,
	Textarea,
	TextInput,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useTranslation } from "react-i18next";
import { createProduct, deleteProduct, editProduct } from "../stores/products";
import {
	productsActions,
	useAppDispatch,
	useAppSelector,
} from "../stores/root";

export function ProductDrawer(props: {
	drawer: boolean;
	drawerSwitch: (to: boolean) => void;
	modalSwitch: (to: boolean) => void;
}) {
	const { t } = useTranslation();

	let dispatch = useAppDispatch();
	let settingsState = useAppSelector((state) => state.settings);
	let productsState = useAppSelector((state) => state.products);
	let productFormState = useAppSelector((state) => state.products.form);

	const tryAddProduct = async () => {
		showNotification({
			message: t("Adding product..."),
			autoClose: 1500,
			loading: true,
		});

		dispatch(createProduct(productFormState));

		props.drawerSwitch(false);
	};

	const tryEditProduct = async () => {
		showNotification({
			message: t("Editing product..."),
			autoClose: 1500,
			loading: true,
		});

		dispatch(editProduct(productFormState));

		props.drawerSwitch(false);
	};

	const tryDeleteProduct = async () => {
		showNotification({
			message: t("Deleting product..."),
			autoClose: 1500,
			loading: true,
		});

		dispatch(deleteProduct({ id: productFormState.id }));

		props.drawerSwitch(false);
	};

	return (
		//  Drawer for adding / editing a product
		<Drawer
			opened={props.drawer}
			position={settingsState.rightToLeft ? "right" : "left"}
			onClose={() => props.drawerSwitch(false)}
			title={
				productFormState.mode === "edit"
					? t("Edit a product")
					: t("Add a product")
			}
			overlayOpacity={0.7}
			padding="xl"
			size="xl"
		>
			<Stack>
				<TextInput
					required
					label={t("Name")}
					placeholder={t("Product name") || "Product name"}
					value={productFormState.name}
					onChange={(e: any) =>
						dispatch(
							productsActions.formSetField({
								field: "name",
								value: e.target.value,
							}),
						)
					}
				/>
				<Flex align={"end"} gap={16}>
					<Select
						sx={{ flexGrow: 1 }}
						label={t("Category")}
						clearable
						placeholder={t("Has no category") || "Has no category"}
						value={productFormState.category.id}
						onChange={(e: any) =>
							dispatch(
								productsActions.formSetField({
									field: "category.id",
									value: e,
								}),
							)
						}
						data={productsState.categories.map((e) => {
							return {
								value: e.id,
								label: t(e.name) || e.name,
							};
						})}
						searchable
					/>
					<ActionIcon
						onClick={() => props.modalSwitch(true)}
						p={4}
						my={2}
						size="lg"
						variant="light"
						color={settingsState.color}
					>
						<PencilSquareIcon></PencilSquareIcon>
					</ActionIcon>
				</Flex>

				<Textarea
					required
					label={t("About")}
					placeholder={t("About the product") || "About the product"}
					value={productFormState.about}
					onChange={(e: any) => {
						dispatch(
							productsActions.formSetField({
								field: "about",
								value: e.target.value,
							}),
						);
					}}
				/>

				<Group position="apart">
					<Flex direction={"row"} gap="lg">
						<NumberInput
							required
							label={t("Price")}
							step={250}
							placeholder={t("Product price") || "Product price"}
							value={productFormState.price_current}
							onChange={(e: any) =>
								dispatch(
									productsActions.formSetField({
										field: "price_current",
										value: e,
									}),
								)
							}
						/>
						<NumberInput
							required
							label={t("Quantity")}
							placeholder={t("Quantity available") || "Quantity available"}
							value={productFormState.quantity_available}
							onChange={(e: any) =>
								dispatch(
									productsActions.formSetField({
										field: "quantity_available",
										value: e,
									}),
								)
							}
						/>
					</Flex>
				</Group>

				{productFormState.mode === "edit" ? (
					<SimpleGrid cols={2} mt={16}>
						<Button onClick={() => tryEditProduct()}>{t("Change")}</Button>
						<Button variant="light" onClick={() => tryDeleteProduct()}>
							{t("Delete")}
						</Button>
					</SimpleGrid>
				) : (
					<Button color={settingsState.color} onClick={tryAddProduct} mt={16}>
						{t("Add")}
					</Button>
				)}
			</Stack>
		</Drawer>
	);
}
