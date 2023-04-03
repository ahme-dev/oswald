import { QueueListIcon } from "@heroicons/react/24/solid";
import {
	Card,
	Stack,
	Title,
	Text,
	Button,
	Group,
	Divider,
	NumberInput,
	ScrollArea,
	ActionIcon,
	Tooltip,
} from "@mantine/core";
import { useTranslation } from "react-i18next";
import { CheckoutType } from "../stores/checkout";
import { checkoutActions, useAppDispatch } from "../stores/root";
import { dineroFormat } from "../utils/currency";

export function Checkout(props: {
	state: CheckoutType;
	clearItems: () => void;
	processItems: () => void;
	changeItemQty: (index: number, qty: number) => void;
}) {
	const { t } = useTranslation();
	let dispatch = useAppDispatch();

	return (
		<Stack spacing={"md"} justify={"space-between"}>
			<Group position="apart">
				<Title size={"h3"}>{t("Customer")}</Title>
			</Group>
			{/* Checkout items from store */}
			<Stack h={"55vh"}>
				<ScrollArea offsetScrollbars type="auto">
					<Stack spacing={"sm"} h={"100%"}>
						{props.state.items.length === 0 ? (
							<Text>{t("No items in checkout")}</Text>
						) : (
							props.state.items.map((chItem, index: number) => (
								<Card withBorder py="xs" key={chItem.id}>
									<Group position="apart">
										<Group spacing={"sm"}>
											<Text weight={"bold"}>{dineroFormat(chItem.price)}</Text>
											<Divider size="sm" orientation="vertical"></Divider>
											<Text weight={"bold"}>{chItem.name}</Text>
										</Group>
										<Group spacing={"sm"}>
											<NumberInput
												min={1}
												max={chItem.qtyLimit}
												sx={{ width: "4rem" }}
												value={chItem.qtyWanted}
												onChange={(evt: any) => {
													props.changeItemQty(index, evt);
												}}
											></NumberInput>
											<Tooltip position="right" label={t("Remove from list")}>
												<ActionIcon
													size={"sm"}
													onClick={() =>
														dispatch(checkoutActions.remove({ index }))
													}
												>
													<QueueListIcon />
												</ActionIcon>
											</Tooltip>
										</Group>
									</Group>
								</Card>
							))
						)}
					</Stack>
				</ScrollArea>
			</Stack>
			{/* Checkout items from store end */}
			<Group position="apart" align={"center"}>
				<Card withBorder py={"xs"}>
					<Group>
						<Group spacing={"xs"}>
							<Text weight={"bold"}>{dineroFormat(props.state.total)}</Text>
							<Text weight={"bold"}>{t("in total")}</Text>
						</Group>
						<Divider size="sm" orientation="vertical"></Divider>
						<Group spacing={"xs"}>
							<Text weight={"bold"}>{props.state.count}</Text>
							<Text weight={"bold"}>{t("items")}</Text>
						</Group>
					</Group>
				</Card>
				{/* Buttons */}
				<Group>
					<Button variant="filled" onClick={() => props.processItems()}>
						{t("Checkout")}
					</Button>
					<Button variant="light" onClick={() => props.clearItems()}>
						{t("Clear")}
					</Button>
				</Group>
				{/* Buttons end */}
			</Group>
		</Stack>
	);
}
