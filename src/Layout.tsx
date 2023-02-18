import { ReactNode } from "react";
import {
	ActionIcon,
	Anchor,
	AppShell,
	Avatar,
	Breadcrumbs,
	Flex,
	Header,
	Navbar,
	Stack,
	Title,
} from "@mantine/core";
import {
	AdjustmentsHorizontalIcon,
	BookOpenIcon,
	ChartPieIcon,
	CogIcon,
	CubeIcon,
	CurrencyDollarIcon,
	EyeIcon,
	GifIcon,
	HomeIcon,
	ServerStackIcon,
	ShoppingCartIcon,
	SignalIcon,
	TagIcon,
	UsersIcon,
} from "@heroicons/react/24/solid";
import { Link } from "wouter";
import { MainPage } from "./pages/MainPage";

// the overall layout of the app
export function Layout(props: { children: ReactNode; rtl: boolean }) {
	const items = [
		{ title: "Mantine", href: "#" },
		{ title: "Mantine hooks", href: "#" },
		{ title: "use-id", href: "#" },
	].map((item, index) => (
		<Anchor href={item.href} key={index}>
			{item.title}
		</Anchor>
	));

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
								<ActionIcon size={"lg"}>
									<CogIcon></CogIcon>
								</ActionIcon>
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
