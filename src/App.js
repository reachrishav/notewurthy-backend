import './App.css'
import './styles.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Blogs from './components/Blogs'

export default function App() {
	return (
		<div className="App">
			<Header />
			<Blogs />
			<Footer />
		</div>
	)
}
