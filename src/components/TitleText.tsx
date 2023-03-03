import { Title } from "@mantine/core";
import { useTranslation } from "react-i18next";

export function TitleText(props: { title: string }) {
	const { t } = useTranslation();

	return (
		<Title size={"h2"} weight="bold">
			{t(props.title)}
		</Title>
	);
}
