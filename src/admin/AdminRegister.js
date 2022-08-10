import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import {
  auth,
  registerWithEmailAndPasswordAdmin,
  signInWithGoogleAdmin,
} from ".././firebase";
import poster from "./images/poster.webp";

const AdminRegister = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordType, setPasswordType] = useState("password");
  const [name, setName] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [cPasswordClass, setCPasswordClass] = useState("form-control");
  const [isCPasswordDirty, setIsCPasswordDirty] = useState(false);
  const [admin, loading] = useAuthState(auth);
  const navigate = useNavigate();

  const registerAdmin = (e) => {
    e.preventDefault();
    if (!name) alert("Please enter name");
    if (password !== cPassword) {
      setCPasswordClass("form-control is-invalid");
      setIsCPasswordDirty(true);
      return;
    }
    if (admin) navigate("/admin/dashboard");
    registerWithEmailAndPasswordAdmin(name, email, password);
  };

  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };

  useEffect(() => {
    if (isCPasswordDirty) {
      if (password === cPassword) {
        setCPasswordClass("form-control is-valid");
      } else {
        setCPasswordClass("form-control is-invalid");
      }
    }
    if (loading) return;
    if (admin) navigate("/admin/dashboard");
  }, [admin, loading, password, cPassword, navigate, isCPasswordDirty]);
  const handleCPassword = (e) => {
    setCPassword(e.target.value);
    setIsCPasswordDirty(true);
  };

  return (
    <>
      <section className="vh-100">
        <div className="container py-5 h-100">
          <div className="row d-flex align-items-center justify-content-center h-100">
            <div className="col-md-8 col-lg-7 col-xl-6">
              <center>
                <img src={poster} height={300} width={300} alt="poster" />
                <h2 style={{ marginBottom: "40px" }}>
                  E-Commerce&nbsp;
                  <span style={{ color: "#004077" }}>Poultry</span>
                </h2>
              </center>
            </div>
            <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
              <form onSubmit={registerAdmin}>
                <div className="form-outline mb-2">
                  <label
                    htmlFor="fullName"
                    className="form-label"
                    style={{ float: "left" }}
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-control form-control-md"
                    required
                  />
                </div>
                <div className="form-outline mb-2">
                  <label
                    htmlFor="email"
                    className="form-label"
                    style={{ float: "left" }}
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control form-control-md"
                    required
                  />
                </div>

                <div className="form-outline mb-2">
                  <label
                    htmlFor="password"
                    className="form-label"
                    style={{ float: "left" }}
                  >
                    Password
                  </label>
                  <input
                    type={passwordType}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control form-control-md"
                    required
                  />
                  <span
                    className=""
                    style={{
                      color: "#0062c4",
                      marginTop: "-30px",
                      marginRight: "15px",
                      float: "right",
                    }}
                    onClick={togglePassword}
                  >
                    {passwordType === "password" ? (
                      <i className="fa fa-eye-slash"></i>
                    ) : (
                      <i className="fa fa-eye"></i>
                    )}
                  </span>
                </div>

                <div className="form-outline mb-4">
                  <label
                    htmlFor="confirmPassword"
                    className="form-label"
                    style={{ float: "left" }}
                  >
                    Confirm Password
                  </label>
                  <input
                    type={passwordType}
                    id="confirmPassword"
                    className={cPasswordClass}
                    value={cPassword}
                    onChange={handleCPassword}
                    required
                  />
                </div>

                <center>
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg px-5"
                    style={{ border: "none" }}
                  >
                    Register
                  </button>
                </center>
              </form>

              <div className="divider d-flex align-items-center my-4">
                <p className="text-center fw-bold mx-3 mb-0 text-muted">OR</p>
              </div>
              <center>
                <button
                  type="button"
                  onClick={signInWithGoogleAdmin}
                  className="btn btn-primary btn-lg mb-4"
                  style={{ border: "none" }}
                >
                  <i className="fa-brands fa-google"></i>&nbsp; Continue With
                  Google
                </button>
              </center>

              <div className="d-flex justify-content-around align-items-center mb-4">
                <span style={{ marginTop: "-40px" }}>
                  Already have an account?
                </span>

                <button
                  className="btn btn-outline-primary btn-lg btn-block"
                  style={{ marginBottom: "40px" }}
                >
                  <Link className="nav-link" to={"/admin"}>
                    Sign In
                  </Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default AdminRegister;
