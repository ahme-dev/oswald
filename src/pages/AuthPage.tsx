import {
	Avatar,
	Badge,
	Button,
	Card,
	Center,
	Group,
	Stack,
	Text,
	TextInput,
} from "@mantine/core";
import { Admin, Record } from "pocketbase";
import { useEffect, useState } from "react";
import { useForm } from "@mantine/form";
import { pb } from "../utils/pbase";
import { useTranslation } from "react-i18next";
import { TitleText } from "../components/TitleText";
import { useAppSelector } from "../stores/root";

export function AuthPage() {
	const { t } = useTranslation();

	// user auth state
	let [user, setUser] = useState<Record | Admin | null>();
	let [isLoading, setIsLoading] = useState(false);

	// settings state
	let settingsState = useAppSelector((state) => state.settings);

	// create form and validation
	let form = useForm({
		initialValues: {
			username: "",
			password: "",
		},

		validate: {
			username: (value) =>
				value.length > 4 ? null : t("Username is required"),
			password: (value) =>
				value.length > 4 ? null : t("Password is required"),
		},
	});

	useEffect(() => {
		// get user auth state on startup
		const userAuth = pb.authStore.model;
		setUser(userAuth);

		// everytime the user auth state changes reassign to local state
		pb.authStore.onChange(() => {
			const userAuth = pb.authStore.model;
			setUser(userAuth);
		});
	}, []);

	// try to login with form values
	const doLogin = async () => {
		setIsLoading(true);

		// try to validate the form and if got errors, return
		let feedback = form.validate();
		if (feedback.hasErrors) return;

		try {
			// try to login
			await pb
				.collection("users")
				.authWithPassword(form.values.username, form.values.password);
		} catch {
			// if errors on login with pb, set error on form
			form.setFieldError("username", t("Cannot login"));
		}

		setIsLoading(false);
	};

	// try to logout the user
	const doLogout = async () => pb.authStore.clear();

	// render

	return (
		<>
			<TitleText title={"Auth"} />

			<Center h={"100%"}>
				<Stack spacing={8}>
					<Avatar color={settingsState.color} size="lg" />
					{/* check if user is logged in */}
					{user instanceof Record ? (
						<>
							{/* logged in */}
							<Card>
								<Group spacing={"sm"}>
									<Text weight="bolder" fz="lg">
										{t("Logged in as")}
									</Text>
									<Badge size="xl">{user.username}</Badge>
								</Group>
							</Card>
							<Card>
								<Group spacing={"sm"}>
									<Text weight="bolder" fz="lg">
										{t("Level of permissions")}
									</Text>
									<Badge size="xl">{user.permit}</Badge>
								</Group>
							</Card>
							<Button onClick={doLogout} size="md" loading={isLoading}>
								{t("Logout")}
							</Button>
							{/* logged in end */}
						</>
					) : (
						<>
							{/* unknown */}
							<TextInput
								size="md"
								placeholder={t("username") || "username"}
								disabled={isLoading}
								{...form.getInputProps("username")}
							></TextInput>
							<TextInput
								size="md"
								type={"password"}
								disabled={isLoading}
								placeholder={t("password") || "password"}
								{...form.getInputProps("password")}
							></TextInput>
							<Button size="md" onClick={doLogin} loading={isLoading}>
								{t("Login")}
							</Button>
							{/* unknown end */}
						</>
					)}
				</Stack>
			</Center>
		</>
	);
}
