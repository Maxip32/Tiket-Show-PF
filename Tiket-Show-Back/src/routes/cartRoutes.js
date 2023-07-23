// routes/cartRoutes.js
const express = require('express');
const router = express.Router();
//const { authenticateToken } = require('../middleware/authMiddleware');
const { getCartItems,addToCart,removeFromCart, updateCartItem } = require('../controllers/cartController');

// Obtener los elementos del carrito para el usuario autenticado
router.get('/cart', getCartItems);
// Agregar elemento al carrito para el usuario autenticado
router.post('/cart', addToCart);
// Eliminar elemento del carrito para el usuario autenticado
router.delete('/cart/:itemId', removeFromCart);
// Actualizar elemento del carrito para el usuario autenticado
router.put('/cart/:itemId', updateCartItem);


module.exports = router;
