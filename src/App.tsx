import './App.css'
import {CreatePost} from "components/createPost/createPost.tsx";
import {PostsList} from "components/postsList/postsList.tsx";

function App() {
	return (
		<>
			<h2>{"Vite + React + ReduxToolkit@2.0.0"}</h2>
			<div className="card">
				<CreatePost/>
			</div>
			<div className="card">
				<PostsList/>
			</div>
		</>
	)
}

export default App
