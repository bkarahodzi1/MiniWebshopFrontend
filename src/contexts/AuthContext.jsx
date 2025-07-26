import {createContext, useState, useContext, useEffect} from "react"

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({children}) => {
  const [currentUser, setCurrentUser] = useState(null)
  //Loading is true until user login is checked
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    //Check if the user is logged in from localStorage and set if is
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true"
    const storedUser = localStorage.getItem("user")

    if (isAuthenticated && storedUser) {
      setCurrentUser(JSON.parse(storedUser))
    }

    setLoading(false)
  }, [])

  //Login function
  const login = (username, password) => {
    if (username === "admin" && password === "password") {
      const user = { username, role: "admin" }
      localStorage.setItem("isAuthenticated", "true")
      localStorage.setItem("user", JSON.stringify(user))
      setCurrentUser(user)
      return true
    }
    return false
  }

  // Logout function
  const logout = () => {
    localStorage.removeItem("isAuthenticated")
    localStorage.removeItem("user")
    setCurrentUser(null)
  }

  //Pass into context provider so useAuth() users can access it
  const value = {
    currentUser,
    login,
    logout,
    loading,
  }

  return <AuthContext.Provider value = {value}>{!loading && children}</AuthContext.Provider>
}
