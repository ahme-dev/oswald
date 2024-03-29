import { ReactNode, useEffect, useState } from "react";
import {
	ActionIcon,
	AppShell,
	Avatar,
	Text,
	Switch,
	Navbar,
	Stack,
	Popover,
	Group,
	Select,
	Image,
} from "@mantine/core";
import {
	ChartPieIcon,
	CogIcon,
	CurrencyDollarIcon,
	LanguageIcon,
	MoonIcon,
	ShoppingCartIcon,
	SunIcon,
	TagIcon,
} from "@heroicons/react/24/solid";
import AppLogo from "./assets/logo.png";
import { Link } from "wouter";
import { settingsActions, useAppDispatch, useAppSelector } from "./stores/root";
import { useLocation } from "wouter";
import { Colours } from "./stores/settings";
import { useTranslation } from "react-i18next";
import { pb } from "./utils/pbase";

// the overall layout of the app
export function Layout(props: { children: ReactNode; rtl: boolean }) {
	return (
		<div dir={props.rtl ? "rtl" : "ltr"}>
			<AppShell layout="alt" padding={"xl"} navbar={<NavBar></NavBar>}>
				<Stack h={"100%"}>{props.children}</Stack>
			</AppShell>
		</div>
	);
}

function NavBar() {
	const { t } = useTranslation();

	// get browser url (i.e. /products)
	let [browserURL] = useLocation();

	let [auth, setAuth] = useState(pb.authStore.isValid);

	useEffect(() => {
		pb.authStore.onChange(() => setAuth(pb.authStore.isValid));
	}, []);

	// get settings state and dispatch
	let settingsState = useAppSelector((state) => state.settings);
	let dispatch = useAppDispatch();

	return (
		<Navbar width={{ base: 50, sm: 75 }} p="md">
			<Stack align={"center"} justify={"space-between"} spacing={16} h={"100%"}>
				{/* Upper */}
				<Stack align={"center"} spacing={16}>
					<Link to={"/about"}>
						<ActionIcon
							variant="filled"
							color={settingsState.color}
							radius={"xl"}
							p={2}
							size={"xl"}
							mb={"md"}
						>
							<Image src={AppLogo}></Image>
						</ActionIcon>
					</Link>
					{/* Navigation Items */}
					{[
						{
							id: 1,
							link: "/",
							icon: <ShoppingCartIcon />,
						},
						{
							id: 2,
							link: "/products",
							icon: <TagIcon />,
						},
						{
							id: 3,
							link: "/transactions",
							icon: <CurrencyDollarIcon />,
						},
						{
							id: 4,
							link: "/overview",
							icon: <ChartPieIcon />,
						},
					].map((item) => {
						return (
							<Link key={item.id} to={item.link}>
								{browserURL === item.link ? (
									<ActionIcon
										variant={"filled"}
										color={settingsState.color}
										size="lg"
										p={2}
									>
										{item.icon}
									</ActionIcon>
								) : (
									<ActionIcon size="lg" p={2}>
										{item.icon}
									</ActionIcon>
								)}
							</Link>
						);
					})}
					{/* Navigation Items End */}
				</Stack>
				{/* Upper End */}
				{/* Lower */}
				<Stack align={"center"} spacing={16}>
					<Popover disabled={!auth}>
						<Popover.Target>
							<ActionIcon size={"lg"}>
								<CogIcon></CogIcon>
							</ActionIcon>
						</Popover.Target>
						<Popover.Dropdown>
							{/* Settings menu */}
							<Stack>
								<Group w="100%" position="apart">
									<Text>{t("Theme")}</Text>
									<Switch
										checked={settingsState.darkMode}
										size="md"
										onLabel={<MoonIcon height={14} />}
										offLabel={<SunIcon height={14} />}
										onChange={() => dispatch(settingsActions.toggleDarkMode())}
									/>
								</Group>
								<Group w="100%" position="apart">
									<Text>{t("RTL")}</Text>
									<Switch
										checked={settingsState.rightToLeft}
										size="md"
										onLabel={<LanguageIcon height={14} />}
										offLabel={<LanguageIcon height={14} />}
										onChange={() =>
											dispatch(settingsActions.toggleRightToLeft())
										}
									/>
								</Group>
								<Group w="100%" position="apart">
									<Text>{t("Colour")}</Text>
									<Select
										w="6rem"
										data={Colours.map((e) => ({
											value: e.toLowerCase(),
											label: t(e) || e,
										}))}
										onChange={(e: any) =>
											dispatch(settingsActions.changeColor(e))
										}
										value={settingsState.color}
									/>
								</Group>
							</Stack>
							{/* Settings menu end */}
						</Popover.Dropdown>
					</Popover>
					<Link to={"/auth"}>
						<Avatar
							variant="filled"
							color={settingsState.color}
							style={{ cursor: "pointer" }}
							radius="xl"
						/>
					</Link>
				</Stack>
				{/* Lower End */}
			</Stack>
		</Navbar>
	);
}
