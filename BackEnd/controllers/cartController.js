const userModel = require("../models/userModel")


module.exports.AddToCart = async (req, res) => {
  const { productId, title, price, image } = req.body;
  const userId = req.user.id;
  
  const user = await userModel.findById(userId);
  
  const existingItem = user.cart.find(item => item.productId === productId);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    user.cart.push({ productId, title, price, image, quantity: 1 });
  }
  
  await user.save();
  res.json({ message: "Added to cart" });}

  module.exports.GetCartItems = async (req, res) => {
  try {
    const userId = req.user.id;  
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(401).json({ message: "Please login first" });
    }

    return res.status(200).json({
      cart: user.cart,
    });
  } catch (err) {
    console.error("Error fetching cart items:", err);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports.RemoveFromCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const productId = req.params.id; 
    console.log("DELETE hit, productId:", productId);

    const user = await userModel.findById(userId);
    if (!user) return res.status(401).json({ message: "Please login first" });

  user.cart = user.cart.filter(item => item.productId.toString() !== productId.toString());

    await user.save();

    return res.status(200).json({
      message: "Item removed from cart",
      cart: user.cart
    });
  } catch (err) {
    console.error("Error removing item from cart:", err);
    return res.status(500).json({ message: "Something went wrong" });
  }
};


module.exports.Checkout = async (req, res) => {
  try {
    const userId = req.user.id;
    const { fullName, address, phone, email} = req.body;
    

    const user = await userModel.findById(userId);
    
    if (!user) return res.status(401).json({ message: "Please login first" });

    if (!user.cart || user.cart.length === 0)
      return res.status(400).json({ message: "Your cart is empty" });


    const subtotal = user.cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );


    const orderId = "ORD-" + Math.floor(100000 + Math.random() * 900000);


    const receipt = {
      orderId,
      customer: {
        name: fullName,
        address,
        phone,
        email,
      },
      items: user.cart,
      subtotal: subtotal.toFixed(2),
      tax: (subtotal * 0.05).toFixed(2), 
      total: (subtotal * 1.05).toFixed(2),
      paymentStatus: "Paid (Mock)",
      date: new Date().toLocaleString(),
    };


    user.cart = [];
    await user.save();

    return res.status(200).json({
      message: "Checkout successful",
      receipt,
    });
  } catch (err) {
    console.error("Checkout error:", err);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
