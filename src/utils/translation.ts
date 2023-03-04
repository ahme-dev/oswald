import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
	ku: {
		translation: {
			Colour: "ڕەنگ",
			Red: "سوور",
			Blue: "شین",
			Green: "سەوز",
			Indigo: "مۆر",
			Teal: "پیرۆزەیی",

			"in total": "بە گشتی",
			items: "بەرهەم",
			Customer: "کڕیار",
			Sell: "بفرۆشە",
			"No items in checkout": "هیچ بەرهەمێک هەڵنەبژێردراوە",
			Clear: "بەتاڵبکرەوە",
			Checkout: "پەسەندبکە",

			"Product name": "ناوی بەرهەم",
			Products: "بەرهەمەکان",
			"search for a product": "بەدوای بەرهەمێکدا بگەڕێ",
			"No results for the search": "گەڕانەکە هیچ ئەنجامێکی نەهێنایەوە",
			"Add a product": "بەرهەمێک زیادبکە",
			"Product price": "نرخی بەرهەم",
			"Quantity available": "عەدەدی بەردەست",
			"About the product": "دەربارەی بەرهەم",

			Quantity: "عەدەد",
			Add: "زیادیبکە",
			Name: "ناو",
			About: "دەربارە",
			Price: "نرخ",

			Transactions: "مامەڵەکان",

			username: "ناوی بەکارهێنەر",
			password: "وشەی نهێنی",
			Login: "بچۆرەناو",
			"Cannot login": "ناتوانیت بچیتە ناوەوە",
			"Username is required": "پێویستە ناوێک داخڵ بکەیت",
			"Password is required": "پێویستە وشەی نهێنی داخڵ بکەیت",

			Overview: "گشتی",
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
