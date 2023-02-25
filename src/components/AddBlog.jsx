import React from 'react'

const AddBlog = () => {
	return (
		<div>
			<form action="/">
				<label htmlFor="blogTitle">Title</label>
				<input id="id" type="text" />
				<br />
				<label htmlFor="blogDescription">Description</label>
				<input id="description" type="text" />
				<br />
				<button type="submit">Add</button>
			</form>
		</div>
	)
}

export default AddBlog
