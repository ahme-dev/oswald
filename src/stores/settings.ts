import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import i18n from "../utils/translation";

export const Colours = ["Blue", "Red", "Green", "Indigo", "Teal"];
type ColoursType = "red" | "blue" | "green" | "indigo" | "teal";

// types

export type SettingsState = {
	rightToLeft: boolean;
	darkMode: boolean;
	color: ColoursType;
};

type SettingsActions = {
	toggleRightToLeft: (state: SettingsState) => void;
	toggleDarkMode: (state: SettingsState) => void;
	changeColor: (
		state: SettingsState,
		action: PayloadAction<ColoursType>,
	) => void;
};

// data

export const settingsSlice = createSlice<SettingsState, SettingsActions>({
	name: "settings",
	initialState: {
		rightToLeft: true,
		darkMode: true,
		color: "blue",
	},
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
		changeColor: (state, action) => {
			state.color = action.payload;
		},
	},
});
