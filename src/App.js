import { Routes, Route } from "react-router-dom";
import './App.css';
import Home from './pages/Home.js';
import Detail from "./pages/Detail.js";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/detail/:id" element={<Detail/>} />
        </Routes>
    );
}

export default App;
