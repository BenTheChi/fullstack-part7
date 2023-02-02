import {
	useNavigate
  } from 'react-router-dom'
import { useField } from '../hooks'

const CreateNew = (props) => {
	const navigate = useNavigate()
	const content = useField('content')
	const author = useField('author')
	const info = useField('info')
	const resetArray = [content.reset, author.reset, info.reset];
	delete content.reset
	delete author.reset
	delete info.reset
  
	const handleSubmit = (e) => {
	  e.preventDefault()
	  props.addNew({
		content: content.value,
		author: author.value,
		info: info.value,
		votes: 0
	  })

	  props.newNotification("a new anecdote " + content.value + " has been created");

	  navigate('/')
	}

	const handleReset = (e) => {
		resetArray.forEach( reset => reset())
	}
  
	return (
	  <div>
		<h2>create a new anecdote</h2>
		<form onSubmit={handleSubmit}>
		  <div>
			content
			<input {...content} />
		  </div>
		  <div>
			author
			<input {...author}/>
		  </div>
		  <div>
			url for more info
			<input {...info} />
		  </div>
		  <button>create</button>
		</form>
		<button onClick={handleReset}>reset</button>
	  </div>
	)
  
  }

export default CreateNew;