import React from "react";
import { Link } from "react-router-dom";
import image from "./images/chicken-logo.webp";
import { logoutAdmin } from ".././firebase";
import PreLoader from ".././PreLoader";

const AdminHeader = (props) => {
  return (
    <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link
          className="navbar-brand"
          to={"/Dashboard"}
          onClick={() => {
            PreLoader();
          }}
        >
          <img src={image} height={40} width={40} alt="logo" />
          E-
          <span style={{ color: "#004077" }}>Poultry</span>
        </Link>
        <button
          type="button"
          className="navbar-toggler"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <div className="navbar-nav">
            <Link
              className="nav-link"
              to={"/Dashboard"}
              onClick={() => {
                PreLoader();
              }}
              style={{ textAlign: "center" }}
            >
              Admin Panel
            </Link>
            <Link
              className="nav-link"
              to={"/about"}
              style={{ textAlign: "center" }}
              onClick={() => {
                PreLoader();
              }}
            >
              About us
            </Link>
            <div className="nav-item dropdown" style={{ textAlign: "center" }}>
              <Link
                className="nav-link dropdown-toggle"
                data-bs-toggle="dropdown"
                to={"/"}
                style={{ textAlign: "center" }}
              >
                Orders
              </Link>
              <div className="dropdown-menu">
                <Link
                  className="dropdown-item"
                  to={"/checkout"}
                  onClick={() => {
                    PreLoader();
                  }}
                >
                  Checkout
                </Link>
                <Link
                  className="dropdown-item"
                  to={"/to-ship"}
                  onClick={() => {
                    PreLoader();
                  }}
                >
                  To Ship
                </Link>
                <Link
                  className="dropdown-item"
                  to={"/cancel"}
                  onClick={() => {
                    PreLoader();
                  }}
                >
                  Canceled
                </Link>
                <Link
                  className="dropdown-item"
                  to={"/delivered"}
                  onClick={() => {
                    PreLoader();
                  }}
                >
                  Delivered
                </Link>
              </div>
            </div>
            <Link
              className="nav-link"
              to={"/profile"}
              onClick={() => {
                PreLoader();
              }}
              style={{ textAlign: "center" }}
            >
              Profile
            </Link>
          </div>
          <div className="navbar-nav ms-auto">
            <Link className="nav-link" to={"#"} style={{ textAlign: "center" }}>
              <button className="btn btn-primary px-3" onClick={logoutAdmin}>
                Logout
              </button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default AdminHeader;
