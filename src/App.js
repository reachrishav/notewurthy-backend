import './App.css'
import './styles.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Blogs from './components/Blogs'
import AddBlog from './components/AddBlog'

export default function App() {
	return (
		<div className="App">
			<Header />
			<AddBlog />
			<Blogs />
			<Footer />
		</div>
	)
}
