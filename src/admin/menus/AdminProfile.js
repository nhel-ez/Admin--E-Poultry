import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase";
import { collection, query, onSnapshot } from "firebase/firestore";
import AdminHeader from "../AdminHeader";
import AdminFooter from "../AdminFooter";

const AdminpProfile = (props) => {
  const [admin, loading] = useAuthState(auth);
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (loading) return;
    if (!admin) return navigate("/");

    const x = query(collection(db, "admin"));
    const y = onSnapshot(x, (querySnapshot) => {
      let z = [];
      querySnapshot.forEach((doc) => {
        z.push({ ...doc.data(), id: doc.id });
      });
      if (z.length > 0) {
        setUsers(
          z
            .filter((doc) => doc.uid === admin.uid)
            .sort((a, b) => b.timestamp - a.timestamp)
        );
      }
    });

    return () => y();
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
            {users.map((data) => {
              return (
                <div
                  key={data.id}
                  style={{
                    marginTop: "50px",
                  }}
                >
                  <div className="card shadow p-3 mb-5 bg-white rounded border-0">
                    <div className="card-body">
                      <center>
                        <div
                          style={{
                            backgroundColor: "white",
                            borderRadius: "100%",
                            width: "fit-content",
                            height: "fit-content",
                            marginTop: "-100px",
                            padding: "0",
                            border: "5px solid white",
                          }}
                        >
                          <i
                            className="fas fa-user-circle h1"
                            style={{
                              color: "#0062c4",
                              fontSize: "120px",
                            }}
                          ></i>
                        </div>
                      </center>
                      <center>
                        <h1 style={{ color: "#004077" }}>{data.name}</h1>
                        <h6>{data.email}</h6>
                        <br />
                        <Link
                          className="btn btn-outline-primary m-1"
                          to="/admin/change-password"
                        >
                          Reset Password
                        </Link>
                      </center>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <AdminFooter />
    </>
  );
};
export default AdminpProfile;
