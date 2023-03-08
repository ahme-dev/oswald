import { CurrencyEuroIcon } from "@heroicons/react/24/solid";
import {
	ActionIcon,
	Badge,
	Card,
	Divider,
	Flex,
	Grid,
	Group,
	Loader,
	Stack,
	Text,
} from "@mantine/core";
import { useTranslation } from "react-i18next";
import { TitleText } from "../components/TitleText";
import { useAppSelector } from "../stores/root";
import { dineroFormat } from "../utils/currency";

export function TransactionsPage() {
	const { t } = useTranslation();

	// const dispatch = useAppDispatch();
	const transactionsState = useAppSelector((state) => state.transactions);
	const settingsState = useAppSelector((state) => state.settings);

	return (
		<Stack h={"100%"}>
			<Flex justify={"space-between"} align="center" gap={"lg"}>
				<TitleText title="Transactions" />
			</Flex>
			<Stack>
				{transactionsState.loading ? (
					<Loader></Loader>
				) : (
					transactionsState.list.map((item) => {
						return (
							<Card withBorder key={item.id}>
								<Stack spacing={"sm"}>
									<Group>
										<Badge size="lg">{item.date}</Badge>
										{item.customer.name && (
											<Badge size="lg">{item.customer.name}</Badge>
										)}
									</Group>
									{/* Transaction Product list */}
									{item.transactionProducts.map((trProduct) => (
										<Card p="xs" withBorder key={trProduct.id}>
											<Group>
												<Group>
													<Badge
														pl={0}
														leftSection={
															<ActionIcon color={settingsState.color}>
																<CurrencyEuroIcon />
															</ActionIcon>
														}
														size="lg"
													>
														{dineroFormat(
															trProduct.qty_sold * trProduct.price_sold,
														)}
													</Badge>
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
								</Stack>
							</Card>
						);
					})
				)}
			</Stack>
		</Stack>
	);
}
