import type {RootState} from "../store.ts";
import {createSlice} from "@reduxjs/toolkit";

interface State {
	list: Post[];
	status: Status;
}

interface Status {
	pending: boolean;
	error: null | string;
}

interface Post {
	id: number;
	body: string;
}

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
	reducers: (create) => ({
		createPost: create.asyncThunk<Omit<Post, "id">, Post, { rejectValue: { message: string; } }>(
			async (post, {fulfillWithValue, rejectWithValue, getState}) => {
				const state = (getState() as RootState).posts;
				if (state.list.length >= 10) return rejectWithValue({message: "List is full"});
				const response = await (new Promise<Post>((res) => setTimeout(() => res({
					...post,
					id: state.list.length + 1
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
		removePost: create.reducer<{ id: number; }>((state, {payload: {id}}) => {
			state.list = state.list.filter(({id: postId}) => postId !== id);
		})
	}),
})

export const { createPost, removePost } = postsSlice.actions;
