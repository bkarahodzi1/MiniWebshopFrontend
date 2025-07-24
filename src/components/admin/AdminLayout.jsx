import {useState} from "react"
import {Link, useNavigate, useLocation} from "react-router-dom"
import {useAuth} from "../../contexts/AuthContext"

export default function AdminLayout({children}) {
  const {currentUser, logout} = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate("/admin/login")
  }

  //Highlight the active path
  const isActive = (path) => {
    return location.pathname === path ? "bg-gray-800 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white"
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-white text-xl font-bold">Admin Dashboard</span>
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <Link to="/admin" className={`px-3 py-2 rounded-md text-sm font-medium ${isActive("/admin")}`}>
                    Home
                  </Link>
                  <Link
                    to="/admin/products"
                    className={`px-3 py-2 rounded-md text-sm font-medium ${isActive("/admin/products")}`}
                  >
                    Products
                  </Link>
                  <Link
                    to="/admin/orders"
                    className={`px-3 py-2 rounded-md text-sm font-medium ${isActive("/admin/orders")}`}
                  >
                    Orders
                  </Link>
                  <Link
                    to="/admin/settings"
                    className={`px-3 py-2 rounded-md text-sm font-medium ${isActive("/admin/settings")}`}
                  >
                    Settings
                  </Link>
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-4 flex items-center md:ml-6">
                <div className="relative ml-3">
                  <div className="flex items-center">
                    <span className="text-gray-300 mr-4">Welcome, {currentUser?.username}</span>
                    <button
                      onClick={handleLogout}
                      className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className={`${isMobileMenuOpen ? "hidden" : "block"} h-6 w-6`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <svg
                  className={`${isMobileMenuOpen ? "block" : "hidden"} h-6 w-6`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`${isMobileMenuOpen ? "block" : "hidden"} md:hidden`}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/admin"
              className={`block px-3 py-2 rounded-md text-base font-medium ${isActive("/admin")}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/admin/products"
              className={`block px-3 py-2 rounded-md text-base font-medium ${isActive("/admin/products")}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Products
            </Link>
            <Link
              to="/admin/orders"
              className={`block px-3 py-2 rounded-md text-base font-medium ${isActive("/admin/orders")}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Orders
            </Link>
            <Link
              to="/admin/settings"
              className={`block px-3 py-2 rounded-md text-base font-medium ${isActive("/admin/settings")}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Settings
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-700">
            <div className="flex items-center px-5">
              <div className="ml-3">
                <div className="text-base font-medium leading-none text-white">{currentUser?.username}</div>
              </div>
            </div>
            <div className="mt-3 px-2 space-y-1">
              <button
                onClick={() => {
                  handleLogout()
                  setIsMobileMenuOpen(false)
                }}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">{children}</div>
      </main>
    </div>
  )
}
