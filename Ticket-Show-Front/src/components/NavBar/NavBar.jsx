import { NavLink } from "react-router-dom"
import logoTicketShow  from "../../assets/logos/logoTicketShow.svg";


const NavBar = () => {

  const activeStyle = 'underline-offset-5 border-b-2 border-secondaryColor';

  return (
    <nav className='flex justify-between items-center fixed z-10 bg-transparent w-full py-5 px-12 text-md font-light'>

      <ul className='flex items-center gap-3'>
        <li>
          <NavLink to="/home">
            <img className='w-8' src={logoTicketShow} alt="logo" />
          </NavLink>
        </li>
        <li className='font-semibold text-lg'>
          TicketShow
        </li>
      </ul>

      <ul className='flex items-center gap-3'>
      <li>
          <NavLink 
            to="/home"
            className={({ isActive }) =>
              isActive ? activeStyle : ""}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/about"
            className={({ isActive }) =>
              isActive ? activeStyle : ""}
          >
            Acerca de
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/contact"
            className={({ isActive }) =>
              isActive ? activeStyle : ""}
          >
            Contáctenos
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/login"
            className={({ isActive }) =>
              isActive ? activeStyle : ""}
          >
            <button className='py-0.5 px-2 rounded-2xl border-solid border-2 border-secondaryColor'>
              Ingresa
            </button>
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/singUp"
            className={({ isActive }) =>
              isActive ? activeStyle : ""}
          >
            <button className='py-1 px-2 rounded-2xl bg-primaryColor'>
              Regístrate
            </button>
          </NavLink>
        </li>
        <li>
          🛒 0
        </li>
      </ul>
    </nav>
  )
}

export default NavBar