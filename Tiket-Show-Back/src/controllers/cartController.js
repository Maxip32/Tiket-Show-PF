const CartItem = require('../models/cart');

//Obtener los elementos del carrito para el usuario autenticado
const getCartItems = async (req, res) => {
  try {
    const userId = req.user.id; // Obtenemos el ID del usuario autenticado desde el middleware de autenticación
    const cartItems = await CartItem.findAll({ where: { user_id: userId } });
    res.json({ items: cartItems });
  } catch (error) {
    console.error('Error al obtener el carrito:', error);
    res.status(500).json({ message: 'Error al obtener el carrito' });
  }
};

// async function getCartItems(userid) {
//   console.log("ENTRANDO A FUNCION GET_CARD_BY_ID EN CONTROLLER");
//   console.log("LAS VARIABLES SON");
//   console.log(userid);
//   //DEVOLVER EL CARRITO DE UN USER
//   let response = await CartItem.findAll({
//     where: {
//       CartId: userid,
//     },
//   });
//   return response;
// }

//Agregar elemento al carrito para el usuario autenticado
const addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { item } = req.body; 
    
    const newItem = await CartItem.create({ user_id: userId, ...item });
     res.json({ message: 'Artículo agregado al carrito', item: newItem });
    res.json({ message: 'Artículo agregado al carrito', item });
  } catch (error) {
    console.error('Error al agregar al carrito:', error);
    res.status(500).json({ message: 'Error al agregar al carrito' });
  }
};

// async function addToCart(userid, idproduct, quantity) {
//   console.log("ENTRANDO A FUNCION ADDPRODUCT EN CONTROLLER");
//   console.log("LAS VARIABLES SON");
//   console.log(userid);
//   console.log(idproduct);
//   console.log(quantity);
//   //CREAR UN PRODUCT IN CHART
//   let newid = await CartItem.count();
//   newid++;
//   let newproduct = await CartItem.create({
//     id: newid,
//     idproduct: idproduct,
//     quantity: quantity,
//   })
  //VINCULAR PRODUCT IN CHART AL USER
//   let user = await Cart.findByPk(userid); //TRAIGO AL USER PARA TENERLO EN UNA VARIABLE USABLE
//   console.log("USER EN ADD PRODUCT ES...")
//   console.log(user)
//   let vinculation = await user.addProductinchart(newproduct); //VINCULO O AGREGO UN PRODUCT CHART AL USUARIO
//   console.log(await user.getProductincharts());
//   return vinculation;
// }

// Eliminar elemento del carrito para el usuario autenticado
const removeFromCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const itemId = req.params.itemId;
    
    await CartItem.destroy({ where: { user_id: userId, id: itemId } });
    res.json({ message: 'Artículo eliminado del carrito', itemId });
  } catch (error) {
    console.error('Error al eliminar del carrito:', error);
    res.status(500).json({ message: 'Error al eliminar del carrito' });
  }
};

// async function removeFromCart(userid, CartItem, quantity) {
//   console.log("ENTRANDO A FUNCION DELETE EN CONTROLLER");
//   console.log("LAS VARIABLES SON");
//   console.log(userid);
//   console.log(CartItem);
//   console.log(quantity);
//   //ELIMINAR EL PRODUCTO
//   let res = await CartItem.destroy({
//     where: {
//       idproduct: CartItem,
//       CartId: userid,
//     },
//   });
//   return res;
// }

// Actualizar elemento del carrito para el usuario autenticado
const updateCartItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const itemId = req.params.itemId;
    const { quantity } = req.body; 
    
    await CartItem.update({ quantity }, { where: { user_id: userId, id: itemId } });
    res.json({ message: 'Artículo actualizado en el carrito', itemId, quantity });
  } catch (error) {
    console.error('Error al actualizar el carrito:', error);
    res.status(500).json({ message: 'Error al actualizar el carrito' });
  }
};

// async function updateCartItem(userid, CartItem, quantity) {
//   console.log("ENTRANDO A FUNCION UPDATE EN CONTROLLER");
//   console.log("LAS VARIABLES SON");
//   console.log(userid);
//   console.log(CartItem);
//   console.log(quantity);
//   //ACTUALIZAR EL PRODUCTO
//   let response = await Productinchart.update(
//     { quantity: quantity },
//     {
//       where: {
//         idproduct: idproduct,
//         CartId: userid,
//       },
//     }
//     );
//     return response;
//   }
module.exports = {
  getCartItems,
  addToCart,
  removeFromCart,
  updateCartItem,
};
