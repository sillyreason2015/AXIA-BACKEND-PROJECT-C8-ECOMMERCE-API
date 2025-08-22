import Product from "../../schema/productSchema.js";


// Create a new product (merchant-only access)
export const createProduct = async (req, res) => {
    const {name, price, description,colour, size} = req.body
    const { isMerchant, _id: userId } = req.user;

    // Validate that all required fields are provided
    if(!name || !price || !description || !colour || !size){
            return res.status(400).json({message: "Please enter all fields"})
        }

    try{
        // Ensure the user is a merchant
        if(!isMerchant){
            return res
            .status(403)
            .json({message: "You are not authorized to carry out this action"})
        }

        // Create a new product document, associating it with the merchant
        const newProduct = new Product({
                ...req.body,
                userId
            })
             // Save the product to the database
            await newProduct.save()
            //return response
            res.status(200).json({message: "Product Created Successfully"})
    }catch(error){
        res.status(500).json({message: error.message})
    }
}