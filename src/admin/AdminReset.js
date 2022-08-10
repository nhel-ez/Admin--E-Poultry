import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { auth, sendPasswordResetAdmin } from ".././firebase";
import poster from "./images/poster.webp";

const Reset = (props) => {
  const [email, setEmail] = useState("");
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  const resetAdmin = (e) => {
    e.preventDefault();
    if (!email) alert("Please enter email");
    sendPasswordResetAdmin(email);
  };

  useEffect(() => {
    if (loading) return;
    if (user) navigate("/dashboard");
  }, [user, loading, navigate]);
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
              <form onSubmit={resetAdmin}>
                <div className="form-outline mb-4">
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
                <center>
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg px-5"
                    style={{ border: "none" }}
                  >
                    Reset Password
                  </button>
                </center>
              </form>

              <div className="divider d-flex align-items-center my-4">
                <p className="text-center fw-bold mx-3 mb-0 text-muted">OR</p>
              </div>

              <div className="d-flex justify-content-around align-items-center mb-4">
                <span style={{ marginTop: "-40px" }}>
                  Don't have an account?
                </span>

                <button
                  className="btn btn-outline-primary btn-lg btn-block"
                  style={{ marginBottom: "40px" }}
                >
                  <Link className="nav-link" to={"/admin/register"}>
                    Sign Up
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
export default Reset;
