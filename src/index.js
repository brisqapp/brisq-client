import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/layout";
import EmployeeManagement from "./pages/professional/manageEmployee";
import Home from "./pages/professional/home";
import Profile from "./pages/professional/profile";
import NoPage from "./pages/noPage";
import Login from "./pages/authentification/login";
import EmployeeDetails from "./pages/employeeDetails";
import Register from "./pages/authentification/register";
import './index.css';
import {getToken} from "./auth/index.js";
import { Navigate } from "react-router-dom";
import Reservation from "./pages/client/reservation";

const token = getToken();

// Gère la session accessible selon que l'utilisateur soit loggé ou non
function sessionAccess(pathTarget) { return getToken() == null ? <Navigate to="/login" /> : pathTarget; }

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="reservation/:id" element={<Reservation/>} /> 
        <Route path="/" element={<Layout />} >
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route index element= {sessionAccess(<Home/>)} />
          <Route path="home" element= {sessionAccess(<Home/>)} />
          <Route path="employeeDetails" element= {sessionAccess(<EmployeeDetails/>)} />
          <Route path="manageEmployee" element= {sessionAccess(<EmployeeManagement />)} />
          <Route path="profile" element= {sessionAccess(<Profile />)} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);