import React from "react";
import { Link } from "react-router-dom";

const AdminFooter = (props) => {
  return (
    <footer className="bg-dark text-center text-white">
      <div className="container p-4 pb-0">
        <section className="row my-4">
          <div className="col-lg-6">
            <h5>About Us</h5>
            <p style={{ color: "gray" }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Pellentesque euismod, nisi vel consectetur consectetur, nisi velit
              euismod nisi, vel consectetur nisi nisi velit euismod nisi.
            </p>
          </div>
          <div className="col-lg-6">
            <h5>Contact</h5>
            <span style={{ color: "gray" }}>admin@gmail.com</span>
            <br />
            <span style={{ color: "gray" }}>+91-123-456-7890</span>
            <br />
            <span style={{ color: "gray" }}>
              123, ABC Road, XYZ City, ABC State, 123456
            </span>
          </div>
        </section>
        <hr
          style={{
            border: "1px solid gray",
            marginBottom: "20px",
            marginTop: "20px",
          }}
        />
        <section className="mb-4">
          <Link to={"#"} className="social">
            <i className="fab fa-facebook-f"></i>
          </Link>

          <Link to={"#"} className="social">
            <i className="fab fa-twitter"></i>
          </Link>

          <Link to={"#"} className="social">
            <i className="fab fa-instagram"></i>
          </Link>

          <Link to={"#"} className="social">
            <i className="fab fa-linkedin-in"></i>
          </Link>
        </section>
      </div>

      <div className="text-center p-3">
        © 2020 Copyright&nbsp;
        <Link
          to={"#"}
          className="text-white"
          style={{ textDecoration: "none" }}
        >
          {" "}
          E-Poultry
        </Link>
      </div>
    </footer>
  );
};
export default AdminFooter;
