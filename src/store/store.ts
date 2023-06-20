import type {TypedUseSelectorHook} from "react-redux";
import {useDispatch, useSelector} from "react-redux";
import {configureStore} from "@reduxjs/toolkit";
import {postsReducer} from "./posts/postsReducer.ts";

export const store = configureStore({
	reducer: {
		[postsReducer.name]: postsReducer.reducer,
	}
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;