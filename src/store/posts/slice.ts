import type {RootState} from "../store.ts";
import type { State, Post } from "./interfaces.ts";
import {createSlice} from "@reduxjs/toolkit";

const initialState: State = {
	list: [],
	status: {
		pending: false,
		error: null,
	}
}

export const postsSlice = createSlice({
	name: "posts",
	initialState,
	reducers: ({asyncThunk, reducer}) => ({
		createPost: asyncThunk<Omit<Post, "id">, Post, { rejectValue: { message: string; } }>(
			async (post, {fulfillWithValue, rejectWithValue, getState}) => {
				const state = (getState() as RootState).posts;
				if (state.list.length >= 3) return rejectWithValue({message: "List is full"});
				const response = await (new Promise<Post>((res) => setTimeout(() => res({
					...post,
					id: Date.now()
				}), 3000)));
				return fulfillWithValue(response);
			},
			{
				pending: state => {
					state.status.pending = true;
					state.status.error = initialState.status.error;
				},
				rejected: (state, {payload}) => {
					state.status.pending = false;
					if (payload?.message) state.status.error = payload.message;
				},
				fulfilled: (state, {payload}) => {
					state.status.pending = false;
					state.list = [...state.list, payload];
				}
			}
		),
		removePost: reducer<{ id: number; }>((state, {payload: {id}}) => {
			state.list = state.list.filter(({id: postId}) => postId !== id);
		})
	}),
})

export const { createPost, removePost } = postsSlice.actions;
