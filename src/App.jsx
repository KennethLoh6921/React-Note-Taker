import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import AddNote from "./components/AddNote";
import Categories from "./components/categories";
import EditNote from "./components/EditNote";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
    return (
        <BrowserRouter>
            <Navigation />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/add-note" element={<AddNote />} />
                <Route path="/category" element={<Categories />} />
                <Route path="/edit-note/:id" element={<EditNote />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
