import { Card, Group, Image, Stack, Text } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { TitleText } from "../components/TitleText";
import AppLogo from "../assets/logo.png";
import { AboutLink } from "../components/AboutLink";
import { useAppSelector } from "../stores/root";

export function AboutPage() {
	const { t } = useTranslation();

	let settingsState = useAppSelector((state) => state.settings);

	return (
		<Stack h={"100%"}>
			<TitleText title={"About"} />
			<Stack align={"center"} justify="center" h={"100%"}>
				<Group>
					<Image
						src={AppLogo}
						height={"20rem"}
						width={"20rem"}
						sx={{ borderRadius: "50%" }}
						bg={settingsState.color}
					/>
					<Stack>
						<Card>
							<Text
								color={settingsState.color}
								weight={"bolder"}
								size={"lg"}
								pb={"xs"}
							>
								{t("Oswald")}
							</Text>
							<Text>{t("POS system for small shops")}</Text>
							<Text>{t("Uses React and Pocketbase")}</Text>
							<Text>{t("Available in Kurdish and English")}</Text>
						</Card>

						<Card>
							<AboutLink
								accompanying="Created by "
								link="https://ahmed.systems"
								title="ahmed.systems"
							/>
							<AboutLink
								accompanying="Open Source on "
								link="https://github.com/ahmeddots/oswald"
								title="github"
							/>
						</Card>
					</Stack>
				</Group>
			</Stack>
		</Stack>
	);
}
