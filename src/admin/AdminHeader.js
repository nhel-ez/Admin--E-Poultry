import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import image from "./images/chicken-logo.webp";
import { auth, db, logoutAdmin } from ".././firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { query, collection, onSnapshot } from "firebase/firestore";
import PreLoader from ".././PreLoader";

const AdminHeader = (props) => {
  const [admin, loading] = useAuthState(auth);
  const [countCheckout, setCountCheckout] = useState(0);
  const [countToShip, setCounToShip] = useState(0);
  const [countCanceled, setCountCanceled] = useState(0);
  const [countDelivered, setCountDelivered] = useState(0);

  useEffect(() => {
    if (loading) return;
    const x = query(collection(db, "product"));
    const y = onSnapshot(x, (querySnapshot) => {
      let z = [];
      querySnapshot.forEach((doc) => {
        z.push({ ...doc.data(), id: doc.id });
      });
      const countCanceled = z.filter((doc) => doc.status === "Checkout");
      const countCheckout = z.filter((doc) => doc.status === "Canceled");
      const countToShip = z.filter((doc) => doc.status === "To Ship");
      const countDelivered = z.filter((doc) => doc.status === "Delivered");
      // total price of all products
      setCountCheckout(countCanceled.length);
      setCounToShip(countToShip.length);
      setCountCanceled(countCheckout.length);
      setCountDelivered(countDelivered.length);
    });
    return () => y();
  }, [admin, loading]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link
          className="navbar-brand"
          to={"/admin/dashboard"}
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
              to={"/admin/dashboard"}
              onClick={() => {
                PreLoader();
              }}
              style={{ textAlign: "center" }}
            >
              Admin Panel
            </Link>
            <Link
              className="nav-link"
              to={"/admin/tracking"}
              onClick={() => {
                PreLoader();
              }}
              style={{ textAlign: "center" }}
            >
              Tracking
            </Link>
            <Link
              className="nav-link"
              to={"/admin/about"}
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
                Customer Orders
              </Link>
              <div className="dropdown-menu">
                <Link
                  className="dropdown-item"
                  to={"/admin/checkout"}
                  onClick={() => {
                    PreLoader();
                  }}
                >
                  Checkout&nbsp;&nbsp;
                  <span
                    className="caret"
                    style={{
                      backgroundColor: "darkred",
                      color: "white",
                      border: "1px solid transparent",
                      paddingRight: "6px",
                      paddingLeft: "6px",
                      borderRadius: "50%",
                      fontSize: "10px",
                    }}
                  >
                    {countCheckout}
                  </span>
                </Link>
                <Link
                  className="dropdown-item"
                  to={"/admin/toship"}
                  onClick={() => {
                    PreLoader();
                  }}
                >
                  To Ship&nbsp;&nbsp;
                  <span
                    className="caret"
                    style={{
                      backgroundColor: "darkred",
                      color: "white",
                      border: "1px solid transparent",
                      paddingRight: "6px",
                      paddingLeft: "6px",
                      borderRadius: "50%",
                      fontSize: "10px",
                    }}
                  >
                    {countToShip}
                  </span>
                </Link>
                <Link
                  className="dropdown-item"
                  to={"/admin/cancel"}
                  onClick={() => {
                    PreLoader();
                  }}
                >
                  Canceled&nbsp;&nbsp;
                  <span
                    className="caret"
                    style={{
                      backgroundColor: "darkred",
                      color: "white",
                      border: "1px solid transparent",
                      paddingRight: "6px",
                      paddingLeft: "6px",
                      borderRadius: "50%",
                      fontSize: "10px",
                    }}
                  >
                    {countCanceled}
                  </span>
                </Link>
                <Link
                  className="dropdown-item"
                  to={"/admin/delivered"}
                  onClick={() => {
                    PreLoader();
                  }}
                >
                  Delivered&nbsp;&nbsp;
                  <span
                    className="caret"
                    style={{
                      backgroundColor: "darkred",
                      color: "white",
                      border: "1px solid transparent",
                      paddingRight: "6px",
                      paddingLeft: "6px",
                      borderRadius: "50%",
                      fontSize: "10px",
                    }}
                  >
                    {countDelivered}
                  </span>
                </Link>
              </div>
            </div>
            <Link
              className="nav-link"
              to={"/admin/profile"}
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
