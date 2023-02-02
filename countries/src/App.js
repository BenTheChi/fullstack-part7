import { useState } from 'react'
import { useCountry } from './hooks'

const useField = (type) => {
	const [value, setValue] = useState('')
   
	const onChange = (event) => {
	  setValue(event.target.value)
	}
   
	return {
	  type,
	  value,
	  onChange
	}
  }

const Country = (props) => {

	if(Object.keys(props.country).length > 0){
		const name = props.country.name.common
		const capital = props.country.capital[0]
		const flag = props.country.flag 
		const population = props.country.population 

		return(
		<div>
			<h1>{name}</h1>
			{capital}<br />
			{flag}<br />
			{population}<br />
		</div>
	)} else {
		return(
			<div>
				No results found
			</div>
		)
	}

}

const App = () => {

	const nameInput = useField('text')
	const [name, setName] = useState('')
	const country = useCountry(name)

	const fetch = (e) => {
		e.preventDefault()
		setName(nameInput.value)
	}

	return (
		<div>
			<form onSubmit={fetch}>
			<input {...nameInput} />
			<button>find</button>
			</form>

			<Country country={country} />

			{/* {Object.keys(country).length > 0 ? (<Country country={country} />) : <></>} */}
		</div>
	)
}

export default App