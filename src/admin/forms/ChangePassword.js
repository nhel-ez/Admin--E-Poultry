import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, sendPasswordResetAdmin } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import AdminHeader from "../AdminHeader";
import AdminFooter from "../AdminFooter";

const ChangePassword = (_) => {
  const navigate = useNavigate();
  const [admin, loading] = useAuthState(auth);
  const [email, setEmail] = useState("");

  const reset = (e) => {
    e.preventDefault();
    if (!email) alert("Please enter email");
    sendPasswordResetAdmin(email);
  };

  useEffect(() => {
    if (loading) return;
    if (!admin) return navigate("/");
  }, [admin, loading, navigate]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <AdminHeader />
      <section
        style={{
          marginTop: "60px",
          marginLeft: "10px",
          marginRight: "10px",
          marginBottom: "20px",
        }}
      >
        <div className="container py-5">
          <div className="row d-flex align-items-center justify-content-center">
            <div className="card shadow p-3 mb-5 bg-white rounded border-0">
              <div className="card-body">
                <div className="row">
                  <div style={{ textAlign: "center", marginBottom: "20px" }}>
                    <h2>Change Password</h2>
                  </div>
                  <form onSubmit={reset}>
                    <center>
                      <div
                        className="form-outline mb-4"
                        style={{ width: "300px" }}
                      >
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

                      <button
                        type="submit"
                        className="btn btn-primary btn-lg px-5"
                        style={{ border: "none" }}
                      >
                        Reset Password
                      </button>
                    </center>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <AdminFooter />
    </>
  );
};

export default ChangePassword;
