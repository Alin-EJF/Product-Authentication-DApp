import "./App.css";
import { Route, Routes } from "react-router-dom";
import { IndexPage, LoginPage, RegisterPage } from "./components";
import Layout from "./Layout";
import axios from 'axios';

axios.defaults.baseURL = "http://localhost:3000";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<IndexPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>
    </Routes>
  );
}

export default App;
