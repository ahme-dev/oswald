import { ReactNode } from "react";
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
					<Popover>
						<Popover.Target>
							<ActionIcon size={"lg"}>
								<CogIcon></CogIcon>
							</ActionIcon>
						</Popover.Target>
						<Popover.Dropdown>
							<Stack>
								<Group w="100%" position="apart">
									<Text>Theme</Text>
									<Switch
										checked={settingsState.darkMode}
										size="md"
										onLabel={<MoonIcon height={14} />}
										offLabel={<SunIcon height={14} />}
										onChange={() => dispatch(settingsActions.toggleDarkMode())}
									/>
								</Group>
								<Group w="100%" position="apart">
									<Text>RTL</Text>
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
							</Stack>
						</Popover.Dropdown>
					</Popover>
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
