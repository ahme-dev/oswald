import { Global } from "@mantine/core";
import ubuntuKurdish from "../assets/ubuntuKurdish.woff";

export function CustomFonts() {
	return (
		<Global
			styles={[
				{
					"@font-face": {
						fontFamily: "Ubuntu Kurdish",
						src: `url('${ubuntuKurdish}') format("woff")`,
						fontWeight: "normal",
						fontStyle: "normal",
					},
				},
			]}
		></Global>
	);
}
