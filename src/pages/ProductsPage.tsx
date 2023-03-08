import { PlusIcon } from "@heroicons/react/24/solid";
import {
	ActionIcon,
	Affix,
	Drawer,
	Flex,
	Group,
	Input,
	NumberInput,
	Stack,
	TextInput,
	Button,
	SimpleGrid,
	Select,
	Textarea,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { t } from "i18next";
import { useState } from "react";
import { ProductList } from "../components/ProductList";
import { TitleText } from "../components/TitleText";
import { useAppDispatch, useAppSelector } from "../stores/root";
import {
	createProduct,
	editProduct,
	deleteProduct,
	createCategory,
} from "../stores/products";

export function ProductsPage() {
	let settingsState = useAppSelector((state) => state.settings);
	let productsState = useAppSelector((state) => state.products);

	let dispatch = useAppDispatch();

	// search string and drawer visiblity state
	let [search, setSearch] = useState("");
	let [drawerVisible, setDrawerVisible] = useState(false);

	const initialForm = {
		mode: "add",
		id: "",
		name: "",
		price_current: 250,
		quantity_available: 1,
		about: "",
		category: {
			id: "",
			name: "",
		},
	};

	const form = useForm({
		initialValues: initialForm,

		validate: {
			name: (value) => (value.length > 6 ? null : "Name is required"),
			price_current: (value) =>
				value >= 250 ? null : "Price must be 250 or higher",
			quantity_available: (value) =>
				value > 0 ? null : "Quantity is required",
			about: (value) => (value.length > 0 ? null : "About is required"),
		},
	});

	const tryAddProduct = async () => {
		// try to validate the form
		// if got errors, return
		let feedback = form.validate();
		if (feedback.hasErrors) return;

		dispatch(
			createProduct({
				name: form.values.name,
				about: form.values.about,
				category: {
					name: form.values.category.name,
					id: form.values.category.id,
				},
				price_current: form.values.price_current,
				quantity_available: form.values.quantity_available,
			}),
		);

		setDrawerVisible(false);
	};

	const tryEditProduct = async () => {
		// try to validate the form
		// if got errors, return
		let feedback = form.validate();
		if (feedback.hasErrors) return;

		dispatch(
			editProduct({
				id: form.values.id,
				name: form.values.name,
				about: form.values.about,
				category: {
					name: form.values.category.name,
					id: form.values.category.id,
				},
				price_current: form.values.price_current,
				quantity_available: form.values.quantity_available,
			}),
		);

		setDrawerVisible(false);
	};

	const tryDeleteProduct = async () => {
		dispatch(deleteProduct({ id: form.values.id }));

		setDrawerVisible(false);
	};

	// render
	return (
		<Stack h={"100%"}>
			<Flex justify={"space-between"} align="center" gap={"lg"}>
				<TitleText title="Products" />
				<Input
					placeholder={t("search for a product")}
					value={search}
					onInput={(e: any) => setSearch(e.target.value)}
				></Input>
			</Flex>
			<ProductList
				data={productsState.list}
				loading={productsState.loading}
				filterTerms={search}
				itemClickFunc={(product) => {
					//  set edit mode with product info on form and oepn drawer
					form.setValues({
						...product,
						mode: "edit",
					});
					setDrawerVisible(true);
				}}
			></ProductList>

			{/* Drawer for adding / editing a product */}
			<Drawer
				opened={drawerVisible}
				position={settingsState.rightToLeft ? "right" : "left"}
				onClose={() => setDrawerVisible(false)}
				title={
					form.values.mode === "edit" ? t("Edit a product") : t("Add a product")
				}
				overlayOpacity={0.7}
				padding="xl"
				size="xl"
			>
				<Stack>
					<FormElements formObject={form} />

					{form.values.mode === "edit" ? (
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

			{/* Add product button */}
			<Affix
				onClick={() => {
					// set add mode with empty form, and open drawer
					form.setValues({
						...initialForm,
						mode: "add",
					});
					setDrawerVisible(true);
				}}
				position={{ bottom: 20, right: 20 }}
			>
				<ActionIcon
					color={settingsState.color}
					size={"xl"}
					variant="filled"
					radius={"xl"}
					p={8}
				>
					<PlusIcon></PlusIcon>
				</ActionIcon>
			</Affix>
			{/* Add product button end */}
		</Stack>
	);
}

function FormElements(props: { formObject: any }) {
	let productsState = useAppSelector((state) => state.products);
	let dispatch = useAppDispatch();

	return (
		<>
			<TextInput
				withAsterisk
				label={t("Name")}
				placeholder={t("Product name") || "Product name"}
				{...props.formObject.getInputProps("name")}
			/>
			<Select
				label={t("Category")}
				clearable
				{...props.formObject.getInputProps("category.id")}
				onChange={(e) => {
					props.formObject.setFieldValue("category.id", e);
				}}
				data={productsState.categories.map((e) => {
					return {
						value: e.id,
						label: t(e.name) || e.name,
					};
				})}
				searchable
				creatable
				getCreateLabel={(query) => t("Create ") + query}
				onCreate={(query) => {
					const item = { name: query };
					dispatch(createCategory(item));
					return item.name;
				}}
			/>

			<Textarea
				withAsterisk
				label={t("About")}
				placeholder={t("About the product") || "About the product"}
				{...props.formObject.getInputProps("about")}
			/>

			<Group position="apart">
				<Flex direction={"row"} gap="lg">
					<NumberInput
						withAsterisk
						label={t("Price")}
						step={250}
						placeholder={t("Product price") || "Product price"}
						{...props.formObject.getInputProps("price_current")}
					/>
					<NumberInput
						withAsterisk
						label={t("Quantity")}
						placeholder={t("Quantity available") || "Quantity available"}
						{...props.formObject.getInputProps("quantity_available")}
					/>
				</Flex>
			</Group>
		</>
	);
}
