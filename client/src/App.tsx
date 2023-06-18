import "./App.css";
import { Route, Routes } from "react-router-dom";
import {
  IndexPage,
  LoginPage,
  RegisterPage,
  AccountPage,
  Manufacturer,
  Distributor,
  Retailer,
  About,
  Admin,
} from "./components";
import Layout from "./Layout";
import axios from "axios";
import { UserContextProvider } from "./UserContext";

axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/manufacturer" element={<Manufacturer />} />
          <Route path="/distributor" element={<Distributor />} />
          <Route path="/retailer" element={<Retailer />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/about" element={<About />} />
          <Route path="/requestId/:id" element={<IndexPage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
