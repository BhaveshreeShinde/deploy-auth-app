const Joi = require('joi');

const signupValidation = (req, res, next) => {
    const schema = Joi.object({
        userName : Joi.string().min(3).max(30).required(),
        email : Joi.string().email().required(),
        password : Joi.string().min(3).max(30).required()
    })

    const {error} = schema.validate(req.body);
    if(error) {
        return res.status(400).json({message:"Bad Request", error});
    }
    next();
}



const loginValidation = (req,res,next)=>{
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(3).max(30).required()
    })

    const {error} = schema.validate(req.body);
    if(error){
        return res.status(400).json({message:"Bad Request", error});
    }
    next();
}


module.exports = {
    signupValidation,
    loginValidation
}