import {useState, useEffect} from "react"
import {useParams, useNavigate} from "react-router-dom"
import AdminLayout from "../../components/admin/AdminLayout"
import {useProducts} from "../../contexts/ProductContext"

export default function ProductDetails() {
  const {id} = useParams()
  const navigate = useNavigate()
  const {getProduct, updateProduct, deleteProduct} = useProducts()

  const [product, setProduct] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    image: "",
  })
  const [errors, setErrors] = useState({})

  //Set the data of the product if exists
  useEffect(() => {
    async function fetchProduct (id) {
      const foundProduct = await getProduct(id)
      if (foundProduct) {
        setProduct(foundProduct)
        setFormData({
          name: foundProduct.name,
          description: foundProduct.description,
          price: foundProduct.price,
          quantity: foundProduct.quantity,
          image: foundProduct.image_url,
        })
      } else {
        setTimeout(() => {
          navigate("/") //Redirect after 3 seconds if product not found
        }, 3000)
      }
    }
    fetchProduct(id)
  }, [id, getProduct, navigate])

  //Handle editing of product details
  const handleChange = (e) => {
    const {name, value} = e.target
    setFormData({
      ...formData,
      [name]: name === "price" || name === "quantity" ? Number.parseFloat(value) || "" : value,
    })

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      })
    }
  }

  //Validate format of input
  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = "Product name is required"
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required"
    }

    if (formData.price === "" || isNaN(formData.price) || formData.price <= 0) {
      newErrors.price = "Valid price is required"
    }

    if (formData.quantity === "" || isNaN(formData.quantity) || formData.quantity < 0) {
      newErrors.quantity = "Valid quantity is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = (e) => {
    e.preventDefault()
    if (!validateForm()) {
      return
    }
    updateProduct(id, formData)
    setProduct({ ...product, ...formData }) // Update local product state
    setIsEditing(false)
  }

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      deleteProduct(id)
      navigate("/admin/products")
    }
  }

  if (!product) {
    return (
      <AdminLayout>
        <div className="px-4 py-6 sm:px-0">
          <p>Loading product details or product not found. Redirecting...</p>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="px-4 py-6 sm:px-0">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">Product Details</h1>
          <div className="flex space-x-4">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Edit Product
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(false)}
                className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
            )}
            <button
              onClick={handleDelete}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Delete Product
            </button>
          </div>
        </div>

        <div className="mt-6 bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Product Information</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">Details about the product.</p>
          </div>
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Product Image</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <img
                    src={product.image_url || "/placeholder.svg"}
                    alt={product.name}
                    className="w-32 h-32 object-cover rounded-md"
                  />
                  {isEditing && (
                    <div className="mt-2">
                      <input
                        type="text"
                        name="image"
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        value={formData.image_url}
                        onChange={handleChange}
                      />
                    </div>
                  )}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Product Name</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {isEditing ? (
                    <>
                      <input
                        type="text"
                        name="name"
                        className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${errors.name ? "border-red-500" : ""}`}
                        value={formData.name}
                        onChange={handleChange}
                      />
                      {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name}</p>}
                    </>
                  ) : (
                    product.name
                  )}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Description</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {isEditing ? (
                    <>
                      <textarea
                        name="description"
                        rows="3"
                        className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${errors.description ? "border-red-500" : ""}`}
                        value={formData.description}
                        onChange={handleChange}
                      ></textarea>
                      {errors.description && <p className="mt-2 text-sm text-red-600">{errors.description}</p>}
                    </>
                  ) : (
                    product.description
                  )}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Price</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {isEditing ? (
                    <>
                      <input
                        type="number"
                        name="price"
                        step="0.01"
                        className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${errors.price ? "border-red-500" : ""}`}
                        value={formData.price}
                        onChange={handleChange}
                      />
                      {errors.price && <p className="mt-2 text-sm text-red-600">{errors.price}</p>}
                    </>
                  ) : (
                    `$${product.price.toFixed(2)}`
                  )}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Available Quantity</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {isEditing ? (
                    <>
                      <input
                        type="number"
                        name="quantity"
                        className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${errors.quantity ? "border-red-500" : ""}`}
                        value={formData.quantity}
                        onChange={handleChange}
                      />
                      {errors.quantity && <p className="mt-2 text-sm text-red-600">{errors.quantity}</p>}
                    </>
                  ) : (
                    product.quantity
                  )}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Publish Date</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {new Date(product.created_at).toLocaleDateString()}
                </dd>
              </div>
            </dl>
          </div>
          {isEditing && (
            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <button
                type="submit"
                onClick={handleSave}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Save Changes
              </button>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  )
}
