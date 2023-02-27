import { createEmotionCache, MantineProvider } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";

import rtlPlugin from "stylis-plugin-rtl";
import { createContext, useContext } from "react";
import { Route } from "wouter";

import { Layout } from "./Layout";
import { AuthPage } from "./pages/AuthPage";
import { MainPage } from "./pages/MainPage";
import { ProductsPage } from "./pages/ProductsPage";
import { TransactionsPage } from "./pages/TransactionsPage";
import { OverviewPage } from "./pages/OverviewPage";
import { Provider, useSelector } from "react-redux";
import { settingsSelector, store } from "./stores/root";

// right to left caching for emotion
const rtlCache = createEmotionCache({
	key: "mantine-rtl",
	stylisPlugins: [rtlPlugin],
});

function App() {
	return (
		<Provider store={store}>
			<AppInner></AppInner>
		</Provider>
	);
}

function AppInner() {
	const settingsState = useSelector(settingsSelector);

	return (
		<MantineProvider
			withGlobalStyles
			withNormalizeCSS
			theme={{
				colorScheme: settingsState.darkMode ? "dark" : "light",
				dir: settingsState.rightToLeft ? "rtl" : "ltr",
			}}
			emotionCache={settingsState.rightToLeft ? rtlCache : undefined}
		>
			<Layout rtl={settingsState.rightToLeft}>
				{/* Routes */}
				<Route path="/" component={MainPage} />
				<Route path="/products" component={ProductsPage} />
				<Route path="/transactions" component={TransactionsPage} />
				<Route path="/overview" component={OverviewPage} />
				<Route path="/auth" component={AuthPage} />
				{/* Routes end */}
			</Layout>
		</MantineProvider>
	);
}

export default App;
