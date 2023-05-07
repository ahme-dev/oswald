import { useLocation } from "wouter";
import { useEffect } from "react";

import { createEmotionCache, MantineProvider } from "@mantine/core";
import {
	NotificationsProvider,
	showNotification,
} from "@mantine/notifications";

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
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useTranslation } from "react-i18next";

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

	// hook to translate
	const { t } = useTranslation();

	// set language on app init according to settings state
	useEffect(() => {
		i18n.changeLanguage(settingsState.rightToLeft ? "ku" : "en");
		dispatch(getProducts());
		dispatch(getCategories());
		dispatch(getTransactions());
	}, []);

	// function to redirect to auth page and notify of not permitted
	const notPermitted = () => {
		// set location (url) to auth page
		setLocation("/auth");

		// notify user
		showNotification({
			message: "You're not permitted to access that page",
			icon: <XMarkIcon />,
			autoClose: 2500,
		});

		// return (render) auth page
		return <AuthPage />;
	};

	const router = () => {
		// no auth pages
		switch (location) {
			case "/about":
				return <AboutPage />;
			case "/auth":
				return <AuthPage />;
		}

		// if not auth, redirect to auth page for other pages
		if (!pb.authStore.isValid || pb.authStore.model === null)
			return notPermitted();

		// else if auth, make pages available
		switch (location) {
			case "/":
				return <MainPage />;
			case "/products":
				return <ProductsPage />;
			case "/transactions":
				return <TransactionsPage />;
			case "/overview": {
				// if not manager, redirect to auth page
				if (pb.authStore.model.permit !== "manager") return notPermitted();
				// else if manager, return overview page
				return <OverviewPage />;
			}
		}

		// if nothing matched, return auth page
		return notPermitted();
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
