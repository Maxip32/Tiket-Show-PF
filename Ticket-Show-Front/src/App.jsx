import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Detail from "./Views/Detail/Detail";
import Landing from "./Views/Landing/Landing";
import Home from "./Views/Home/Home";
import Login from "./components/FormFirebase/FormLogin"
import Register from "./components/FormFirebase/FormRegister"
import { AuthProvider } from '../src/context/AuthContext';




function App() {

  const location = useLocation();
  return (
    <AuthProvider>
    <div className="App">
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
