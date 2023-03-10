import {
	CheckCircleIcon,
	PencilIcon,
	PlusCircleIcon,
	TrashIcon,
} from "@heroicons/react/24/solid";
import {
	ActionIcon,
	Button,
	Flex,
	Group,
	Input,
	Loader,
	Menu,
	Modal,
	Popover,
	Stack,
	Text,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { useTranslation } from "react-i18next";
import {
	createCategory,
	deleteCategory,
	editCategory,
} from "../stores/products";
import { useAppDispatch, useAppSelector } from "../stores/root";

export function ProductCategoryModal(props: {
	modal: boolean;
	modalSwitch: (to: boolean) => void;
}) {
	const { t } = useTranslation();

	// get state and dispatch
	let dispatch = useAppDispatch();
	let settingsState = useAppSelector((state) => state.settings);
	let productsCategoriesLoading = useAppSelector(
		(state) => state.products.loadingCategories,
	);
	let productsCategoriesState = useAppSelector(
		(state) => state.products.categories,
	);

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

	return (
		<Modal
			title={t("Categories")}
			opened={props.modal}
			onClose={() => props.modalSwitch(false)}
		>
			<Stack p={8}>
				{productsCategoriesLoading ? (
					<Loader />
				) : (
					// category list
					productsCategoriesState.map((category) => {
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
	);
}
