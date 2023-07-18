import "./App.css";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Detail from "./Views/Detail/Detail";
import Landing from "./Views/Landing/Landing";

function App() {
  return (
    <div className="">
     {location.pathname !== "/" && <NavBar />}

      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path='/detail/:id' element={<Detail/>} />
        <Route path="/" element={<Landing />} />
      </Routes>
    </div>
  );
}

export default App;
