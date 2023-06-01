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
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
