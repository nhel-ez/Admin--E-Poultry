import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import poster from "./images/poster.webp";
import AdminFooter from "./AdminFooter";
import AdminHeader from "./AdminHeader";

const AdminAboutUs = (props) => {
  const [admin, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!admin) return navigate("/");
  }, [admin, loading, navigate]);
  return (
    <>
      <AdminHeader />
      <section style={{ marginTop: "80px" }}>
        <div className="container py-5 h-100">
          <div className="row d-flex align-items-center justify-content-center h-100">
            <div className="col-md-8 col-lg-7 col-xl-6">
              <center>
                <img src={poster} height={300} width={300} alt="poster" />
              </center>
            </div>
            <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
              <center>
                <div className="right-content">
                  <h1 className="mb-4">About Us</h1>
                  <span>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod kon tempor incididunt ut labore.
                  </span>
                  <div className="quote">
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiuski smod kon tempor incididunt ut labore.
                    </p>
                  </div>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod kon tempor incididunt ut labore et dolore magna
                    aliqua ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip.
                  </p>
                  <section className="mt-4">
                    <h1 className="mb-4 mt-4">Connect With Us</h1>
                    <Link to={"#"} className="p-4">
                      <i className="fab fa-facebook-f h3"></i>
                    </Link>

                    <Link to={"#"} className="p-4">
                      <i className="fab fa-twitter h3"></i>
                    </Link>

                    <Link to={"#"} className="p-4">
                      <i className="fab fa-instagram h3"></i>
                    </Link>

                    <Link to={"#"} className="p-4">
                      <i className="fab fa-linkedin-in h3"></i>
                    </Link>
                  </section>
                </div>
              </center>
            </div>
          </div>
        </div>
      </section>
      ,
      <center>
        <hr
          style={{
            border: "1px dashed gray",
            marginBottom: "20px",
            marginTop: "20px",
          }}
        />
        <section style={{ marginBottom: "50px" }}>
          <div className="container h-10">
            <div className="row d-flex align-items-center justify-content-center h-10">
              <h1 style={{ color: "#004077" }}>Our Services</h1>
              <h4>Living Chickens and Eggs</h4>
            </div>
          </div>
        </section>
      </center>
      <center>
        <section className="our-team" style={{ marginBottom: "50px" }}>
          <div className="container">
            <div className="row">
              <div className="col-lg-4">
                <div className="team-item">
                  <div className="down-content">
                    <i>
                      <h2>20% Off Discount</h2>
                    </i>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="team-item">
                  <div className="down-content">
                    <i>
                      <h2>30% Off Discount</h2>
                    </i>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="team-item">
                  <div className="down-content">
                    <i>
                      <h2>₱60 Shipping Fee</h2>
                    </i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </center>
      <AdminFooter />
    </>
  );
};
export default AdminAboutUs;
