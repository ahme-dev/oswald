import { Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { Tooltip, Line, LineChart, ResponsiveContainer, XAxis } from "recharts";
import { TitleText } from "../components/TitleText";
import { useAppSelector } from "../stores/root";

export function OverviewPage() {
	let transactionsState = useAppSelector((state) => state.transactions);
	let [salesByDay, setSalesByDay] =
		useState<{ date: string; total: number }[]>();

	useEffect(() => {
		if (transactionsState.loading) return;

		const dayList = new Map<string, number>();

		// loop through transactions
		transactionsState.list.forEach((t) => {
			// if day is not already in list add it
			if (!dayList.has(t.date.slice(0, 10)))
				dayList.set(t.date.slice(0, 10), 0);

			// get total of the day or 0
			let dayTotal = dayList.get(t.date.slice(0, 10));
			// add transaction total to day total
			dayList.set(t.date.slice(0, 10), dayTotal || 0 + t.total);
		});

		// change map into object array

		let list = [];
		for (const [key, val] of dayList) {
			list.push({
				date: key,
				total: val,
			});
		}

		// set object array unto data
		setSalesByDay(list);
	}, [transactionsState.loading]);

	return (
		<>
			<TitleText title={"Overview"} />

			{transactionsState.loading ? (
				<Text>Loading</Text>
			) : (
				<>
					<ResponsiveContainer>
						<LineChart data={salesByDay}>
							<Line dataKey={"total"} fill="cyan" />
							<Tooltip />
							<XAxis dataKey={"date"} />
						</LineChart>
					</ResponsiveContainer>
				</>
			)}
		</>
	);
}
