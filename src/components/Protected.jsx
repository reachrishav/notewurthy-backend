import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const Protected = props => {
  const { Component, isAuthenticated } = props
  const navigate = useNavigate()
  useEffect(() => {
    if (!isAuthenticated) navigate("/login")
  })
  return (
    <div>
      <Component />
    </div>
  )
}

export default Protected
