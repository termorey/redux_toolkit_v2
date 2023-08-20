import style from "./style.module.scss";
import {useAppDispatch, useAppSelector} from "store/store.ts";
import {removePost} from "store/posts/slice.ts";

export const PostsList = () => {
	const dispatch = useAppDispatch();
	const posts = useAppSelector((state) => state.posts.list);
	const handleRemove: (id: number) => () => void = (id) => () => {
		dispatch(removePost({id}));
	}

	return (
		<div className={style.list}>
			{posts.map((post) =>
				<div className={style.post} key={post.id}>
					<h3>{`ID: ${post.id}`}</h3>
					<p>{post.body}</p>
					<button className={style.removeBtn} onClick={handleRemove(post.id)}>{"remove"}</button>
				</div>
			)}
		</div>
	)
}