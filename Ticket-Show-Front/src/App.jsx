import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Detail from "./Views/Detail/Detail";
import Home from "./Views/Home/Home";
<<<<<<< HEAD
import CartPage from "./components/Shoppingcart/Shoppingcart";
=======
import {CartPage} from "./components/Shoppingcart/Shoppingcart"
>>>>>>> 5d18d40911448e35e915af86714016cf71fd1bf2
import LoginForm from "./components/FormFirebase/FormLogin";
import RegisterForm from "./components/FormFirebase/FormRegister";
import Artist from "./components/FormFirebase/FormArtist";
import About from "./Views/AboutUs/About";
import { AuthProvider } from "../src/context/AuthContext";
import CompraPaypal from "./components/Paypal/Paypal.compra.jsx";
import { ShoppingCartProvider } from "./components/Shoppingcart/shoppingCartContext";
function App() {
  const location = useLocation();
  return (
    <ShoppingCartProvider>

    <AuthProvider>
<<<<<<< HEAD
      <div className="App">
        <NavBar />

        <Routes>
          <Route path="/" element={<Home />} />
=======
    <div className="App">
    <NavBar />
          <Routes>
>>>>>>> 5d18d40911448e35e915af86714016cf71fd1bf2
          <Route path="/registerUser" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/registerArtist" element={<Artist />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/approved" element={<CompraPaypal/>}/>
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </AuthProvider>
    </ShoppingCartProvider>
  );
}

export default App;
