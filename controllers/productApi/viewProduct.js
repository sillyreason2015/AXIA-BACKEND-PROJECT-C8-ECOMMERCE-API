import Product from "../../schema/productSchema.js";

export const viewProduct = async (req, res) => {
    const {id} = req.params
    try{
        const product = await Product.findById(id).select('-userId -_id')
        res.status(200).json(product)
    }catch(error){
        res.status(500).json({message: error.message})
    }
}

export const viewProducts = async (req, res) => {
    try{
        const products = await Product.find().select('-userId -_id -createdAt -updatedAt -__v')
        res.status(200).json(products)
    }catch(error){
        res.status(500).json({message: error.message})
    }
}

export const viewByCategory = async (req, res) => {
    const {main, sub, brand} = req.query
    try{
        const filter = {}
        if (main) filter["categories.main"] = main
        if (sub) filter["categories.sub"] = sub
        if (brand) filter["categories.brand"] = brand

        if(Object.keys(filter).length === 0){
            return res.redirect('/api/v1/product/categories')
        }

        const products = await Product.find(filter).select('-_id -userId -createdAt -updatedAt -__v')

        if(products.length === 0){
            return res.status(404).json({message: "No products found in this category"})
        }
        res.status(200).json(products)
    }catch(error){
        res.status(500).json({message: error.message})
    }
}