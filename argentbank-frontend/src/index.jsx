import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "../src/index.scss";

import Home from "./pages/home/home";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import SignIn from "./pages/signIn/signIn";
import User from "./pages/user/user";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/user" element={<User />} />
    </Routes>
    <Footer />
  </Router>,
);
