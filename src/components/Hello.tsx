import { useAppContext } from "../App";

export function Hello() {
	const { darkMode } = useAppContext();
	return (
		<div>
			<p>{JSON.stringify(darkMode)}</p>
			<h1>Hello</h1>
		</div>
	);
}
