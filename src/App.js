import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PreLoader from "./PreLoader";
import AdminLogin from "./admin/AdminLogin";
import AdminRegister from "./admin/AdminRegister";
import AdminReset from "./admin/AdminReset";
import AdminDashboard from "./admin/AdminDashboard";
import AdminAboutUs from "./admin/AdminAboutUs";
import AdminFooter from "./admin/AdminFooter";
import AdminHeader from "./admin/AdminHeader";
import AdminCheckout from "./admin/menus/AdminCheckout";
import AdminToShip from "./admin/menus/AdminToShip";
import AdminCancel from "./admin/menus/AdminCancel";
import AdminpProfile from "./admin/menus/AdminProfile";
import AdminDelivered from "./admin/menus/AdminDelivered";
import AdminTracking from "./admin/menus/AdminTracking";
import ToShipForm from "./admin/forms/ToShipForm";
import DeliveredForm from "./admin/forms/DeliveredForm";
import ChangePasswordForm from "./admin/forms/ChangePassword";

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
          <Route exact path="/admin/about" element={<AdminAboutUs />} />
          <Route exact path="/admin/footer" element={<AdminFooter />} />
          <Route exact path="/admin/header" element={<AdminHeader />} />
          <Route exact path="/admin/checkout" element={<AdminCheckout />} />
          <Route exact path="/admin/toship" element={<AdminToShip />} />
          <Route exact path="/admin/cancel" element={<AdminCancel />} />
          <Route exact path="/admin/delivered" element={<AdminDelivered />} />
          <Route exact path="/admin/tracking" element={<AdminTracking />} />
          <Route exact path="/admin/profile" element={<AdminpProfile />} />
          <Route exact path="/admin/toship/:id" element={<ToShipForm />} />
          <Route
            exact
            path="/admin/delivered/:id"
            element={<DeliveredForm />}
          />
          <Route
            exact
            path="/admin/change-password"
            element={<ChangePasswordForm />}
          />
        </Routes>
      </div>
    </Router>
  );
}
export default App;
