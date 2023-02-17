import { Button, TextInput } from "@mantine/core";
import { Admin, Record } from "pocketbase";
import { useEffect, useState } from "react";
import { useForm } from "@mantine/form";
import { pb } from "../utils/db";

export function AuthPage() {
	// store user auth state
	let [user, setUser] = useState<Record | Admin | null>();

	// create form and validation
	let form = useForm({
		initialValues: {
			username: "",
			password: "",
		},

		validate: {
			username: (value) => (value.length > 0 ? null : "Username is required"),
			password: (value) => (value.length > 0 ? null : "Username is required"),
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
		await pb
			.collection("users")
			.authWithPassword(form.values.username, form.values.password);
	};

	// render

	// return early if user is logged in
	if (user instanceof Record) {
		return (
			<div>
				<h1>Logged in as {user.username}</h1>
			</div>
		);
	}

	return (
		<form onSubmit={form.onSubmit((values) => console.log(values))}>
			<TextInput
				placeholder="username"
				{...form.getInputProps("username")}
			></TextInput>
			<TextInput
				type={"password"}
				placeholder="password"
				{...form.getInputProps("password")}
			></TextInput>
			<Button onClick={doLogin}>Login</Button>
		</form>
	);
}
