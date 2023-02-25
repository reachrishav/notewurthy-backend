import { useState } from 'react'
import axios from 'axios'

const AddBlog = () => {
	const [data, setData] = useState({ title: '', description: '' })

	const handleSubmit = e => {
		e.preventDefault()
		axios
			.post('/api/addBlog', {
				title: data.title,
				description: data.description,
			})
			.then(res => {
				console.log(res.data)
			})
	}

	const handleChange = e => {
		const newData = { ...data }
		newData[e.target.id] = e.target.value
		setData(newData)
		console.log(newData)
	}

	return (
		<div className="blog-add-form">
			<form onSubmit={e => handleSubmit(e)}>
				<label htmlFor="blogTitle" className="form-item">
					Title
				</label>
				<input
					onChange={e => handleChange(e)}
					id="title"
					type="text"
					className="form-item"
					value={data.title}
					placeholder="Blog Title"
				/>
				<br />
				<label htmlFor="blogDescription" className="form-item">
					Description
				</label>
				<input
					onChange={e => handleChange(e)}
					id="description"
					type="text"
					className="form-item"
					value={data.description}
					placeholder="Blog Description"
				/>
				<br />
				<button className="btn-submit" type="submit">
					Add
				</button>
			</form>
		</div>
	)
}

export default AddBlog
