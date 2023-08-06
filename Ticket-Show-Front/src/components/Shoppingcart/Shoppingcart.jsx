/* CheckOut */
import { useContext} from "react";
import { CartContext } from "./shoppingCartContext";
import { useAuth } from "../../context/AuthContext";
import axios from "axios"

export const CartPage = () => {
  const [cart, setCart] = useContext(CartContext);

  const { user } = useAuth(); 
  
  const quantity = cart.reduce((acc, curr) => {
    return acc + curr.quantity;
  }, 0);

  const totalPrice = cart.reduce(
    (acc, curr) => acc + curr.quantity * curr.price,
    0
  );

  const handleIncrement = (id) => {
    setCart((prevCart) => {
      return prevCart.map((item) => {
        if (item.id === id && item.stock > 0) {
          return {
            ...item,
            quantity: item.quantity + 1,
            stock: item.stock -1,
          };
        }
        return item;
      });
    });
  };

  const handleDecrement = (id) => {
    setCart((prevCart) => {
      return prevCart.map((item) => {
        if (item.id === id && item.quantity > 0) {
          return {
            ...item,
            quantity: item.quantity - 1,
            stock: item.stock +1,
          };
        }
        return item;
      });
    });
  };

  const handleAdquirirEntrada = async () => {
    
    try {

      //const response = await fetch("http://localhost:3001/create-order", {
        const response = await axios.post(
          "https://tiket-show-pf-production.up.railway.app/create-order",
          {
            value: (totalPrice + totalPrice * 0.18).toFixed(2),
          },
          {
            headers: {
              "Content-Type": "application/json", // Indicar que los datos se envían en formato JSON
            },
          }
        );
        
        // Verificar si la solicitud fue exitosa (código de estado 200)
        if (response.status === 200) {
          const data = response.data;
        
          // Verificar si 'links' existe en data
          if (!data.links || data.links.length < 2) {
            console.error("La propiedad 'links' no existe o no tiene suficientes elementos");
            return;
          
          }

          
        
        const detailsShopping = {
          date: new Date().toISOString(), // Agregar la fecha de compra
          total: totalPrice,
          cantidad: cart.map((item) => item.quantity).join(" , "), // Agregar el precio total
          name: cart.map((item) => item.name).join(" , "),
          image: cart?.map((item) => item.image).join(","),
          userId: user.uid,
          // Agregar otros detalles relevantes, como nombres de eventos, cantidades, etc. si es necesario
        };
        
        // Obtener compras existentes desde localStorage o crear un array vacío
        const savedPurchases =
        JSON.parse(localStorage.getItem("userPurchases")) || [];
        
        // Agregar la nueva compra a las compras existentes
        savedPurchases.push(detailsShopping);
        
        // Guardar las compras actualizadas en localStorage
        localStorage.setItem("userPurchases", JSON.stringify(savedPurchases));
        console.log(
          "savedPurchases in CartPage:",
          JSON.parse(localStorage.getItem("userPurchases"))
        );

        // Realizar la re dirección a la pasarela de pago
        window.location.href = data.links[1].href;
        //lo hice yo = Darwin, acá inicia

        const sendMail = await fetch('https://tiket-show-pf-production.up.railway.app/send/mail',
        //const sendMail = await fetch('http://localhost:3001/send/mail',
        { method: 'POST',
          headers: {
            "Contend-Type": "application/json"
          },
          body: JSON.stringify(
            { 
            date: new Date().toISOString(),
          total: totalPrice,
          cantidad: cart.map((item) => item.quantity).join(" , "), 
          name: cart.map((item) => item.name).join(" , "),
          image: cart?.map((item) => item.image).join(","),
        })
        })
        await sendMail.json()


        //lo hice yo = Darwin, acá termina
      } else {
        // La compra fue cancelada o hubo un error
        // Puedes guardar un mensaje especial en lugar de los detalles de la compra
        const detailsShopping = {
          date: new Date().toISOString(), // Agregar la fecha de compra
          message: "Esta compra fue cancelada", // Mensaje especial indicando que la compra fue cancelada
        };

        // Obtener compras existentes desde localStorage o crear un array vacío
        const savedPurchases =
          JSON.parse(localStorage.getItem("userPurchases")) || [];

        // Agregar la nueva compra (o mensaje especial) a las compras existentes
        savedPurchases.push(detailsShopping);

        // Guardar las compras actualizadas en localStorage
        localStorage.setItem("userPurchases", JSON.stringify(savedPurchases));
      }
    } catch (error) {
      console.error("Error al adquirir la entrada: ", error);
    }
  };

  return cart.length > 0 ? (
    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <header className="text-center">
            <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">
              Tu carrito
            </h1>
          </header>
          {/* Mostrar los elementos del carrito */}
          {cart?.map((item) => (
            <div key={item.id} className="mt-8">
              <ul className="space-y-4">
                <li className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt=""
                    className="h-16 w-16 rounded object-cover"
                  />

                  <div>
                    <h3 className="text-sm text-gray-900">{item.name}</h3>

                    <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                    <div>
                    <dt className="inline">Stock:</dt>
                    <dd className="inline">{item.stock}</dd>
                    </div>
                      <div>
                        <dt className="inline">Costo: </dt>
                        <dd className="inline">${item.price}</dd>
                      </div>

                      <div>
                        <dt className="inline">Color:</dt>
                        <dd className="inline">White</dd>
                      </div>
                    </dl>
                  </div>

                  <div className="flex flex-1 items-center justify-end gap-2">
                    <form>
                      <label htmlFor="Line1Qty" className="sr-only"></label>
                      <h3 className="h-8 w-12 rounded border-gray-200 bg-gray-50 p-0 text-center text-xs text-gray-600 [-moz-appearance:_textfield] focus:outline-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none">
                        {item.quantity}
                      </h3>
                    </form>

                    <button
                      className="text-gray-600 transition hover:text-red-600"
                      onClick={() => handleDecrement(item.id)}
                    >
                      <span className="sr-only">Remove item</span>-
                    </button>
                    <button
                      className="text-gray-600 transition hover:text-red-600"
                      onClick={() => handleIncrement(item.id)}
                    >
                      <span className="sr-only">Remove item</span>+
                    </button>
                  </div>
                </li>
              </ul>
            </div>
          ))}

          <div className="mt-8 flex justify-end border-t border-gray-100 pt-8">
            <div className="w-screen max-w-lg space-y-4">
              <dl className="space-y-0.5 text-sm text-gray-700">
                <div className="flex justify-end">
                  <span className="inline-flex items-center justify-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-indigo-700">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="-ms-1 me-1.5 h-4 w-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z"
                      />
                    </svg>
                    <p>Cantidad de Tickets: {quantity}</p>
                  </span>
                </div>
                <div className="flex justify-between">
                  <dt>Subtotal</dt>
                  <dd>{totalPrice}</dd>
                </div>

                <div className="flex justify-between">
                  <dt>impuesto país</dt>
                  <dd>18%</dd>
                </div>

                <div className="flex justify-between !text-base font-medium">
                  <dt>Total </dt>
                  <dd>${(totalPrice + totalPrice * 0.18).toFixed(2)}</dd>
                </div>
              </dl>

              <div className="flex justify-end">
                <a
                  onClick={handleAdquirirEntrada}
                  id="AdquirirEntrada"
                  href="#"
                  className="block rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
                >
                  Ir a Pagar
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  ) : (
    <div>
      <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="max-w-md p-8 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Carrito Vacío</h2>
          <p className="text-gray-600 mb-6">
            El carrito está vacío. Regresa a la página de inicio para agregar
            elementos.
          </p>
          <a
            href="/"
            className="block text-center bg-primaryColor text-white py-2 px-4 rounded hover:bg-secondaryColor transition"
          >
            Volver a la página de inicio
          </a>
        </div>
      </div>
    </div>
  );

};

