import type {TypedUseSelectorHook} from "react-redux";
import {useDispatch, useSelector} from "react-redux";
import {configureStore} from "@reduxjs/toolkit";
import {postsSlice} from "./posts/slice.ts";

export const store = configureStore({
	reducer: {
		[postsSlice.name]: postsSlice.reducer,
	}
});

export type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;