import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { auth, db } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  updateDoc,
  collection,
  doc,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import AdminHeader from "../AdminHeader";
import AdminFooter from "../AdminFooter";

const ToShipForm = (_) => {
  const { state } = useLocation();
  const data = state.product;
  const navigate = useNavigate();
  const [admin, loading] = useAuthState(auth);
  const [product, setProduct] = useState([]);
  const [status, setStatus] = useState(data.status);
  const [arrival, setArrival] = useState("");
  const [timestampToShip, setTimestampToShip] = useState("");

  const computeArrival = () => {
    const current = new Date();
    const arrival = new Date(current.getTime() + 3 * 24 * 60 * 60 * 1000);
    setArrival(arrival.toDateString());
  };

  const convertTimestamp = () => {
    const current = new Date();
    const timestampToShip = new Date(current.getTime());
    setTimestampToShip(timestampToShip.toDateString());
  };

  const productToShip = async (e) => {
    setProduct([...product]);
    await updateDoc(doc(db, "product", data.id), {
      status: "To Ship",
      timestampToShip: timestampToShip,
      timestamp: serverTimestamp(),
    });
    if (product) navigate("/admin/toship");
  };

  useEffect(() => {
    computeArrival();
    convertTimestamp();
    if (loading) return;
    if (!admin) return navigate("/");

    console.log(data);
    const x = collection(db, "product");
    const y = onSnapshot(x, (querySnapshot) => {
      let z = [];
      querySnapshot.forEach((doc) => {
        z.push({ ...doc.data(), id: doc.id });
      });

      setProduct(z);
    });
    return () => y();
  }, [admin, loading, data, navigate]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <AdminHeader />
      <section
        style={{
          marginTop: "120px",
          marginLeft: "20px",
          marginRight: "20px",
          marginBottom: "120px",
        }}
      >
        <div className="container py-5">
          <div className="row d-flex align-items-center justify-content-center">
            <div className="card shadow p-3 mb-5 bg-white rounded border-0">
              <div className="card-body">
                <div className="row">
                  <div style={{ textAlign: "center", marginBottom: "20px" }}>
                    <h4>Are you sure you want to ship this product?</h4>
                  </div>
                  <form>
                    <div className="row" key={data.id} data={data}>
                      <div className="col-md-8 col-lg-7 col-xl-6 mb-4">
                        <div className="form-group mb-2" hidden>
                          <input
                            type="text"
                            className="form-control border-0 bg-light"
                            id="status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            readOnly
                          />
                        </div>
                        <div className="form-group mb-2" hidden>
                          <input
                            type="text"
                            className="form-control border-0 bg-light"
                            id="status"
                            value={arrival}
                            onChange={(e) => setArrival(e.target.value)}
                            readOnly
                          />
                        </div>
                        <div className="form-group mb-2" hidden>
                          <input
                            type="text"
                            className="form-control border-0 bg-light"
                            id="status"
                            value={timestampToShip}
                            onChange={(e) => setTimestampToShip(e.target.value)}
                            readOnly
                          />
                        </div>
                      </div>
                      <center>
                        <button
                          type="button"
                          className="btn btn-primary"
                          style={{ width: "180px" }}
                          onClick={productToShip}
                        >
                          Yes, To Ship
                        </button>
                      </center>
                    </div>
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

export default ToShipForm;
