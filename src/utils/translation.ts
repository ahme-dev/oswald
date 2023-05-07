import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
	ku: {
		translation: {
			Oswald: "ئۆزواڵد",

			// settings
			Colour: "ڕەنگ",
			Theme: "شێواز",
			RTL: "ڕاست بۆ چەپ",
			Red: "سوور",
			Blue: "شین",
			Green: "سەوز",
			Indigo: "مۆر",
			Teal: "پیرۆزەیی",

			// checkout
			"in total": "بە گشتی",
			items: "بەرهەم",
			Customer: "کڕیار",
			Sell: "بفرۆشە",
			"No items in checkout": "هیچ بەرهەمێک هەڵنەبژێردراوە",
			Clear: "بەتاڵبکرەوە",
			Checkout: "پەسەندبکە",
			"Remove from list": "لە لیستەکە لایبە",

			// checkout errors
			"Could not add transaction product": "بەرهەمی مامەڵەکە نەکرا زیادبکرێت",
			"Could not get product info": "زانیاری بەرهەمی مامەڵەکە نەکرا وەربگیرێ",
			"Could not substract product quantity":
				"ژمارەی بەرهەمەکە نەکرا کەمبکرێتەوە",
			"Could not create transaction": "مامەڵەکە نەکرا دروستبکرێت",

			// products
			"Product name": "ناوی بەرهەم",
			Products: "بەرهەمەکان",
			"search for a product": "بەدوای بەرهەمێکدا بگەڕێ",
			"No results for the search": "گەڕانەکە هیچ ئەنجامێکی نەهێنایەوە",
			"Add a product": "بەرهەمێک زیادبکە",
			"Product price": "نرخی بەرهەم",
			"Quantity available": "عەدەدی بەردەست",
			"About the product": "دەربارەی بەرهەم",
			"Edit a product": "دەسکاری بەرهەمەکە بکە",
			Delete: "بیسڕەوە",
			Change: "بیگۆڕە",
			Quantity: "عەدەد",
			Qty: "عەدەد",
			Add: "زیادیبکە",
			Name: "ناو",
			About: "دەربارە",
			Category: "جۆری بەرهەم",
			Price: "نرخ",
			Total: "گشتی",
			"Min price": "کەمترین نرخ",
			"Max price": "زۆرترین نرخ",

			// products errors
			"Could not fetch products list": "لیستی بەرهەمەکان نەکرا ڕابکێشرێ",
			"Could not create product": "بەرهەمەکە نەکرا دروستبکرێ",
			"Could not edit product": "بەرهەمەکە نەکرا دەستکاریبکرێ",
			"Could not delete product": "بەرهەمەکە نەکرا بسڕدرێتەوە",
			"Could not get categories list": "لیستی جۆری بەرهەمەکان نەکرا ڕابکێشرێ",
			"Could not create category": "جۆری بەرهەمەکە نەکرا دروستبکرێ",
			"Could not edit category": "جۆری بەرهەمەکە نەکرا دەستکاریبرکێ",
			"Could not delete category": "جۆری بەرهەمەکە نەکرا بسڕدرێتەوە",

			// products categories
			"Select some categories": "جۆری بەرهەم هەڵبژێرە",
			Categories: "جۆرەکانی بەرهەم",
			"New name": "ناوی تازە",
			"Change name": "ناو بگۆڕە",
			"Has no category": "هیچ جۆرێکی بۆ دانەنراوە",

			// transactions
			Transactions: "مامەڵەکان",
			"Transaction total": "کۆی گشتی مامەڵەکە",
			Date: "بەروار",
			Edit: "دەستکاری بکە",
			Refund: "پوچەڵکەرەوە",
			Refunded: "پوچەڵکراوەتەوە",
			"No transactions found": "هیچ مامەڵەیەک نەدۆزرایەوە",

			// transactions errors
			"Could not fetch transactions list": "لیستی مامەڵەکان نەکرا ڕابکێشرێ",
			"Could not find transaction to refund": "مامەڵەکە نەکرا بدۆزرێتەوە",
			"Could not revert product quantity":
				"ژمارەی بەرهەمەکە نەکرا بگەڕێتەوە ڕێژەی خۆی",
			"Could not set refund flag on transaction":
				"مامەڵەکە نەکرا پوچەڵبکرێتەوە",

			// auth
			username: "ناوی بەکارهێنەر",
			password: "وشەی نهێنی",
			Login: "بچۆرەناو",
			"Cannot login": "ناتوانیت بچیتە ناوەوە",
			"Username is required": "پێویستە ناوێک داخڵ بکەیت",
			"Password is required": "پێویستە وشەی نهێنی داخڵ بکەیت",
			Auth: "خۆناساندن",
			"Logged in as": "داخڵبوویت بە ناوی",
			Logout: "بچۆرە دەرەوە",
			"Level of permissions": "ئاستی ڕێگەپێدان",

			// overview
			Overview: "گشتی",

			// on actions
			"Adding product...": "بەرهەمەکە زیاد ئەکرێت...",
			"Editing product...": "بەرهەمەکە دەستکاری ئەکرێت...",
			"Deleting product...": "بەرهەمەکە ئەسڕدرێتەوە...",
			"Adding category...": "جۆرەکە زیاد ئەکرێت...",
			"Editing category...": "جۆرەکە دەسکاری ئەکرێت...",
			"Deleting category...": "جۆرەکە ئەسڕدرێتەوە...",
			"Saving checkout...": "فرۆشەکە جێبەجێدەکرێ...",

			// about
			"Created by ": "دروستکراوە لە لایەن ",
			"Open Source on ": "کۆدی کراوەیە لە ",
			"POS system for small shops": "سیستەمێکی فرۆشتن بۆ فرۆشگای بچووک",
			"Uses React and Pocketbase":
				"دروستکراوە بە بەکارهێنانی ڕیاکت و پۆکێتبەیس",
			"Available in Kurdish and English": "بەردەستە بە زمانی کوردی و ئینگلیزی",
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
