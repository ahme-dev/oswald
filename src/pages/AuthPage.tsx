import { Button } from "@mantine/core";
import { useAppContext } from "../App";

export function AuthPage() {
	const { toggleRtl } = useAppContext();
	return (
		<div>
			<h1>Auth</h1>
			<Button onClick={toggleRtl}>RTL</Button>
		</div>
	);
}
