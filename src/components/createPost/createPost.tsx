import {useRef} from "react";
import style from "./style.module.scss";
import {useAppDispatch, useAppSelector} from "../../store/store.ts";
import {createPost} from "../../store/posts/postsActions.ts";

export const CreatePost = () => {
	const dispatch = useAppDispatch();
	const ref = useRef<HTMLTextAreaElement>(null);
	const {pending, error} = useAppSelector((state) => state.posts.status);
	const handleCreate = () => {
		if (!ref.current) return;
		const promise = dispatch(createPost({body: ref.current.value}));
		promise.then(() => {
			if (ref.current) ref.current.value = "";
		})
	}

	return (
		<div className={style.createBlock}>
			{error ? <span className={style.error}>{error}</span> : null}
			<div className={[style.createBlock, pending && style.pending].filter(v => v).join(" ")}>
				<textarea ref={ref} className={style.area} placeholder={"CreatePost body"}/>
				<button onClick={handleCreate}>{"posts"}</button>
			</div>
		</div>
	)
}