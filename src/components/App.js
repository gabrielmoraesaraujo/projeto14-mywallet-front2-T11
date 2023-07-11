import {BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import TokenContext from "../contexts/TokenContext";

import SignIn from "./SignIn";
import SignUp from "./SignUp";
import MyWallet from "./MyWallet";
import NewIn from "./NewIn";
import NewOut from "./NewOut";

export default function App() {
  const [token, setToken] = useState("");
  const [usuarioLogado, setUsuarioLogado] = useState({});

  return (
    <BrowserRouter>
    <TokenContext.Provider value={{token, setToken, usuarioLogado, setUsuarioLogado}}>
    <Routes>
        <Route path="/" element={<SignIn/>}></Route>
        <Route path="/SignUp" element={<SignUp/>}></Route>
        <Route path="/MyWallet" element={<MyWallet/>}></Route>
        <Route path="/NewIn" element={<NewIn/>}></Route>
        <Route path="/NewOut" element={<NewOut/>}></Route>
    </Routes>
    </TokenContext.Provider>
    </BrowserRouter>
  );
}