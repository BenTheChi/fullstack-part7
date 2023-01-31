import {
	useParams
  } from "react-router-dom"
  
const Anecdote = ({ anecdotes }) => {
	const id = useParams().id
	const anecdote = anecdotes.find(n => n.id === Number(id)) 
	return (
		<div>
		<div>{anecdote.content}</div>
		<div>{anecdote.author}</div>
		<div>{anecdote.info}</div>
		</div>
	)
}

export default Anecdote;