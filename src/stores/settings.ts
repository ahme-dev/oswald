import { createSlice } from "@reduxjs/toolkit";

type SettingsState = {
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
			console.log("Toggling");
			state.darkMode = !state.darkMode;
		},
		toggleRightToLeft: (state) => {
			state.rightToLeft = !state.rightToLeft;
		},
	},
});
