import "./App.css"
import Header from "./components/Header"
import Footer from "./components/Footer"
import "bootstrap/dist/css/bootstrap.min.css"
import { Routes, Route } from "react-router-dom"
import Content from "./components/Content"
import Login from "./components/Login"
import Protected from "./components/Protected"
import { useState } from "react"
export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  return (
    <div className='App'>
      <Header
      // setIsViewBlogsVisible={setIsViewBlogsVisible}
      // isViewBlogsVisible={isViewBlogsVisible}
      // setSelectedBlogRef={setSelectedBlogRef}
      />
      {/* <Routes>
          <Route exact path='/home' component={<Content />} />
          <Route path='*' component={() => "Not found"} />
        </Routes> */}
      <Routes>
        <Route
          path='/'
          element={
            <Protected Component={Content} isAuthenticated={isAuthenticated} />
          }
        />
        <Route
          path='/login'
          element={<Login setIsAuthenticated={setIsAuthenticated} />}
        />
        {/* <Route path='*' element={<>Rishav</>} /> */}
      </Routes>
      <Footer />
    </div>
  )
}
