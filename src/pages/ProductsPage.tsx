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
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { t } from "i18next";
import { useState } from "react";
import { ProductList } from "../components/ProductList";
import { TitleText } from "../components/TitleText";
import { useAppDispatch, useAppSelector } from "../stores/root";
import { createProduct, editProduct, deleteProduct } from "../stores/products";

export function ProductsPage() {
	let settingsState = useAppSelector((state) => state.settings);
	let productsState = useAppSelector((state) => state.products);

	let dispatch = useAppDispatch();

	// search string and drawer visiblity state
	let [search, setSearch] = useState("");
	let [addDrawerVisible, setAddDrawerVisible] = useState(false);
	let [editDrawerVisible, setEditDrawerVisible] = useState(false);

	const addForm = useForm({
		initialValues: {
			name: "",
			price_current: 1000,
			quantity_available: 1,
			about: "",
			category: {
				id: "",
				name: "",
			},
		},

		validate: {
			name: (value) => (value.length > 0 ? null : "Name is required"),
			price_current: (value) => (value > 0 ? null : "Price is required"),
			quantity_available: (value) =>
				value > 0 ? null : "Quantity is required",
			about: (value) => (value.length > 0 ? null : "About is required"),
		},
	});

	const editForm = useForm({
		initialValues: {
			id: "",
			name: "",
			price_current: 0,
			quantity_available: 0,
			about: "",
			category: {
				id: "",
				name: "",
			},
		},

		validate: {
			name: (value) => (value.length > 0 ? null : "Name is required"),
			price_current: (value) => (value > 0 ? null : "Price is required"),
			quantity_available: (value) =>
				value > 0 ? null : "Quantity is required",
			about: (value) => (value.length > 0 ? null : "About is required"),
		},
	});

	const tryAddProduct = async () => {
		// try to validate the form
		// if got errors, return
		let feedback = addForm.validate();
		if (feedback.hasErrors) return;

		dispatch(
			createProduct({
				...addForm.values,
			}),
		);

		setAddDrawerVisible(false);
	};

	const tryEditProduct = async () => {
		// try to validate the form
		// if got errors, return
		let feedback = editForm.validate();
		if (feedback.hasErrors) return;

		dispatch(
			editProduct({
				...editForm.values,
			}),
		);

		setEditDrawerVisible(false);
	};

	const tryDeleteProduct = async () => {
		dispatch(deleteProduct({ id: editForm.values.id }));

		setEditDrawerVisible(false);
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
					setEditDrawerVisible(true);
					editForm.setValues({
						...product,
					});
				}}
			></ProductList>

			<Affix
				onClick={() => setAddDrawerVisible(true)}
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

			{/* Drawer for editing a product */}
			<Drawer
				opened={editDrawerVisible}
				position={settingsState.rightToLeft ? "right" : "left"}
				onClose={() => setEditDrawerVisible(false)}
				title={t("Edit a product")}
				overlayOpacity={0.7}
				padding="xl"
				size="xl"
			>
				<Stack>
					<TextInput
						withAsterisk
						label={t("Name")}
						placeholder={t("Product name") || "Product name"}
						{...editForm.getInputProps("name")}
					/>
					<Select
						label={t("Category")}
						clearable
						{...editForm.getInputProps("category.id")}
						onChange={(e) => {
							editForm.setFieldValue("category.id", e);
						}}
						data={productsState.categories.map((e) => {
							return {
								value: e.id,
								label: t(e.name) || e.name,
							};
						})}
					/>
					<TextInput
						withAsterisk
						label={t("About")}
						placeholder={t("About the product") || "About the product"}
						{...editForm.getInputProps("about")}
					/>

					<Group position="apart">
						<Flex direction={"row"} gap="lg">
							<NumberInput
								withAsterisk
								label={t("Price")}
								step={250}
								placeholder={t("Product price") || "Product price"}
								{...editForm.getInputProps("price_current")}
							/>
							<NumberInput
								withAsterisk
								label={t("Quantity")}
								placeholder={t("Quantity available") || "Quantity available"}
								{...editForm.getInputProps("quantity_available")}
							/>
						</Flex>
					</Group>

					<SimpleGrid cols={2} mt={16}>
						<Button onClick={() => tryEditProduct()}>{t("Change")}</Button>
						<Button variant="light" onClick={() => tryDeleteProduct()}>
							{t("Delete")}
						</Button>
					</SimpleGrid>
				</Stack>
			</Drawer>

			{/* Drawer for adding a product */}
			<Drawer
				opened={addDrawerVisible}
				position={settingsState.rightToLeft ? "right" : "left"}
				onClose={() => setAddDrawerVisible(false)}
				title={t("Add a product")}
				overlayOpacity={0.7}
				padding="xl"
				size="xl"
			>
				<Stack>
					<TextInput
						withAsterisk
						label={t("Name")}
						placeholder={t("Product name") || "Product name"}
						{...addForm.getInputProps("name")}
					/>
					<Select
						label={t("Category")}
						clearable
						onChange={(e) => {
							addForm.setFieldValue("category.id", e);
						}}
						data={productsState.categories.map((e) => {
							return {
								value: e.id,
								label: t(e.name) || e.name,
							};
						})}
					/>
					<TextInput
						withAsterisk
						label={t("About")}
						placeholder={t("About the product") || "About the product"}
						{...addForm.getInputProps("about")}
					/>

					<Group position="apart">
						<Flex direction={"row"} gap="lg">
							<NumberInput
								withAsterisk
								label={t("Price")}
								step={250}
								placeholder={t("Product price") || "Product price"}
								{...addForm.getInputProps("price")}
							/>
							<NumberInput
								withAsterisk
								label={t("Quantity")}
								placeholder={t("Quantity available") || "Quantity available"}
								{...addForm.getInputProps("quantity")}
							/>
						</Flex>
					</Group>

					<Button color={settingsState.color} onClick={tryAddProduct} mt={16}>
						{t("Add")}
					</Button>
				</Stack>
			</Drawer>
		</Stack>
	);
}
