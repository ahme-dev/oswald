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
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { t } from "i18next";
import { useState } from "react";
import { ProductList } from "../components/ProductList";
import { TitleText } from "../components/TitleText";
import { useAppSelector } from "../stores/root";
import { createProduct, useCollection } from "../utils/pbase";

export function ProductsPage() {
	let settingsState = useAppSelector((state) => state.settings);

	// search string and create drawe state
	let [search, setSearch] = useState("");
	let [showDrawer, setShowDrawer] = useState(false);

	const form = useForm({
		initialValues: {
			name: "",
			price: 1000,
			quantity: 1,
			about: "",
		},

		validate: {
			name: (value) => (value.length > 0 ? null : "Name is required"),
			price: (value) => (value > 0 ? null : "Price is required"),
			quantity: (value) => (value > 0 ? null : "Quantity is required"),
			about: (value) => (value.length > 0 ? null : "About is required"),
		},
	});

	const tryCreateProduct = async () => {
		// try to validate the form
		// if got errors, return
		let feedback = form.validate();
		if (feedback.hasErrors) return;

		try {
			// create a new product using the values
			createProduct(
				form.values.name,
				form.values.price,
				form.values.quantity,
				form.values.about,
			);
		} catch (e) {
			console.log("Error in tryCreateProduct", e);
		}

		setShowDrawer(false);
	};

	// get data from products collection
	let query = useCollection("products");

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
				data={query.data}
				loading={query.loading}
				name={search}
				itemClickFunc={(id, name, price) => {
					console.log("clicked ", name, price);
				}}
			></ProductList>

			<Affix
				onClick={() => setShowDrawer(true)}
				position={{ bottom: 20, right: 20 }}
			>
				<ActionIcon size={"xl"} variant="gradient" radius={"xl"} p={8}>
					<PlusIcon></PlusIcon>
				</ActionIcon>
			</Affix>

			<Drawer
				opened={showDrawer}
				position={settingsState.rightToLeft ? "right" : "left"}
				onClose={() => setShowDrawer(false)}
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
						{...form.getInputProps("name")}
					/>
					<TextInput
						withAsterisk
						label={t("About")}
						placeholder={t("About the product") || "About the product"}
						{...form.getInputProps("about")}
					/>

					<Group position="apart">
						<Flex direction={"row"} gap="lg">
							<NumberInput
								withAsterisk
								label={t("Price")}
								step={250}
								placeholder={t("Product price") || "Product price"}
								{...form.getInputProps("price")}
							/>
							<NumberInput
								withAsterisk
								label={t("Quantity")}
								placeholder={t("Quantity available") || "Quantity available"}
								{...form.getInputProps("quantity")}
							/>
						</Flex>
					</Group>

					<Button onClick={tryCreateProduct} mt={16}>
						{t("Add")}
					</Button>
				</Stack>
			</Drawer>
		</Stack>
	);
}
