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
import { settingsActions, useAppDispatch, useAppSelector } from "./stores/root";
import { useLocation } from "wouter";

// the overall layout of the app
export function Layout(props: { children: ReactNode; rtl: boolean }) {
	return (
		<div dir={props.rtl ? "rtl" : "ltr"}>
			<AppShell layout="alt" padding={"xl"} navbar={<NavBar></NavBar>}>
				{props.children}
			</AppShell>
		</div>
	);
}

function NavBar() {
	// get browser url (i.e. /products)
	let [browserURL] = useLocation();

	// get settings state and dispatch
	let settingsState = useAppSelector((state) => state.settings);
	let dispatch = useAppDispatch();

	return (
		<Navbar width={{ base: 50, sm: 75 }} p="md">
			<Stack align={"center"} justify={"space-between"} spacing={16} h={"100%"}>
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
								<ActionIcon
									variant={
										browserURL === item.link ? "gradient" : "transparent"
									}
									size="lg"
									p={2}
								>
									{item.icon}
								</ActionIcon>
							</Link>
						);
					})}
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
								onClick={() => dispatch(settingsActions.toggleRightToLeft())}
							>
								{settingsState.rightToLeft ? "Right To Left" : "Left To Right"}
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
	);
}
