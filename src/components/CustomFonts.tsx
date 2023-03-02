import { Global } from "@mantine/core";
import abdmeh from "../assets/abdmeh.woff";

export function CustomFonts() {
	return (
		<Global
			styles={[
				{
					"@font-face": {
						fontFamily: "AbdMeh",
						src: `url('${abdmeh}') format("woff2")`,
						fontWeight: 700,
						fontStyle: "normal",
					},
				},
			]}
		></Global>
	);
}
