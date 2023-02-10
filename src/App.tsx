import { createEmotionCache, MantineProvider } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { createContext, useContext } from "react";
import rtlPlugin from "stylis-plugin-rtl";
import { Hello } from "./components/Hello";

// right to left caching for emotion
const rtlCache = createEmotionCache({
	key: "mantine-rtl",
	stylisPlugins: [rtlPlugin],
});

// app context to provide rtl and darkmode state
export const AppContext = createContext({
	toggleRtl: () => {},
	toggleDarkMode: () => {},
});

// function to abstract the usecontext hook
export const useAppContext = () => useContext(AppContext);

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
			<AppContext.Provider
				value={{
					toggleRtl: () => setRtl((old) => !old),
					toggleDarkMode: () => setDarkMode((old) => !old),
				}}
			>
				<div dir={rtl ? "rtl" : "ltr"}>
					<Hello></Hello>
				</div>
			</AppContext.Provider>
		</MantineProvider>
	);
}

export default App;
