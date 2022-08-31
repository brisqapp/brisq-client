import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./pages/layout/layout";
import Employee from "./pages/manageEmployee";
import Home from "./pages/home";
import Blogs from "./pages/blogs";
import Profile from "./pages/profile";
import Contact from "./pages/contact";
import NoPage from "./pages/layout/noPage";
import Login from "./pages/authentification/login";
import Register from "./pages/authentification/register";
import EmployeeDetails from "./pages/employeeDetails";

import './index.css';
import { getToken } from "./auth/index.js";

const token = getToken();

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="manageEmployee" element={<Employee />} />
          <Route path="profile" element={<Profile />} />
          <Route path="blogs" element = {token == null ? <Navigate to="/login" /> : <Blogs /> } />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NoPage />} />
          <Route path="employeeDetails" element={<EmployeeDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);