const CartItem = require('../db');

//Obtener los elementos del carrito para el usuario autenticado
const getCartItemsBackend = async (req, res) => {
  try {
    const userId = req.user.id; // Obtenemos el ID del usuario autenticado desde el middleware de autenticación
    const cartItems = await CartItem.findAll({ where: { user_id: userId } });
    res.json({ items: cartItems });
  } catch (error) {
    console.error('Error al obtener el carrito:', error);
    res.status(500).json({ message: 'Error al obtener el carrito' });
  }
};


const addToCartBackend = async (req, res) => {
  const { id, name } = req.body; // Corregimos la destructuración del objeto
  console.log(id, name, " esto necesito")
  //const userId = id
  try {
   // const userId = req.body;
    // Asegurarse de que el objeto item tenga la propiedad 'id' válida
    if (!id) {
      return res.status(400).json({ message: 'El artículo no tiene una propiedad "id" válida' });
    }

    //Verificar si el artículo ya existe en el carrito del usuario
   const existingCartItem = await CartItem.findOne({ where: { user_id: userId, id } });

    if (existingCartItem) {
      // Si el artículo ya existe, puedes actualizar su cantidad u otras propiedades si es necesario
      await existingCartItem.update(id);
      res.json({ message: 'Artículo actualizado en el carrito', id: existingCartItem });
    } else {
     // Si el artículo no existe, lo creamos en el carrito del usuario
      const newItem = await CartItem.create({ user_id: userId, ...id });
      res.json({ message: 'Artículo agregado al carrito', id: newItem });
    }

  } catch (error) {
    console.error('Error al agregar al carrito:', error);
    res.status(500).json({ message: 'Error al agregar al carrito' });
  }
};


const removeFromCartBackend = async (req, res) => {
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


const updateCartItemBackend = async (req, res) => {
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


module.exports = {
  getCartItemsBackend,
  addToCartBackend,
  removeFromCartBackend,
  updateCartItemBackend,
};
