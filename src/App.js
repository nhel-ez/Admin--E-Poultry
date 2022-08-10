import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PreLoader from "./PreLoader";
import AdminLogin from "./admin/AdminLogin";
import AdminRegister from "./admin/AdminRegister";
import AdminReset from "./admin/AdminReset";
import AdminDashboard from "./admin/AdminDashboard";
import AdminFooter from "./admin/AdminFooter";
import AdminHeader from "./admin/AdminHeader";

function App() {
  return (
    <Router>
      <div className="app">
        <PreLoader />
        <Routes>
          <Route exact path="/" element={<AdminLogin />} />
          <Route exact path="/admin/register" element={<AdminRegister />} />
          <Route exact path="/admin/reset" element={<AdminReset />} />
          <Route exact path="/admin/dashboard" element={<AdminDashboard />} />
          <Route exact path="/admin/footer" element={<AdminFooter />} />
          <Route exact path="/admin/header" element={<AdminHeader />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;
