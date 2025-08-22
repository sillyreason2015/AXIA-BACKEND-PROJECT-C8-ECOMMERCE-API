// Logout admin function
export const adminLogout = async (req, res) => {
    try{
         // Clear the 'token' cookie to effectively log the user out
        res
        .clearCookie('token', {
            httpOnly: true,
            sameSite: 'strict',
            secure: false,
            path: '/'
        })
        // Send successful logout response
        return res.status(200).json({message: "Logout Successful"})
    }catch(error){
        res.status(500).json({message: error.message})
    }
}