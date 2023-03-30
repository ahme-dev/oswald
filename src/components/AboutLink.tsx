import { Text } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../stores/root";

export function AboutLink(props: {
	title: string;
	link: string;
	accompanying: string;
}) {
	const { t } = useTranslation();

	let settingsState = useAppSelector((state) => state.settings);

	return (
		<Text>
			{t(props.accompanying)}
			<a
				style={{ color: "inherit", textDecoration: "none" }}
				target="_blank"
				href={props.link}
			>
				<Text sx={{ display: "inline" }} color={settingsState.color}>
					{props.title}
				</Text>
			</a>
		</Text>
	);
}
