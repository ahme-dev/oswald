import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
	ku: {
		translation: {
			Totalling: "بە گشتی",
			Customer: "کڕیار",
			Sell: "بفرۆشە",
			"No items in checkout": "هیچ شتێکت دانەنراوە",
		},
	},
};

i18n.use(initReactI18next).init({
	resources: resources,
	lng: "ku",
	interpolation: {
		escapeValue: false,
	},
});

export default i18n;
