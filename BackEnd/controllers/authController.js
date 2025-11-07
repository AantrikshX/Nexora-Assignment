const userModel = require("../models/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

   
module.exports.registerUser = async (req,res)=>{
    try{let {email , password , fullname} = req.body

        let user = await userModel.findOne({email:email})
        if(user) return res.status(401).send("You Already have an Account ,Please Login!")

        bcrypt.genSalt(10, (err,salt)=>{
            if(err) return res.status(500).send(err.message)
            bcrypt.hash(password , salt,async (err,hash)=>{
                if(err) return res.send(err.message)
                else{
                     let newUser = await userModel.create({
                        email,
                        fullname,
                        password :hash   
                })
            const token = jwt.sign({ id: newUser._id, email: newUser.email },"gGSVJiuebkjjOUbigV");
            res.cookie("token" , token)
             res.send("user created successfully")
            }
        })
    })
   
 }
    catch(err){
        res.send(err.message)
    }
    
    
    
}

module.exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    
    const user = await userModel.findOne({ email });
    if (!user) return res.status(401).send("Incorrect Email or Password");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).send("Incorrect Email or Password");

    const token = jwt.sign({ id: user._id, email: user.email },"gGSVJiuebkjjOUbigV");
    res.cookie("token", token, { httpOnly: true });
    return res.status(200).json({ message: "Logged In" });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).send("Something went wrong");
  }
};




module.exports.logout = (req, res) => {
  try {
    res.clearCookie("token");
    return res.send("Logged Out");
  } catch (err) {
    console.error("Logout error:", err);
    return res.status(500).send("Logout failed");
  }
};
