export const adminLogout = async (req, res) => {
    try{
        res
        .clearCookie('token', {
            httpOnly: true,
            sameSite: 'strict',
            secure: false,
            path: '/'
        })
        return res.status(200).json({message: "Logout Successful"})
    }catch(error){
        res.status(500).json({message: error.message})
    }
}