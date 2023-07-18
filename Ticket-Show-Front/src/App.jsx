import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import { Route, Routes } from "react-router-dom";
import Home from "./Views/Home/Home";
import Detail from "./Views/Detail/Detail";
function App() {
  return (
    <div className="bg-blue-700 w-64">
      <NavBar />

      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path='/detail/:id' element={<Detail/>} />
      </Routes>
    </div>
  );
}

export default App;
