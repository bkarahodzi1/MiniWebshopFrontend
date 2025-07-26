import {useState, useEffect} from "react"
import {Link} from "react-router-dom"
import AdminLayout from "../../components/admin/AdminLayout"
import {useProducts} from "../../contexts/ProductContext"

export default function ProductList() {
  const {products, deleteProduct, loadProductsFromBackend} = useProducts()
  const [searchTerm, setSearchTerm] = useState("")
  const [page, setCurrentPage] = useState(1)
  const [sortField, setSortField] = useState("date")
  const [sortDirection, setSortDirection] = useState("desc")
  const [priceFilter, setPriceFilter] = useState({min: "", max: ""})
  const [quantityFilter, setQuantityFilter] = useState({min: "", max: ""})
  const [sortOption, setSortOption] = useState("date_desc") 

  const handleFilter = async (pageNumber = 1) => {
    const filters = {
    name: searchTerm || null,
    min_price: priceFilter.min || null,
    max_price: priceFilter.max || null,
    min_quantity: quantityFilter.min || null,
    sort_by: sortOption || null,
  }


    const newProducts = await loadProductsFromBackend(pageNumber, filters)
    if (newProducts.data) {
      setCurrentPage(pageNumber)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  //Handle sort field/direction change
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
      setSortOption(field + "_" + sortDirection)
    } else {
      setSortField(field)
      setSortDirection("asc")
      setSortOption(field + "_" + sortDirection)
    }
  }

  useEffect(() => {
      handleFilter(1)
    }, [searchTerm, priceFilter, quantityFilter, sortOption, sortField])

  //Handle filter clear
  const clearFilters = () => {
    setSearchTerm("")
    setPriceFilter({min: "", max: ""})
    setQuantityFilter({min: "", max: ""})
  }

  //Handle product deletion
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      deleteProduct(id)
    }
  }

  return (
    <AdminLayout>
      <div className="px-4 py-6 sm:px-0">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">Products</h1>
          <Link
            to="/admin/products/new"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add Product
          </Link>
        </div>

        {/* Filters */}
        <div className="mt-6 bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex-1 min-w-0">
              <h2 className="text-lg font-medium leading-6 text-gray-900">Filters</h2>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            {/* Search */}
            <div className="sm:col-span-6">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700">
                Search
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="search"
                  id="search"
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Search by name or description"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Price Range */}
            <div className="sm:col-span-3">
              <label htmlFor="price-min" className="block text-sm font-medium text-gray-700">
                Price Range
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <input
                  type="number"
                  name="price-min"
                  id="price-min"
                  className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-l-md sm:text-sm border-gray-300"
                  placeholder="Min"
                  value={priceFilter.min}
                  onChange={(e) => setPriceFilter({ ...priceFilter, min: e.target.value })}
                />
                <span className="inline-flex items-center px-3 rounded-none border border-l-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                  to
                </span>
                <input
                  type="number"
                  name="price-max"
                  id="price-max"
                  className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                  placeholder="Max"
                  value={priceFilter.max}
                  onChange={(e) => setPriceFilter({ ...priceFilter, max: e.target.value })}
                />
              </div>
            </div>

            {/* Quantity Range */}
            <div className="sm:col-span-3">
              <label htmlFor="quantity-min" className="block text-sm font-medium text-gray-700">
                Quantity Range
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <input
                  type="number"
                  name="quantity-min"
                  id="quantity-min"
                  className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-l-md sm:text-sm border-gray-300"
                  placeholder="Min"
                  value={quantityFilter.min}
                  onChange={(e) => setQuantityFilter({ ...quantityFilter, min: e.target.value })}
                />
                <span className="inline-flex items-center px-3 rounded-none border border-l-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                  to
                </span>
                <input
                  type="number"
                  name="quantity-max"
                  id="quantity-max"
                  className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                  placeholder="Max"
                  value={quantityFilter.max}
                  onChange={(e) => setQuantityFilter({ ...quantityFilter, max: e.target.value })}
                />
              </div>
            </div>

            <div className="flex justify-between items-center">
              <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={() => clearFilters()}>
                Reset Filters
              </button>
            </div>
          </div>
        </div>

        {/* Product List */}
        <div className="mt-8 flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        <button className="flex items-center focus:outline-none" onClick={() => handleSort("name")}>
                          Product
                          {sortField === "name" && <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>}
                        </button>
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        <button className="flex items-center focus:outline-none" onClick={() => handleSort("price")}>
                          Price
                          {sortField === "price" && <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>}
                        </button>
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        <button className="flex items-center focus:outline-none" onClick={() => handleSort("quantity")}>
                          Quantity
                          {sortField === "quantity" && (
                            <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>
                          )}
                        </button>
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        <button
                          className="flex items-center focus:outline-none"
                          onClick={() => handleSort("date")}
                        >
                          Publish Date
                          {sortField === "date" && (
                            <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>
                          )}
                        </button>
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {products.length > 0 ? (
                      products.map((product) => (
                        <tr key={product.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10">
                                <img
                                  className="h-10 w-10 rounded-full object-cover"
                                  src={product.image_url || "/placeholder.svg"}
                                  alt={product.name}
                                />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{product.name}</div>
                                <div className="text-sm text-gray-500 truncate max-w-xs">{product.description}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">${product.price.toFixed(2)}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{product.quantity}</div>
                            {product.quantity < 10 && (
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                Low stock
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(product.created_at).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <Link
                              to={`/admin/products/${product.id}`}
                              className="text-indigo-600 hover:text-indigo-900 mr-4"
                            >
                              Edit
                            </Link>
                            <button
                              onClick={() => handleDelete(product.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                        
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                          No products found
                        </td>
                      </tr>
                    )}
                    {products.length > 0 ? (
                      <div className="flex justify-between mt-4 space-x-4">
                      <button
                        onClick={() => handleFilter(page - 1)}
                        disabled={page === 1}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded disabled:opacity-50"
                      >
                        ← Previous Page
                      </button>
                      <button
                        onClick={() => handleFilter(page + 1)}
                        disabled={page >= localStorage.getItem("totalPages")}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded disabled:opacity-50"
                      >
                        Next Page →
                      </button>
                    </div>):(<div></div>)}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
