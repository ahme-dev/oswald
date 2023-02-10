import { createEmotionCache, MantineProvider } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import rtlPlugin from "stylis-plugin-rtl";

// right to left caching for emotion
const rtlCache = createEmotionCache({
	key: "mantine-rtl",
	stylisPlugins: [rtlPlugin],
});

function App() {
	// set both rtl and darkmode in localStorage
	const [rtl, setRtl] = useLocalStorage({ key: "rtl", defaultValue: false });
	const [darkMode, setDarkMode] = useLocalStorage({
		key: "darkMode",
		defaultValue: true,
	});

	return (
		<MantineProvider
			withGlobalStyles
			withNormalizeCSS
			theme={{
				colorScheme: darkMode ? "dark" : "light",
				dir: rtl ? "rtl" : "ltr",
			}}
			emotionCache={rtl ? rtlCache : undefined}
		>
			<div dir={rtl ? "rtl" : "ltr"}>
				<h1>Hello</h1>
			</div>
		</MantineProvider>
	);
}

export default App;
