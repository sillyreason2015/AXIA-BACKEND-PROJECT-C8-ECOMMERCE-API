import Product from "../../schema/productSchema.js";

//View a single product by ID
export const viewProduct = async (req, res) => {
    const {id} = req.params
    //  only allow requests with valid ADMIN_SECRET
    const secretKey = req.headers['secretkey']
  if ( !secretKey || secretKey.toString() !== process.env.ADMIN_SECRET.toString()) {
    console.log(req.headers)
    return res.status(403).json({ message: "Forbidden. You are not authorized to access this page." });
  }
    try{
      // Find product by ID and exclude internal fields
        const product = await Product.findById(id).select(' -_id -createdAt -updatedAt -__v')
        res.status(200).json(product)
    }catch(error){
        res.status(500).json({message: error.message})
    }
}

//get all products
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

//Get products filtered by query parameters
export const getProdByParams = async(req, res) => {
  //only allow requests with valid ADMIN_SECRET
    const { secretKey } = req.headers;
  if (secretKey !== process.env.ADMIN_SECRET) {
    return res.status(403).json({ message: "Forbidden. You are not allowed to access this page" });
  }
    const {name} = req.query
    const filter = {}
    try{
      // Only filter by name if provided
        if (name) filter.name = name
       const product = await Product.find(filter).select('-_id -createdAt -updatedAt -__v')
        res.status(200).json(product)
    }catch(error){
        res.status(500).json({message: error.message})
    }
}

//Delete a product by ID
export const deleteProduct = async (req, res) => {
  //only allow requests with valid ADMIN_SECRET
    const { secretKey } = req.headers;
  if (secretKey !== process.env.ADMIN_SECRET) {
    return res.status(403).json({ message: "Forbidden. You are not allowed to access this page" });
  }
    const {id} = req.params
    try{
      // Check if product exists before deleting
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