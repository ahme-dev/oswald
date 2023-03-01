import { ReactNode } from "react";
import {
	ActionIcon,
	AppShell,
	Avatar,
	Menu,
	Navbar,
	Stack,
} from "@mantine/core";
import {
	BookOpenIcon,
	ChartPieIcon,
	CogIcon,
	CurrencyDollarIcon,
	LanguageIcon,
	MoonIcon,
	ShoppingCartIcon,
	SunIcon,
	TagIcon,
} from "@heroicons/react/24/solid";
import { Link } from "wouter";
import { useDispatch, useSelector } from "react-redux";
import { settingsActions, settingsSelector } from "./stores/root";
import { SettingsState } from "./stores/settings";

// the overall layout of the app
export function Layout(props: { children: ReactNode; rtl: boolean }) {
	let dispatch = useDispatch();
	let settingsState: SettingsState = useSelector(settingsSelector);

	return (
		<div dir={props.rtl ? "rtl" : "ltr"}>
			<AppShell
				layout="alt"
				padding={"xl"}
				navbar={
					<Navbar width={{ base: 50, sm: 75 }} p="md">
						<Stack
							align={"center"}
							justify={"space-between"}
							spacing={16}
							h={"100%"}
						>
							{/* Upper */}
							<Stack align={"center"} spacing={16}>
								<ActionIcon
									variant="gradient"
									radius={"xl"}
									p={8}
									size={"xl"}
									mb={"md"}
								>
									<BookOpenIcon></BookOpenIcon>
								</ActionIcon>
								{/* Navigation Items */}
								<Link to={"/"}>
									<ActionIcon size={"lg"}>
										<ShoppingCartIcon></ShoppingCartIcon>
									</ActionIcon>
								</Link>
								<Link to={"/products"}>
									<ActionIcon size={"lg"}>
										<TagIcon></TagIcon>
									</ActionIcon>
								</Link>
								<Link to={"/transactions"}>
									<ActionIcon size={"lg"}>
										<CurrencyDollarIcon></CurrencyDollarIcon>
									</ActionIcon>
								</Link>
								<Link to={"/overview"}>
									<ActionIcon size={"lg"}>
										<ChartPieIcon></ChartPieIcon>
									</ActionIcon>
								</Link>
								{/* Navigation Items End */}
							</Stack>
							{/* Upper End */}
							{/* Lower */}
							<Stack align={"center"} spacing={16}>
								<Menu>
									<Menu.Target>
										<ActionIcon size={"lg"}>
											<CogIcon></CogIcon>
										</ActionIcon>
									</Menu.Target>
									<Menu.Dropdown>
										<Menu.Item
											icon={
												settingsState.darkMode ? (
													<MoonIcon height={14}></MoonIcon>
												) : (
													<SunIcon height={14} />
												)
											}
											onClick={() => dispatch(settingsActions.toggleDarkMode())}
										>
											{settingsState.darkMode ? "Dark Theme" : "Light Theme"}
										</Menu.Item>
										<Menu.Item
											icon={<LanguageIcon height={16} />}
											onClick={() =>
												dispatch(settingsActions.toggleRightToLeft())
											}
										>
											{settingsState.rightToLeft
												? "Right To Left"
												: "Left To Right"}
										</Menu.Item>
									</Menu.Dropdown>
								</Menu>
								<Link to={"/auth"}>
									<Avatar
										style={{ cursor: "pointer" }}
										radius="xl"
										variant="gradient"
									/>
								</Link>
							</Stack>
							{/* Lower End */}
						</Stack>
					</Navbar>
				}
			>
				{props.children}
			</AppShell>
		</div>
	);
}
