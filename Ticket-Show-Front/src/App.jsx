import "./App.css";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Detail from "./Views/Detail/Detail";
import Landing from "./Views/Landing/Landing";
import Home from "./Views/Home/Home";
import Login from "./components/FormFirebase/FormLogin"
import Register from "./components/FormFirebase/FormRegister"
import { AuthProvider } from '../src/context/AuthContext';


function App() {
  return (
    <AuthProvider>

    <div className="">
     {location.pathname !== "/" && <NavBar />}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/singUp" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path='/detail/:id' element={<Detail/>} />
        <Route path="/" element={<Landing />} />
      </Routes>
    </div>



    </AuthProvider>
  );
}

export default App;
