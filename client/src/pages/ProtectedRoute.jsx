import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

export default function ProtectedRoute() {
  const { isAuthenticated, loading } = useAuth()

  //console.log(isAuthenticated)

  if (loading) return <h1>Loading</h1>

  if (!loading && !isAuthenticated) return <Navigate to="/login" replace />

  return <Outlet />
}
