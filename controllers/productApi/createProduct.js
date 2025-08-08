import Product from "../../schema/productSchema.js";



export const createProduct = async (req, res) => {
    const {name, price, description,colour, size} = req.body
    const { isMerchant, _id: userId } = req.user;

    if(!name || !price || !description || !colour || !size){
            return res.status(400).json({message: "Please enter all fields"})
        }
    try{
        if(!isMerchant){
            return res
            .status(403)
            .json({message: "You are not authorized to carry out this action"})
        }
        const newProduct = new Product({
                ...req.body,
                userId
            })
            await newProduct.save()
            res.status(200).json({message: "Product Created Successfully"})
    }catch(error){
        res.status(500).json({message: error.message})
    }
}