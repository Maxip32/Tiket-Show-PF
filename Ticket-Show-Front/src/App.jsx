import "./App.css";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Detail from "./Views/Detail/Detail";
import Home from "./views/Home/Home";

function App() {
  return (
    <div className="">
      <NavBar />

      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path='/detail/:id' element={<Detail/>} />
      </Routes>
    </div>
  );
}

export default App;
