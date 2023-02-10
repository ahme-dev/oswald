import { Button, TextInput } from "@mantine/core";
import { Admin, Record } from "pocketbase";
import { useEffect, useState } from "react";
import { useForm } from "@mantine/form";
import { pb } from "../utils/db";

export function AuthPage() {
	let [user, setUser] = useState<Record | Admin | null>();

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
		pb.authStore.onChange(() => "user changed");

		const userAuth = pb.authStore.model;
		setUser(userAuth);
	}, []);

	const doLogin = async () => {
		await pb
			.collection("users")
			.authWithPassword(form.values.username, form.values.password);
	};

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
