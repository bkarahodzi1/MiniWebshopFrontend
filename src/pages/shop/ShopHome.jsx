import {useState, useEffect} from "react"
import {Link} from "react-router-dom"
import ShopLayout from "../../components/shop/ShopLayout"
import {useProducts} from "../../contexts/ProductContext"

export default function ShopHome() {
  const {products, loadProductsFromBackend} = useProducts()
  const [searchTerm, setSearchTerm] = useState("")
  const [page, setCurrentPage] = useState(1)
  const [priceFilter, setPriceFilter] = useState({min: "", max: ""})
  const [quantityFilter, setQuantityFilter] = useState({min: "", max: ""})
  const [sortOption, setSortOption] = useState("date_desc") //'publishDateAsc', 'publishDateDesc', 'priceAsc', 'priceDesc', 'nameAsc', 'nameDesc'

  useEffect(() => {
    handleFilter(1)
  }, [searchTerm, priceFilter, quantityFilter, sortOption])

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

  return (
    <ShopLayout>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-6">Our Products</h1>

          {/* Filters and Sort */}
          <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6 mb-8">
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              {/* Search */}
              <div className="sm:col-span-3">
                <label htmlFor="search" className="block text-sm font-medium text-gray-700">
                  Search by Name
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="search"
                    id="search"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="e.g., Smartphone"
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

              {/* Quantity Range (for shop, implies availability) */}
              <div className="sm:col-span-3">
                <label htmlFor="quantity-min" className="block text-sm font-medium text-gray-700">
                  Available Quantity (Min)
                </label>
                <div className="mt-1">
                  <input
                    type="number"
                    name="quantity-min"
                    id="quantity-min"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Min available"
                    value={quantityFilter.min}
                    onChange={(e) => setQuantityFilter({ ...quantityFilter, min: e.target.value })}
                  />
                </div>
              </div>

              {/* Sort By */}
              <div className="sm:col-span-3">
                <label htmlFor="sort-by" className="block text-sm font-medium text-gray-700">
                  Sort By
                </label>
                <div className="mt-1">
                  <select
                    id="sort-by"
                    name="sort-by"
                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                  >
                    <option value="date_desc">Newest First</option>
                    <option value="date_asc">Oldest First</option>
                    <option value="price_asc">Price: Low to High</option>
                    <option value="price_desc">Price: High to Low</option>
                    <option value="name_asc">Name: A-Z</option>
                    <option value="name_desc">Name: Z-A</option>
                  </select>
                </div>
              </div>
              <button
              className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={() => {
                setSearchTerm("")
                setPriceFilter({min: "", max: ""})
                setQuantityFilter({min: "", max: ""})
                setSortOption("date_desc")
                }}>
                Clear Filters</button>
            </div>
          </div>

          {/* Product display */}
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <Link to={`/products/${product.id}`}>
                    <img
                      src={product.image_url || "/placeholder.svg?height=300&width=300"}
                      alt={product.name}
                      className="w-full h-48 object-cover"
                    />
                  </Link>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 truncate">
                      <Link to={`/products/${product.id}`} className="hover:text-indigo-600">
                        {product.name}
                      </Link>
                    </h3>
                    <p className="mt-1 text-gray-600">${product.price.toFixed(2)}</p>
                    <p className="mt-2 text-sm text-gray-500 line-clamp-2">{product.description}</p>
                    <div className="mt-4 flex justify-between items-center">
                      <span
                        className={`text-sm font-medium ${product.quantity > 0 ? "text-green-600" : "text-red-600"}`}
                      >
                        {product.quantity > 0 ? `In Stock (${product.quantity})` : "Out of Stock"}
                      </span>
                      <Link
                        to={`/products/${product.id}`}
                        className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
            </div>
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
        </div>
      </div>
    </ShopLayout>
  )
}
