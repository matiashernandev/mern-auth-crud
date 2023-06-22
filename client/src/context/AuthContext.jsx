/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react"
import { registerRequest } from "../api/auth"

export const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [errors, setErrors] = useState([])

  const signup = async (user) => {
    try {
      const res = await registerRequest(user)
      console.log(res.data)
      setUser(res.data)
      setIsAuthenticated(true)
    } catch (error) {
      setErrors(error.response.data)
    }
  }

  return (
    <AuthContext.Provider value={{ signup, user, isAuthenticated, errors }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}