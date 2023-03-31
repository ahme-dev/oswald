import { useLocation } from "wouter";
import { useEffect } from "react";

import { createEmotionCache, MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";

import { Layout } from "./Layout";
import { AuthPage } from "./pages/AuthPage";
import { MainPage } from "./pages/MainPage";
import { ProductsPage } from "./pages/ProductsPage";
import { TransactionsPage } from "./pages/TransactionsPage";
import { OverviewPage } from "./pages/OverviewPage";

import { CustomFonts } from "./components/CustomFonts";
import rtlPlugin from "stylis-plugin-rtl";
import i18n from "./utils/translation";

import { Provider } from "react-redux";
import { store, useAppDispatch, useAppSelector } from "./stores/root";
import { getCategories, getProducts } from "./stores/products";
import { getTransactions } from "./stores/transactions";
import { AboutPage } from "./pages/AboutPage";
import { pb } from "./utils/pbase";

// right to left caching for emotion
const rtlCache = createEmotionCache({
	key: "mantine-rtl",
	stylisPlugins: [rtlPlugin],
});

function App() {
	return (
		// provide redux store
		<Provider store={store}>
			<AppInner></AppInner>
		</Provider>
	);
}

function AppInner() {
	// get settings state
	const settingsState = useAppSelector((state) => state.settings);
	const dispatch = useAppDispatch();

	// hook to control router
	const [location, setLocation] = useLocation();

	// set language on app init according to settings state
	useEffect(() => {
		i18n.changeLanguage(settingsState.rightToLeft ? "ku" : "en");
		dispatch(getProducts());
		dispatch(getCategories());
		dispatch(getTransactions());
	}, []);

	const router = () => {
		// no auth pages
		switch (location) {
			case "/about":
				return <AboutPage />;
			case "/auth":
				return <AuthPage />;
		}

		// if not authorized return auth page
		if (!pb.authStore.isValid) {
			setLocation("/auth");
			return <AuthPage />;
		}

		// else if auth, make pages available
		switch (location) {
			case "/":
				return <MainPage />;
			case "/products":
				return <ProductsPage />;
			case "/transactions":
				return <TransactionsPage />;
			case "/overview":
				return <OverviewPage />;
			default:
				return <AuthPage />;
		}
	};

	return (
		<MantineProvider
			withGlobalStyles
			withNormalizeCSS
			theme={{
				fontFamily: "Ubuntu Kurdish",
				headings: { fontFamily: "Ubuntu Kurdish" },
				colorScheme: settingsState.darkMode ? "dark" : "light",
				primaryColor: settingsState.color,
				dir: settingsState.rightToLeft ? "rtl" : "ltr",
				loader: "bars",
			}}
			emotionCache={settingsState.rightToLeft ? rtlCache : undefined}
		>
			<NotificationsProvider>
				<CustomFonts></CustomFonts>
				<Layout rtl={settingsState.rightToLeft}>{router()}</Layout>
			</NotificationsProvider>
		</MantineProvider>
	);
}

export default App;
