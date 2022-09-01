import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./pages/layout";
import EmployeeManagement from "./pages/professional/manageEmployee";
import Home from "./pages/professional/home";
import Profile from "./pages/professional/profile";
import NoPage from "./pages/noPage";
import Login from "./pages/authentification/login";
import Register from "./pages/authentification/register";
import './index.css';
import { getToken } from "./auth/index.js";

const token = getToken();

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="/" element={<Layout />} >
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="manageEmployee" element={<EmployeeManagement />} />
          <Route path="profile" element={<Profile />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);