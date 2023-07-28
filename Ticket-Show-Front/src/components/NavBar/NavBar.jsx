import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import logoTicketShow from "../../assets/logos/logoTicketShow.svg";
import { useAuth } from "../../context/AuthContext"; // Importa el useAuth del contexto
//import { CartContext, useCart } from "../Shoppingcart/CartContext"; // Importa el useCart del contexto
//import CartPage from "../Shoppingcart/Shoppingcart";
import { CartContext } from "../Shoppingcart/shoppingCartContext"
const NavBar = () => {

  const activeStyle = "underline-offset-5 border-b-2 border-secondaryColor";

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, logout } = useAuth(); // Extrae el usuario y la función de logout del contexto
  //const { cartItems } = useCart(); // Extrae la información del carrito del contexto
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  const [cart, setCart] = useContext(CartContext)
    const quantity = cart.reduce((acc, curr) => {
      return acc + curr.quantity
    }, 0)
  return (
    <nav className="flex justify-between items-center bg-transparent w-full py-5 px-12 text-md font-light">
      <ul className="flex items-center gap-3">
        <li>
          <NavLink to="/">
            <img className="w-8" src={logoTicketShow} alt="logo" />
          </NavLink>
        </li>
        <li className="font-bold text-2xl tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-secondaryColor to-ChryslerBlue">
          TicketShow
        </li>
      </ul>

      <ul className="flex items-center gap-3">
        <li>
          <NavLink
            to="/"
            onClick={closeDropdown}
            className={({ isActive }) => (isActive ? activeStyle : "")}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/about"
            onClick={closeDropdown}
            className={({ isActive }) => (isActive ? activeStyle : "")}
          >
            Acerca de
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/contact"
            onClick={closeDropdown}
            className={({ isActive }) => (isActive ? activeStyle : "")}
          >
            Contáctenos
          </NavLink>
        </li>

        {/* //- Si el usuario no está autenticado, muestra botón de "Regístrate" */}
        {!user && (
          <li className="relative">
            <div
              className="items-center overflow-hidden rounded-md border-solid border-2 border-secondaryColor hover:text-primaryColor hover:bg-Color300"
            >
              <button className="py-1 px-2 flex items-center" onClick={toggleDropdown}>
                Regístrate
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-4 w-4 transition-transform duration-200 ${
                    isDropdownOpen ? "rotate-180" : "rotate-0"
                  }`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
            {/* //-Menu desplegable Registro -------- */}
            {isDropdownOpen && (
              <div
                className="absolute end-0 z-10 mt-2 w-36 divide-gray-100 rounded-md border border-gray-100 bg-white shadow-lg"
                role="menu"
              >
                <div className="p-2">
                  <NavLink
                    to="/registerUser"
                    className="block rounded-lg px-4 py-2 text-sm hover:text-secondaryColor hover:bg-BackgroundLight"
                    role="menuitem"
                    onClick={closeDropdown}
                  >
                    Publico
                  </NavLink>

                  <NavLink
                    to="/registerArtist"
                    className="block rounded-lg px-4 py-2 text-sm hover:text-secondaryColor hover:bg-BackgroundLight"
                    role="menuitem"
                    onClick={closeDropdown}
                  >
                    Artista
                  </NavLink>
                </div>
              </div>
            )}
          </li>
        )}

        {/* //- Si el usuario está autenticado, muestra su nombre en la navbar */}
        {user && (
          <li>
            <span className="text-primaryColor">{user.displayName}</span>
          </li>
        )}

        {/* //- Botón de ingresar siempre visible */}
        {!user && (
          <li>
            <NavLink to="/login">
              <button className="py-1.5 px-3 rounded-md bg-primaryColor text-Color200 hover:text-black hover:bg-white">
                Ingresa
              </button>
            </NavLink>
          </li>
        )}

        {/* //- Si el usuario está autenticado, muestra el botón desplegable */}
        {user && (
          <li className="relative">
            <div
              className="items-center overflow-hidden rounded-md border-solid border-2 border-secondaryColor hover:text-primaryColor hover:bg-Color300"
            >
              <button className="py-1 px-2 flex items-center" onClick={toggleDropdown}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-4 w-4 transition-transform duration-200 ${
                    isDropdownOpen ? "rotate-180" : "rotate-0"
                  }`}
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
            {/* //-Menu desplegable Usuario autenticado -------- */}
            {isDropdownOpen && (
              <div
                className="absolute end-0 z-10 mt-2 w-36 divide-gray-100 rounded-md border border-gray-100 bg-white shadow-lg"
                role="menu"
              >
                <div className="p-2">
                  <NavLink
                    to="/profile"
                    className="block rounded-lg px-4 py-2 text-sm hover:text-secondaryColor hover:bg-BackgroundLight"
                    role="menuitem"
                    onClick={closeDropdown}
                  >
                    Perfil
                  </NavLink>

                  <button
                    className="block rounded-lg px-4 py-2 text-sm hover:text-secondaryColor hover:bg-BackgroundLight"
                    role="menuitem"
                    onClick={() => {
                      logout();
                      closeDropdown();
                    }}
                  >
                    Cerrar sesión
                  </button>
                </div>
              </div>
            )}
          </li>
        )}
       {/* //- Botón de carrito (solo se muestra si el usuario está autenticado) */}
  
      {/* Enlace del carrito */}
        {user && (
                  <li>
                    <NavLink to="/cart">
                      <span role="img" aria-label="Carrito">🛒{quantity}</span> 
                    </NavLink>
                  </li>
                )}

        
      </ul>
    </nav>
  );
};

export default NavBar;
