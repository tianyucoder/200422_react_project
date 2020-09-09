import React from "react";
import { BrowserRouter } from "react-router-dom";
import Layout from "./layouts";
import "./assets/css/reset.css";

export default function App() {
  return (
    <BrowserRouter>
			<Layout/>
    </BrowserRouter>
  );
}
