"use client";

import { createSlice } from "@reduxjs/toolkit";

function getCategory() {
  let category = "football"; // Default value

  // Check if localStorage is available (i.e., running in a browser environment)
  if (typeof window !== "undefined" && window.localStorage) {
    category = localStorage.getItem("category") || "football";
  }

  return category;
}

const initialState = {
  checkLive: false,
  selectedDate: new Date().toISOString().slice(0, 10),
  sportType: getCategory(),
  interstitialAd: false
};

const fixtureSlice = createSlice({
  name: "fixture",
  initialState,
  reducers: {
    setCheckLive: (state) => {
      state.checkLive = !state.checkLive;
    },
    setSelectedDate: (state, action) => {
      state.selectedDate = action.payload.date;
    },
    setSportType: (state, action) => {
      state.sportType = action.payload;
    },
    setInterstitialAd: (state, action) => {
      state.interstitialAd = action.payload;
    }
  }
});

export const { setCheckLive, setSelectedDate, setSportType, setInterstitialAd } = fixtureSlice.actions;

export default fixtureSlice;
