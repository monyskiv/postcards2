import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../components/Home";
import Postcards from "../components/Postcards";
import Postcard from "../components/Postcard";
import NewPostcard from "../components/NewPostcard";

export default (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/postcards" element={<Postcards />} />
      <Route path="/postcard/:id" element={<Postcard />} />
      <Route path="/new_postcard" element={<NewPostcard />} />
    </Routes>
  </Router>
);