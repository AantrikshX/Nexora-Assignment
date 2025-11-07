const mongoose = require("mongoose")
mongoose.connect("mongodb://127.0.0.1:27017/Nexora")

const userSchema = mongoose.Schema({
    fullname:String,
    email:String,
    password:String,
    cart:[{
        productId: Number,       
        title: String,
        price: Number,
        image: String,
        quantity: {
            type: Number,
            default: 1}
    }]
})


module.exports = mongoose.model("user",userSchema)