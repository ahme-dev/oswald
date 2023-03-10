import {
	CheckCircleIcon,
	PencilIcon,
	PencilSquareIcon,
	PlusCircleIcon,
	PlusIcon,
	TrashIcon,
} from "@heroicons/react/24/solid";
import {
	ActionIcon,
	Affix,
	Flex,
	Group,
	Input,
	Stack,
	Button,
	Modal,
	Popover,
	Text,
	Loader,
	Menu,
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
import {
	createCategory,
	editCategory,
	deleteCategory,
} from "../stores/products";
import { showNotification } from "@mantine/notifications";
import { ProductDrawer } from "../components/ProductDrawer";

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

	const categoryForm = useForm({
		initialValues: {
			name: "",
			id: "",
		},

		validate: {
			name: (value) => (value.length > 6 ? null : "Name is required"),
			id: (value) => (value.length > 1 ? null : "ID is required"),
		},
	});

	const tryEditCategory = async () => {
		showNotification({ message: t("Editing category..."), autoClose: 1500 });

		dispatch(
			editCategory({
				id: categoryForm.values.id,
				name: categoryForm.values.name,
			}),
		);
	};

	const tryAddCategory = async () => {
		showNotification({ message: t("Adding category..."), autoClose: 1500 });

		dispatch(createCategory({ name: categoryForm.values.name }));
	};

	const tryDeleteCategory = async (id: string) => {
		showNotification({ message: t("Deleting category..."), autoClose: 1500 });

		dispatch(deleteCategory({ id: id }));
	};

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

			{/* Category add/edit/remove modal */}
			<Modal
				title={t("Categories")}
				opened={modalVisible}
				onClose={() => setModalVisible(false)}
			>
				<Stack p={8}>
					{productsState.loading ? (
						<Loader />
					) : (
						// category list
						productsState.categories.map((category) => {
							return (
								<Group key={category.id} position="apart">
									<Text>{category.name}</Text>
									<Group spacing={"sm"}>
										{/* category edit */}
										<Menu width={200} shadow="sm">
											<Menu.Target>
												<ActionIcon
													p={2}
													onClick={() => {
														categoryForm.setValues({
															id: category.id,
															name: category.name,
														});
													}}
													color={settingsState.color}
													variant="light"
												>
													<PencilIcon></PencilIcon>
												</ActionIcon>
											</Menu.Target>
											<Menu.Dropdown>
												<Stack p={8} spacing="xs">
													<Text>{t("Change name")}</Text>
													<Flex align={"center"} gap={"sm"}>
														<Input
															variant="filled"
															placeholder={category.name}
															{...categoryForm.getInputProps("name")}
														></Input>
														<ActionIcon
															onClick={() => tryEditCategory()}
															size="lg"
															variant="light"
															color={settingsState.color}
															p={2}
														>
															<CheckCircleIcon></CheckCircleIcon>
														</ActionIcon>
													</Flex>
												</Stack>
											</Menu.Dropdown>
										</Menu>
										{/* category edit end */}
										{/* category trash */}
										<ActionIcon
											p={2}
											color={settingsState.color}
											onClick={() => tryDeleteCategory(category.id)}
											variant="light"
										>
											<TrashIcon></TrashIcon>
										</ActionIcon>
										{/* category trash end */}
									</Group>
								</Group>
							);
						})
						// category list end
					)}
					{/* category add */}
					<Flex justify="center">
						<Popover width={200} shadow="sm">
							<Popover.Target>
								<Group>
									<Button
										onClick={() => categoryForm.setValues({ id: "", name: "" })}
									>
										Add Category
									</Button>
								</Group>
							</Popover.Target>
							<Popover.Dropdown>
								<Stack spacing="xs">
									<Text>{t("New name")}</Text>
									<Flex align={"center"} gap={"sm"}>
										<Input
											{...categoryForm.getInputProps("name")}
											variant="filled"
										></Input>
										<ActionIcon
											onClick={() => tryAddCategory()}
											size="lg"
											variant="light"
											color={settingsState.color}
											p={2}
										>
											<PlusCircleIcon></PlusCircleIcon>
										</ActionIcon>
									</Flex>
								</Stack>
							</Popover.Dropdown>
						</Popover>
					</Flex>
					{/* category add end */}
				</Stack>
			</Modal>

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
