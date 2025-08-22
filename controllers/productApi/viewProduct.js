import Product from "../../schema/productSchema.js";

// View a single product by its ID
export const viewProduct = async (req, res) => {
    const {id} = req.params
    try{
        // Find the product by ID, exclude userId and _id fields
        const product = await Product.findById(id).select('-userId -_id')
        res.status(200).json(product)
    }catch(error){
        res.status(500).json({message: error.message})
    }
}

// View all products
export const viewProducts = async (req, res) => {
    try{
        // Fetch all products
        const products = await Product.find().select('-userId -_id -createdAt -updatedAt -__v')
        res.status(200).json(products)
    }catch(error){
        res.status(500).json({message: error.message})
    }
}

// View products filtered by category, subcategory, and brand
export const viewByCategory = async (req, res) => {
    const {main, sub, brand} = req.query
    try{
         // Add filters if query params are provided
        const filter = {}
        if (main) filter["categories.main"] = main
        if (sub) filter["categories.sub"] = sub
        if (brand) filter["categories.brand"] = brand
        
        // If no param is provided, redirect user to the categories
        if(Object.keys(filter).length === 0){
            return res.redirect('/api/v1/product/categories')
        }

        const products = await Product.find(filter).select('-_id -userId -createdAt -updatedAt -__v')
         // If no products found, return 404
        if(products.length === 0){
            return res.status(404).json({message: "No products found in this category"})
        }
        //return products
        res.status(200).json(products)
    }catch(error){
        res.status(500).json({message: error.message})
    }
}