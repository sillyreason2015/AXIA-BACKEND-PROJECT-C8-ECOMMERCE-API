// User logout function
export const logoutUser = async (req, res) => {
    try{
        // Clear the authentication cookie named "token"
        res
        .clearCookie('token', {
            httpOnly: true,
            sameSite: 'strict', 
            secure: false,
            path: '/'
        })
        //repond with success message
        return res.status(200).json({message: "Logout successful"})
    }catch(error){
        res.status(500).json({message: error.message})
    }
}