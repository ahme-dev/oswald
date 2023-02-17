import { ReactNode } from "react";
import {
	ActionIcon,
	AppShell,
	Center,
	Flex,
	Header,
	Navbar,
	Stack,
} from "@mantine/core";
import { BookOpenIcon, HomeIcon } from "@heroicons/react/24/solid";

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
								<ActionIcon p={2} size={"lg"} mb={"lg"}>
									<BookOpenIcon></BookOpenIcon>
								</ActionIcon>
								{/* Navigation Items */}
								<ActionIcon p={2} size={"lg"}>
									<HomeIcon></HomeIcon>
								</ActionIcon>
								<ActionIcon p={2} size={"lg"}>
									<HomeIcon></HomeIcon>
								</ActionIcon>
								{/* Navigation Items End */}
							</Stack>
							{/* Upper End */}
							{/* Lower */}
							<ActionIcon size={"lg"}>
								<BookOpenIcon></BookOpenIcon>
							</ActionIcon>
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
