import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Detail from "./Views/Detail/Detail";

import Home from "./Views/Home/Home";
import CartPage from "./components/Shoppingcart/Shoppingcart"
import LoginForm from "./components/FormFirebase/FormLogin";
import RegisterForm from "./components/FormFirebase/FormRegister";
import Artist from "./components/FormFirebase/FormArtist";
import About from "./Views/AboutUs/About";
import { AuthProvider } from "../src/context/AuthContext";

function App() {
  const location = useLocation();
  return (
    <AuthProvider>
    <div className="App">
    {location.pathname !== "/" && <NavBar />}

      <Routes>
        <Route path="/registerUser" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/registerArtist" element={<Artist />} />
        <Route path="/home" element={<Home />} />
        <Route path='/detail/:id' element={<Detail/>} />
        <Route path="/" element={<Landing />} />
      </Routes>
    </div>

      <div className="App">
       <NavBar />

        <Routes>
          <Route path="/registerUser" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/registerArtist" element={<Artist />} />
          <Route path="/" element={<Home />} />
          <Route path="/detail/:id" element={<Detail />} />

          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
