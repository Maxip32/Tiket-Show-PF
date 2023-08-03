/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import logoTicketShow from "../../assets/logos/logoTicketShow.svg";
import { useAuth } from "../../context/AuthContext"; // Importa el useAuth del contexto
import { CartContext } from "../Shoppingcart/shoppingCartContext"
import { useSelector } from "react-redux";
import CreateEvent from "../CreateEvent/CreateEvent";
import { LiaShoppingCartSolid, LiaUserSolid } from "react-icons/lia";
//import {getUserById } from '../../redux/actions';
//import { useDispatch } from 'react-redux';


const NavBar = () => {
  //const dispatch = useDispatch();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, logout } = useAuth(); // Extrae el usuario y la función de logout del contexto
  const users = useSelector((state)=> state?.user)
  console.log(users, 'aquí user redux');

  const usersFinder = users?.length ? users?.find(rol => rol.email === user?.email): null;
  console.log(usersFinder, 'aquí user Roles');
  //console.log(Roles, " roles de usuarios y artistas")
  const activeStyle = "underline-offset-5 border-b-2 border-secondaryColor";

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
    <nav className="flex justify-between items-center bg-transparent w-full py-5 text-md font-light max-w-5xl mx-auto">
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

      <ul className="flex items-center justify-between">
        <li>
          <NavLink
            to="/"
            onClick={closeDropdown}
            className={({ isActive }) => (isActive ? activeStyle : "")}
          >
            Home
          </NavLink>
        </li>
        <li className="ml-3">
          <NavLink
            to="/about"
            onClick={closeDropdown}
            className={({ isActive }) => (isActive ? activeStyle : "")}
          >
            Acerca de
          </NavLink>
        </li>
        <li className="ml-3">
          <NavLink
            to="/contact"
            onClick={closeDropdown}
            className={({ isActive }) => (isActive ? activeStyle : "")}
          >
            Contáctenos
          </NavLink>
        </li>
        {/* //- Botón de carrito (solo se muestra si el usuario está autenticado) */}
        {/* Enlace del carrito */}
        {user && (
          <li className="ml-3">
              <NavLink to="/cart" className="flex items-center">
                <LiaShoppingCartSolid size={26}/>
                {quantity}
              </NavLink>
            </li>
          )}

        {/* //- Si el usuario no está autenticado, muestra botón de "Regístrate" */}
        {!user && (
          <li className="relative ml-3">
            <div
              className="items-center overflow-hidden rounded-md border-solid border-2 border-secondaryColor hover:text-primaryColor hover:bg-Color300 hover:border-primaryColor"
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
          <>
            <div className="flex items-center overflow-hidden rounded-md border-solid border-2 border-secondaryColor hover:text-primaryColor hover:bg-Color300 hover:border-primaryColor ml-3 transition duration-500 ease-in-out transform">
              <button 
                className="flex items-center py-1 px-2"
                onClick={toggleDropdown}
              >
                <span className="text-primaryColor font-semibold mr-1 ">{user.displayName}</span>
                <LiaUserSolid size={24}/>
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
              <li>
              </li>
            </div>
          </>
        )}

        {/* //- Botón de ingresar siempre visible */}
        {!user && (
          <li className="ml-3">
            <NavLink to="/login">
              <button className="py-1.5 px-3 rounded-md bg-primaryColor text-Color200 hover:text-black hover:bg-white border-2 hover:border-primaryColor">
                Ingresa
              </button>
            </NavLink>
          </li>
        )}

        {/* //- Si el usuario está autenticado, muestra el botón desplegable */}
        {user && (
          <li className="relative mt-8">
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
                  {
                  usersFinder?.role === 'artista'?
                  <NavLink
                    to="/createEvent"
                    className="block rounded-lg px-4 py-2 text-sm hover:text-secondaryColor hover:bg-BackgroundLight"
                    role="menuitem"
                    onClick={closeDropdown}
                  >
                    Crear Evento
                  </NavLink> : null
                  } 
                  {
                  usersFinder?.role === 'customer'?
                  <NavLink
                    to="/PanelAdmin"
                    className="block rounded-lg px-4 py-2 text-sm hover:text-secondaryColor hover:bg-BackgroundLight"
                    role="menuitem"
                    onClick={closeDropdown}
                  >
                    Panel admin
                  </NavLink> : null
                  } 

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
      </ul>
    </nav>
  );
};

export default NavBar;
