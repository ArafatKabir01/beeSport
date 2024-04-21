import { createSlice } from '@reduxjs/toolkit';

interface IAuthState {
  lang: string;
}

const initialState: IAuthState = {
  lang: 'en',
};

const langSlice = createSlice({
  name: 'lang',
  initialState,
  reducers: {
    preferredLang: (state, action) => {
      state.lang = action.payload;
    },
  },
});

export const { preferredLang } = langSlice.actions;

export default langSlice;
