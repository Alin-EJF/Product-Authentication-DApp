import "./App.css";
import { Route, Routes } from "react-router-dom";
import { IndexPage, LoginPage, RegisterPage } from "./components";

function App() {
  return (
    <Routes>
      <Route index element={<IndexPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
}

export default App;
