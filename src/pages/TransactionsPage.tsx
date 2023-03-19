import { CalendarDaysIcon, CurrencyEuroIcon } from "@heroicons/react/24/solid";
import {
	Accordion,
	ActionIcon,
	Badge,
	Button,
	Card,
	Center,
	Divider,
	Flex,
	Group,
	Loader,
	Stack,
	Text,
} from "@mantine/core";
import { useTranslation } from "react-i18next";
import { TitleText } from "../components/TitleText";
import { useAppDispatch, useAppSelector } from "../stores/root";
import { revertTransaction } from "../stores/transactions";
import { dineroFormat } from "../utils/currency";

export function TransactionsPage() {
	let dispatch = useAppDispatch();
	const { t } = useTranslation();

	// const dispatch = useAppDispatch();
	const transactionsState = useAppSelector((state) => state.transactions);
	const settingsState = useAppSelector((state) => state.settings);

	return (
		<Stack h={"100%"}>
			<Flex justify={"space-between"} align="center" gap={"lg"}>
				<TitleText title="Transactions" />
			</Flex>
			<Stack h={"100%"}>
				<Accordion variant="separated" h={"100%"}>
					{transactionsState.loading ? (
						<Center h={"100%"}>
							<Loader></Loader>
						</Center>
					) : transactionsState.list.length === 0 ? (
						<Center h={"100%"}>
							<Text>{t("No transactions found")}</Text>
						</Center>
					) : (
						transactionsState.list.map((transaction) => {
							return (
								// Single transaction
								<Accordion.Item key={transaction.id} value={transaction.id}>
									<Accordion.Control>
										<Group spacing={"xl"}>
											{transaction.customer.name && (
												<Group spacing={"sm"}>
													<Badge size="lg">{transaction.customer.name}</Badge>
													<Divider size="sm" orientation="vertical"></Divider>
												</Group>
											)}

											<Group spacing={"sm"}>
												<Text>{t("Transaction total")}</Text>
												<Badge
													size="lg"
													pl={0}
													leftSection={
														<ActionIcon color={settingsState.color}>
															<CurrencyEuroIcon />
														</ActionIcon>
													}
												>
													{dineroFormat(
														transaction.transactionProducts.reduce(
															(sum, pr) => sum + pr.qty_sold * pr.price_sold,
															0,
														),
													)}
												</Badge>
											</Group>

											<Divider size="sm" orientation="vertical"></Divider>
											<Group spacing={"sm"}>
												<Text>{t("Date")}</Text>
												<Badge
													size="lg"
													pl={0}
													leftSection={
														<ActionIcon color={settingsState.color}>
															<CalendarDaysIcon></CalendarDaysIcon>
														</ActionIcon>
													}
												>
													{transaction.date}
												</Badge>
											</Group>

											{transaction.wasRefunded && (
												<Badge size="lg">{t("Refunded")}</Badge>
											)}
										</Group>
									</Accordion.Control>
									<Accordion.Panel>
										<Stack spacing={"sm"}>
											{/* Transaction Product list */}
											{transaction.transactionProducts.map((trProduct) => (
												<Card p="xs" withBorder key={trProduct.id}>
													<Group>
														<Group spacing={"xs"}>
															<Text>
																{dineroFormat(
																	trProduct.qty_sold * trProduct.price_sold,
																)}
															</Text>
															<Text>{t("Total")}</Text>
														</Group>
														<Group>
															<Divider orientation="vertical"></Divider>
															<Text>{trProduct.qty_sold}</Text>
															<Text>{t("Qty")}</Text>
															<Divider orientation="vertical"></Divider>
															<Text>{dineroFormat(trProduct.price_sold)}</Text>
															<Text>{t("Price")}</Text>
															<Divider orientation="vertical"></Divider>
														</Group>
														<Text>{trProduct.product.name}</Text>
													</Group>
												</Card>
											))}
											{/* Transaction Product list end */}
											<Group>
												<Button
													disabled={transaction.wasRefunded}
													onClick={() =>
														dispatch(revertTransaction({ id: transaction.id }))
													}
													variant="light"
												>
													{t("Refund")}
												</Button>
											</Group>
										</Stack>
									</Accordion.Panel>
								</Accordion.Item>
								// Single transaction end
							);
						})
					)}
				</Accordion>
			</Stack>
		</Stack>
	);
}
