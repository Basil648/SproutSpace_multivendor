// import Cart from "../models/Cart.js";

// // ADD TO CART
// export const addToCart = async (req, res) => {
//   const { productId, quantity } = req.body;
//   const userId = req.user._id;

//   let cart = await Cart.findOne({ user: userId });

//   if (!cart) {
//     cart = await Cart.create({
//       user: userId,
//       items: [{ productId, quantity }],
//     });
//     return res.json(cart);
//   }

//   const item = cart.items.find(
//     (i) => i.productId.toString() === productId
//   );

//   if (item) {
//     item.quantity += quantity;
//   } else {
//     cart.items.push({ productId, quantity });
//   }

//   await cart.save();
//   res.json(cart);
// };

// // GET CART
// export const getCart = async (req, res) => {
//   const cart = await Cart.findOne({ user: req.user._id })
//     .populate("items.productId");

//   res.json(cart || { items: [] });
// };

// // CLEAR CART
// export const clearCart = async (req, res) => {
//   await Cart.deleteOne({ user: req.user._id });
//   res.json({ message: "Cart cleared" });
// };


import Cart from "../models/Cart.js";

// ADD TO CART
export const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const customerId = req.user._id;

  let cart = await Cart.findOne({ customer: customerId });

  if (!cart) {
    cart = await Cart.create({
      customer: customerId,
      items: [{ productId, quantity }],
    });
    return res.json(cart);
  }

  const item = cart.items.find(
    (i) => i.productId.toString() === productId
  );

  if (item) {
    item.quantity += quantity;
  } else {
    cart.items.push({ productId, quantity });
  }

  await cart.save();
  res.json(cart);
};

// GET CART
export const getCart = async (req, res) => {
  const cart = await Cart.findOne({ customer: req.user._id })
    .populate("items.productId");

  res.json(cart || { items: [] });
};

// CLEAR CART
export const clearCart = async (req, res) => {
  await Cart.deleteOne({ customer: req.user._id });
  res.json({ message: "Cart cleared" });
};
