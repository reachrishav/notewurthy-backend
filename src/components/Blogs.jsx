import { useState, useEffect } from 'react'
import axios from 'axios'

export default function Blogs() {
	const [blogs, setBlogs] = useState([])

	useEffect(() => {
		const fetchBlogs = async () => {
			const res = await axios.get('/api/fetchBlogs')
			setBlogs(res.data)
		}
		fetchBlogs()
	}, [])

	return (
		<div>
			{blogs.map(blog => (
				<div key={blog.title}>{blog.title}</div>
			))}
		</div>
	)
}
