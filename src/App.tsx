import { createEmotionCache, MantineProvider } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";

import rtlPlugin from "stylis-plugin-rtl";
import { createContext, useContext } from "react";
import { Route } from "wouter";

import { Layout } from "./Layout";
import { AuthPage } from "./pages/AuthPage";
import { HomePage } from "./pages/HomePage";

// right to left caching for emotion
const rtlCache = createEmotionCache({
	key: "mantine-rtl",
	stylisPlugins: [rtlPlugin],
});

// app context to provide rtl and darkmode state
export const AppContext = createContext({
	rtl: false,
	toggleRtl: () => {},
	darkMode: true,
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
		// provide mantine
		<MantineProvider
			withGlobalStyles
			withNormalizeCSS
			theme={{
				colorScheme: darkMode ? "dark" : "light",
				dir: rtl ? "rtl" : "ltr",
			}}
			emotionCache={rtl ? rtlCache : undefined}
		>
			{/* provide context */}
			<AppContext.Provider
				value={{
					rtl: rtl,
					toggleRtl: () => setRtl((old) => !old),
					darkMode: darkMode,
					toggleDarkMode: () => setDarkMode((old) => !old),
				}}
			>
				{/* provide layout */}
				<Layout rtl={rtl}>
					{/* Routes */}
					<Route path="/" component={HomePage} />
					<Route path="/auth" component={AuthPage} />
					{/* Routes end */}
				</Layout>
			</AppContext.Provider>
		</MantineProvider>
	);
}

export default App;
