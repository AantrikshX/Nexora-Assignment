const express = require("express")
const router = express.Router()
const {registerUser , loginUser , logout} = require("../controllers/authController")
const {AddToCart , GetCartItems , RemoveFromCart , Checkout} = require("../controllers/cartController")
const isLoggedIn = require("../middleware/isLoggedin")

router.post("/signup",registerUser)
router.post("/login", loginUser)
router.get("/logout",logout )
router.post("/cart/add",isLoggedIn,AddToCart );
router.get('/cart', isLoggedIn, GetCartItems);
router.delete('/cart/:id', isLoggedIn, RemoveFromCart);
router.post('/checkout', isLoggedIn, Checkout);


module.exports = router