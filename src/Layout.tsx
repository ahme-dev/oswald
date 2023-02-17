import { ReactNode } from "react";
import {
	ActionIcon,
	AppShell,
	Avatar,
	Header,
	Navbar,
	Stack,
} from "@mantine/core";
import { BookOpenIcon, HomeIcon } from "@heroicons/react/24/solid";
import { Link } from "wouter";

// the overall layout of the app
export function Layout(props: { children: ReactNode; rtl: boolean }) {
	return (
		<div dir={props.rtl ? "rtl" : "ltr"}>
			<AppShell
				layout="alt"
				header={
					<Header height={60} p="sm">
						Header
					</Header>
				}
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
								<Link to={"/"}>
									<ActionIcon
										variant="gradient"
										radius={"xl"}
										p={8}
										size={"xl"}
										mb={"md"}
									>
										<BookOpenIcon></BookOpenIcon>
									</ActionIcon>
								</Link>
								{/* Navigation Items */}
								<ActionIcon size={"lg"}>
									<HomeIcon></HomeIcon>
								</ActionIcon>
								<ActionIcon size={"lg"}>
									<HomeIcon></HomeIcon>
								</ActionIcon>
								{/* Navigation Items End */}
							</Stack>
							{/* Upper End */}
							{/* Lower */}
							<Link to={"/auth"}>
								<Avatar
									style={{ cursor: "pointer" }}
									radius="xl"
									variant="gradient"
								/>
							</Link>
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
