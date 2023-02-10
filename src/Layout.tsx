import { ReactNode } from "react";
import { AppShell, Header, Navbar } from "@mantine/core";

export function Layout(props: { children: ReactNode; rtl: boolean }) {
	return (
		<div dir={props.rtl ? "rtl" : "ltr"}>
			<AppShell
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