import { Button, Center, Group, Stack, TextInput } from "@mantine/core";
import { Admin, Record } from "pocketbase";
import { useEffect, useState } from "react";
import { useForm } from "@mantine/form";
import { pb } from "../utils/pbase";
import { useTranslation } from "react-i18next";

export function AuthPage() {
	// store user auth state
	let [user, setUser] = useState<Record | Admin | null>();
	const { t } = useTranslation();

	// create form and validation
	let form = useForm({
		initialValues: {
			username: "",
			password: "",
		},

		validate: {
			username: (value) =>
				value.length > 0 ? null : t("Username is required"),
			password: (value) =>
				value.length > 0 ? null : t("Password is required"),
		},
	});

	useEffect(() => {
		// run something on user auth change
		pb.authStore.onChange(() => "user changed");

		// get user auth state and assign to user
		const userAuth = pb.authStore.model;
		setUser(userAuth);
	}, []);

	// try to login with form values
	const doLogin = async () => {
		let feedback = form.validate();

		if (feedback.hasErrors) return;

		try {
			// try to login
			await pb
				.collection("users")
				.authWithPassword(form.values.username, form.values.password);

			// set new login data
			const userAuth = pb.authStore.model;
			setUser(userAuth);
		} catch {
			// if errors on login with pb, set error on form
			form.setFieldError("username", t("Cannot login"));
		}
	};

	// render

	// return early if user is logged in
	if (user instanceof Record) {
		return (
			<Group>
				<h1>{t("Logged in as")}</h1>
				<h1>{user.username}</h1>
			</Group>
		);
	}

	return (
		<Center h={"100%"}>
			<Stack spacing={8}>
				<TextInput
					placeholder={t("username") || "username"}
					{...form.getInputProps("username")}
				></TextInput>
				<TextInput
					type={"password"}
					placeholder={t("password") || "password"}
					{...form.getInputProps("password")}
				></TextInput>
				<Button onClick={doLogin}>{t("Login")}</Button>
			</Stack>
		</Center>
	);
}
