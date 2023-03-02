import { Title } from "@mantine/core";

export function TitleText(props: { title: string }) {
	return (
		<Title size={"h2"} weight="bold">
			{props.title}
		</Title>
	);
}
