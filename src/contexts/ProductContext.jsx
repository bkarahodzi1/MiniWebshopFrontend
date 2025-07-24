import {createContext, useState, useContext, useEffect} from "react"

const ProductContext = createContext()

export const useProducts = () => useContext(ProductContext)

export const ProductProvider = ({children}) => {
  const [products, setProducts] = useState([])
  //Loading is true until user login is checked
  const [loading, setLoading] = useState(true)

  async function loadProductsFromBackend(page = 1, filters = {}) {
    try {
      const params = new URLSearchParams()
      params.append("page", page)
      if (filters.name) params.append("name", filters.name)
      if (filters.min_price) params.append("min_price", filters.min_price)
      if (filters.max_price) params.append("max_price", filters.max_price)
      if (filters.min_quantity) params.append("min_quantity", filters.min_quantity)
      if (filters.sort_by) params.append("sort_by", filters.sort_by)
      
      const res = await fetch(`http://localhost:8000/products/?${params.toString()}`)
      const data = await res.json()
      setProducts(data.data)
      localStorage.setItem("products", JSON.stringify(products))
      return data
    } catch (error) {
      console.error("Error fetching products:", error)
      return null
    }
  }

  useEffect(() => {
  const loadInitialProducts = async () => {
    const storedProducts = JSON.parse(localStorage.getItem("products"))
    if (storedProducts) {
      setProducts(storedProducts)
    } else {
      const data = await loadProductsFromBackend(1)
      localStorage.setItem("totalPages", data.total_pages)
    }
    setLoading(false)
  }

  loadInitialProducts()
}, [])

  //Add a new product
  const addProduct = async (product) => {
    const newProduct = {
      ...product,
      created_at: new Date().toISOString(),
    }

    console.log("proizvod")
    console.log(newProduct)

    await fetch(`http://localhost:8000/products`,{
      method: "POST",
       headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    })

    const updatedProducts = [...products, newProduct]
    setProducts(updatedProducts)
    localStorage.setItem("products", JSON.stringify(updatedProducts))
    return newProduct
  }

  // Update an existing product
  const updateProduct = async (id, updatedProduct) => {
    const updatedProducts = products.map((product) => (product.id === id ? { ...product, ...updatedProduct } : product))
    
    await fetch(`http://localhost:8000/products/${id}`,{
      method: "PATCH",
       headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    })
    setProducts(updatedProducts)
    localStorage.setItem("products", JSON.stringify(updatedProducts))
  }

  // Delete a product
  const deleteProduct = (id) => {
    fetch(`http://localhost:8000/products/${id}`,{
      method: "DELETE",
    })
    const updatedProducts = products.filter((product) => product.id !== id)
    setProducts(updatedProducts)
    localStorage.setItem("products", JSON.stringify(updatedProducts))
  }

  // Get a single product by ID
  const getProduct = async(id) => {
    const res = await fetch(`http://localhost:8000/products/${id}`)
    if (!res.ok) throw new Error("Product not found")
    return await res.json()
  }

  //Pass into context provider so useProducts() users can access it
  const value = {
    products,
    loading,
    loadProductsFromBackend,
    addProduct,
    updateProduct,
    deleteProduct,
    getProduct,
  }

  return <ProductContext.Provider value = {value}>{!loading && children}</ProductContext.Provider>
}
