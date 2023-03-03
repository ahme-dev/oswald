import { createSlice } from "@reduxjs/toolkit";
import i18n from "../utils/translation";

// types

export type SettingsState = {
	rightToLeft: boolean;
	darkMode: boolean;
};
type SettingsActions = {
	toggleRightToLeft: (state: SettingsState) => void;
	toggleDarkMode: (state: SettingsState) => void;
};

const initialSettings = {
	rightToLeft: true,
	darkMode: true,
};

// data

export const settingsSlice = createSlice<SettingsState, SettingsActions>({
	name: "settings",
	initialState: initialSettings,
	reducers: {
		// switch between dark and light mode
		toggleDarkMode: (state) => {
			state.darkMode = !state.darkMode;
		},
		// switch between rtl and ltr mode (along with language change)
		toggleRightToLeft: (state) => {
			state.rightToLeft = !state.rightToLeft;
			const toLang = i18n.language == "ku" ? "en" : "ku";
			i18n.changeLanguage(toLang);
		},
	},
});
