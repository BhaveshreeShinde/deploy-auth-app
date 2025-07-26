const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const UserModel = require("../Models/User");

const signup = async(req, res) => {
    try{
        const {userName, email, password} = req.body;
        const newUser = await UserModel.findOne({ email });
        if(newUser){
            return res.status(409).json({message:"User already exists",success:false});
        }

        const userModel = new UserModel({
            userName,
            email,
            password
        });

        userModel.password = await bcrypt.hash(password, 10);
        await userModel.save();
    return res.status(201).json({message:"User created successfully", success:true});
    }catch(error) {
        console.error("Error during signup:", error);
        return res.status(500).json({ message: "Internal Server Error",success:false });
    }   
}

const login = async(req, res) => {
    try{
        const { email, password} = req.body;
        const newUser = await UserModel.findOne({ email });
        if(!newUser){
            return res.status(403).json({message:"Incorrect email or Password",success:false});
        }

        const isPassEqual = await bcrypt.compare(password, newUser.password);
        if(!isPassEqual){
            return res.status(403).json({message:"Incorrect email or Password", success:false});
            }

        const jwtToken = jwt.sign(
            { email: newUser.email, _id: newUser._id },
            process.env.JWT_SECRET,
        { expiresIn: "1h"}
        )

        res.status(200)
        .json({
            message:"Login successfully", 
            success:true, 
            jwtToken,
            email,
            userName:newUser.userName
        });
    }catch(error) {
        console.error("Error during signup:", error);
        return res.status(500).json({ message: "Internal Server Error",success:false });
    }   
}

module.exports = {
    signup,
    login
}