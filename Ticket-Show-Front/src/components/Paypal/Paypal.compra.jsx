import React from "react";

const CompraPaypal = () => {
  return (
    <div>
      <div class="bg-gray-100 min-h-screen flex items-center justify-center">
      <div class="max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 class="text-2xl font-bold mb-4">Gracias por su compra</h2>
        <p class="text-gray-600 mb-6">
          Hemos recibido su compra y estamos procesando su pedido. Le enviaremos
          una confirmación por correo electrónico en breve.
        </p>
        <a
          href="/"
          class="block text-center bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
        >
          Volver a la página de inicio
        </a>
        </div>   
      </div>
    </div>
  );
};

export default CompraPaypal;
