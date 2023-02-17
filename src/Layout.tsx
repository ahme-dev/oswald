import { ReactNode } from "react";
import { AppShell, Header, Navbar } from "@mantine/core";

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
					<Navbar width={{ base: 100, md: 300 }} p="sm">
						Navbar
					</Navbar>
				}
			>
				{props.children}
			</AppShell>
		</div>
	);
}
