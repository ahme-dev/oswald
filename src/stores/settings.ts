import { createSlice } from "@reduxjs/toolkit";
import i18n from "../utils/translation";

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

export const settingsSlice = createSlice<SettingsState, SettingsActions>({
	name: "settings",
	initialState: initialSettings,
	reducers: {
		toggleDarkMode: (state) => {
			state.darkMode = !state.darkMode;
		},
		toggleRightToLeft: (state) => {
			state.rightToLeft = !state.rightToLeft;
			const toLang = i18n.language == "ku" ? "en" : "ku";
			i18n.changeLanguage(toLang);
		},
	},
});
