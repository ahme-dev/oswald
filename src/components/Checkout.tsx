import {
	Card,
	Stack,
	Title,
	Text,
	Button,
	Group,
	Divider,
	NumberInput,
} from "@mantine/core";
import { useTranslation } from "react-i18next";
import { CheckoutState } from "../stores/checkout";

export function Checkout(props: {
	state: CheckoutState;
	clear: () => void;
	apply: () => void;
	changeQuantity: (id: string, qty: number) => void;
}) {
	const { t } = useTranslation();

	return (
		<Stack spacing={"md"} justify={"space-between"}>
			<Group position="apart">
				<Title size={"h3"}>{t("Customer")}</Title>
			</Group>
			{/* Checkout items from store */}
			<Stack spacing={"sm"}>
				{props.state.items.length === 0 ? (
					<Text>{t("No items in checkout")}</Text>
				) : (
					props.state.items.map((chItem) => (
						<Card py="xs" key={chItem.id}>
							<Group position="apart">
								<Group spacing={"sm"}>
									<Text weight={"bold"}>{chItem.price}</Text>
									<Divider size="md" orientation="vertical"></Divider>
									<Text weight={"bold"}>{chItem.name}</Text>
								</Group>
								<Group spacing={"sm"}>
									<NumberInput
										min={1}
										sx={{ width: "4rem" }}
										value={chItem.qty}
										onChange={(evt: any) => {
											props.changeQuantity(chItem.id, evt);
										}}
									></NumberInput>
								</Group>
							</Group>
						</Card>
					))
				)}
			</Stack>
			{/* Checkout items from store end */}
			<Group position="apart" align={"center"}>
				<Card py={"xs"}>
					<Group>
						<Group spacing={"xs"}>
							<Text weight={"bold"}>{props.state.total}</Text>
							<Text weight={"bold"}>{t("in total")}</Text>
						</Group>
						<Divider size="md" orientation="vertical"></Divider>
						<Group spacing={"xs"}>
							<Text weight={"bold"}>
								{props.state.items.reduce((total, item) => {
									total += item.qty;
									return total;
								}, 0)}
							</Text>
							<Text weight={"bold"}>{t("items")}</Text>
						</Group>
					</Group>
				</Card>
				{/* Buttons */}
				<Group>
					<Button variant="light" onClick={() => props.clear()}>
						{t("Clear")}
					</Button>
					<Button variant="light" onClick={() => props.apply()}>
						{t("Checkout")}
					</Button>
				</Group>
				{/* Buttons end */}
			</Group>
		</Stack>
	);
}
