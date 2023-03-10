import { PencilSquareIcon, PlusIcon } from "@heroicons/react/24/solid";
import {
	ActionIcon,
	Affix,
	Flex,
	Group,
	Input,
	Stack,
	MultiSelect,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { t } from "i18next";
import { useState } from "react";
import { ProductList } from "../components/ProductList";
import { TitleText } from "../components/TitleText";
import {
	useAppDispatch,
	useAppSelector,
	productsActions,
} from "../stores/root";
import { ProductDrawer } from "../components/ProductDrawer";
import { ProductCategoryModal } from "../components/ProductCategoryModal";

export function ProductsPage() {
	let settingsState = useAppSelector((state) => state.settings);
	let productsState = useAppSelector((state) => state.products);

	let dispatch = useAppDispatch();

	let [drawerVisible, setDrawerVisible] = useState(false);
	let [modalVisible, setModalVisible] = useState(false);

	const searchForm = useForm({
		initialValues: {
			name: "",
			categories: [],
			categoriesChanges: 0,
		},
	});

	// render
	return (
		<Stack h={"100%"}>
			<Flex justify={"space-between"} align="center" gap={"lg"}>
				<TitleText title="Products" />
				{/* search section */}
				<Group>
					<ActionIcon
						onClick={() => setModalVisible(true)}
						p={4}
						size="lg"
						variant="light"
						color={settingsState.color}
					>
						<PencilSquareIcon></PencilSquareIcon>
					</ActionIcon>
					<MultiSelect
						placeholder={
							t("Select some categories") || "Select some categories"
						}
						w="18rem"
						value={searchForm.values.categories}
						onChange={(e: any) => {
							searchForm.setFieldValue(
								"categoriesChanges",
								searchForm.values.categoriesChanges + 1,
							);
							searchForm.setFieldValue("categories", e);
						}}
						data={productsState.categories.map((cat) => cat.name)}
					></MultiSelect>

					<Input
						placeholder={t("search for a product")}
						{...searchForm.getInputProps("name")}
					></Input>
				</Group>
				{/* search section end */}
			</Flex>
			<ProductList
				data={productsState.list}
				loading={productsState.loading}
				filterName={searchForm.values.name}
				filterCategories={searchForm.values.categories}
				filterCategoriesChanges={searchForm.values.categoriesChanges}
				itemClickFunc={(product) => {
					//  set edit mode with product info on form and oepn drawer
					dispatch(productsActions.formWithEdit(product));
					setDrawerVisible(true);
				}}
			></ProductList>

			<ProductDrawer
				drawer={drawerVisible}
				drawerSwitch={(to: boolean) => setDrawerVisible(to)}
				modalSwitch={(to: boolean) => setModalVisible(to)}
			></ProductDrawer>

			<ProductCategoryModal
				modal={modalVisible}
				modalSwitch={(to: boolean) => setModalVisible(to)}
			></ProductCategoryModal>

			{/* Add product button */}
			<Affix
				onClick={() => {
					// set add mode with empty form, and open drawer
					dispatch(productsActions.formWithCreate());
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
