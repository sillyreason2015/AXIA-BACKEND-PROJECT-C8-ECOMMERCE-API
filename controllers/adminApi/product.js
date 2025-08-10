import Product from "../../schema/productSchema.js";


export const viewProduct = async (req, res) => {
    const {id} = req.params
    const secretKey = req.headers['secretkey']
  if ( !secretKey || secretKey.toString() !== process.env.ADMIN_SECRET.toString()) {
    console.log(req.headers)
    return res.status(403).json({ message: "Forbidden. You are not authorized to access this page." });
  }
    try{
        const product = await Product.findById(id).select(' -_id -createdAt -updatedAt -__v')
        res.status(200).json(product)
    }catch(error){
        res.status(500).json({message: error.message})
    }
}

export const viewProducts = async (req, res) => {
    const { secretKey } = req.headers;
  if (secretKey !== process.env.ADMIN_SECRET) {
    return res.status(403).json({ message: "Forbidden. You are not allowed to access this page" });
  }
    try{
        const products = await Product.find().select(' -_id -createdAt -updatedAt -__v')
        res.status(200).json(products)
    }catch(error){
        res.status(500).json({message: error.message})
    }
}


export const getProdByParams = async(req, res) => {
    const { secretKey } = req.headers;
  if (secretKey !== process.env.ADMIN_SECRET) {
    return res.status(403).json({ message: "Forbidden. You are not allowed to access this page" });
  }
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
    const { secretKey } = req.headers;
  if (secretKey !== process.env.ADMIN_SECRET) {
    return res.status(403).json({ message: "Forbidden. You are not allowed to access this page" });
  }
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