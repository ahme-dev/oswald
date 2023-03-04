import { Grid, Stack, Text } from "@mantine/core";
import { TitleText } from "../components/TitleText";

export function OverviewPage() {
	return (
		<Stack h={"100%"}>
			<TitleText title={"Overview"} />
			<Grid>
				<Grid.Col span={12} sm={7}>
					<Text>Hi</Text>
				</Grid.Col>
				<Grid.Col span={12} sm={5}>
					<Text>Hi</Text>
				</Grid.Col>
			</Grid>
		</Stack>
	);
}
