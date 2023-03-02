import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
	ku: {
		translation: {
			"in total": "بە گشتی",
			items: "بەرهەم",
			Customer: "کڕیار",
			Sell: "بفرۆشە",
			"No items in checkout": "هیچ بەرهەمێک هەڵنەبژێردراوە",
			Clear: "بەتاڵبکرەوە",
			Checkout: "پەسەندبکە",

			username: "ناوی بەکارهێنەر",
			password: "وشەی نهێنی",
			Login: "بچۆرەناو",
			"Cannot login": "ناتوانیت بچیتە ناوەوە",
			"Username is required": "پێویستە ناوێک داخڵ بکەیت",
			"Password is required": "پێویستە وشەی نهێنی داخڵ بکەیت",
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
