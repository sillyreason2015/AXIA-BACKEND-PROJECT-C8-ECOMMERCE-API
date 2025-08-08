import Product from "../../schema/productSchema.js";


export const viewProduct = async (req, res) => {
    const {id} = req.params
    try{
        const product = await Product.findById(id).select(' -_id -createdAt -updatedAt -__v')
        res.status(200).json(product)
    }catch(error){
        res.status(500).json({message: error.message})
    }
}

export const viewProducts = async (req, res) => {
    try{
        const products = await Product.find().select(' -_id -createdAt -updatedAt -__v')
        res.status(200).json(products)
    }catch(error){
        res.status(500).json({message: error.message})
    }
}


export const getProdByParams = async(req, res) => {
    const {name} = req.query
    const filter = {}
    try{
        if (name) filter.name = name
       const product = await Product.find(filter).select('-_id -createdAt -updatedAt -__v')
        res.status(200).json(product)
    }catch(error){
        res.status(500).json({message: error.message})
    }
}


export const deleteProduct = async (req, res) => {
    const {id} = req.params
    try{
        const product = await Product.findById(id)
        if(!product){
            res.status(404).json({message: "Product not found"})
        }
        await Product.findByIdAndDelete(id)
        res.status(200).json({message: "Product deleted Successfully"})
    }catch(error){
        res.status(500).json({message: error.message})
    }
}