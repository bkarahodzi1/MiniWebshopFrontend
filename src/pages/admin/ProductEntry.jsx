import {useState} from "react"
import {useNavigate} from "react-router-dom"
import AdminLayout from "../../components/admin/AdminLayout"
import {useProducts} from "../../contexts/ProductContext"

export default function ProductEntry() {
  const {addProduct} = useProducts()
  const navigate = useNavigate()

  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    image_url: "http://placeholder",
  })

  const [errors, setErrors] = useState({})

  //Check the input if the field is price or quantity
  const handleChange = (e) => {
    const {name, value} = e.target
    setProduct({
      ...product,
      [name]: name === "price" || name === "quantity" ? Number.parseFloat(value) || "" : value,
    })

    //Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      })
    }
  }

  //Check if an error was made and show it
  const validateForm = () => {
    const newErrors = {}

    if (!product.name.trim()) {
      newErrors.name = "Product name is required"
    }

    if (!product.description.trim()) {
      newErrors.description = "Description is required"
    }

    if (product.price === "" || isNaN(product.price) || product.price <= 0) {
      newErrors.price = "Valid price is required"
    }

    if (product.quantity === "" || isNaN(product.quantity) || product.quantity < 0) {
      newErrors.quantity = "Valid quantity is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    addProduct(product)
    window.confirm("Sucesfully created")
    navigate("/admin/products")
  }

  return (
    <AdminLayout>
      <div className="px-4 py-6 sm:px-0">
        <h1 className="text-2xl font-semibold text-gray-900">Add New Product</h1>

        <div className="mt-6 bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              {/* Product Name */}
              <div className="sm:col-span-6">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Product Name
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${errors.name ? "border-red-500" : ""}`}
                    value={product.name}
                    onChange={handleChange}
                  />
                  {/* Check if there is an error for this field and show it */}
                  {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name}</p>}
                </div>
              </div>

              {/* Image URL */}
              <div className="sm:col-span-6">
                <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                  Image URL (e.g., /placeholder.svg?height=300&width=300)
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="image_url"
                    id="image_url"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    value={product.image_url}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Description */}
              <div className="sm:col-span-6">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <div className="mt-1">
                  <textarea
                    id="description"
                    name="description"
                    rows="3"
                    className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${errors.description ? "border-red-500" : ""}`}
                    value={product.description}
                    onChange={handleChange}
                  ></textarea>
                  {/* Check if there is an error for this field and show it */}
                  {errors.description && <p className="mt-2 text-sm text-red-600">{errors.description}</p>}
                </div>
              </div>

              {/* Price */}
              <div className="sm:col-span-3">
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                  Price ($)
                </label>
                <div className="mt-1">
                  <input
                    type="number"
                    name="price"
                    id="price"
                    step="0.01"
                    className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${errors.price ? "border-red-500" : ""}`}
                    value={product.price}
                    onChange={handleChange}
                  />
                  {/* Check if there is an error for this field and show it */}
                  {errors.price && <p className="mt-2 text-sm text-red-600">{errors.price}</p>}
                </div>
              </div>

              {/* Available Quantity */}
              <div className="sm:col-span-3">
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                  Available Quantity
                </label>
                <div className="mt-1">
                  <input
                    type="number"
                    name="quantity"
                    id="quantity"
                    className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${errors.quantity ? "border-red-500" : ""}`}
                    value={product.quantity}
                    onChange={handleChange}
                  />
                  {/* Check if there is an error for this field and show it */}
                  {errors.quantity && <p className="mt-2 text-sm text-red-600">{errors.quantity}</p>}
                </div>
              </div>
            </div>

            <div className="pt-5">
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => navigate("/admin/products")}
                  className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Save Product
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  )
}
