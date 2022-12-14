import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase";
import { collection, query, onSnapshot } from "firebase/firestore";
import AdminHeader from "../AdminHeader";
import AdminFooter from "../AdminFooter";

const AdminCancel = (props) => {
  const [admin, loading] = useAuthState(auth);
  const navigate = useNavigate();
  const [product, setProduct] = useState([]);
  const [noData, setNoData] = useState("***************************");

  useEffect(() => {
    if (loading) return;
    if (!admin) return navigate("/");

    const x = query(collection(db, "product"));
    const y = onSnapshot(x, (querySnapshot) => {
      let z = [];
      querySnapshot.forEach((doc) => {
        z.push({ ...doc.data(), id: doc.id });
      });

      if (z.length > 0) {
        setProduct(
          z
            .filter((doc) => doc.status === "Canceled")
            .sort((a, b) => b.timestamp - a.timestamp)
        );
      } else {
        setNoData(noData);
      }
    });

    return () => y();
  }, [admin, loading, navigate]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <AdminHeader />
      <section
        style={{
          marginTop: "90px",
          marginLeft: "20px",
          marginRight: "20px",
          marginBottom: "20px",
        }}
      >
        <div className="card shadow py-5 px-3 mb-5 bg-white rounded border-0">
          <div
            id="show-data"
            style={{
              textAlign: "center",
              marginBottom: "20px",
            }}
          >
            <h2>Canceled</h2>
          </div>

          <div className="scrollme">
            <table class="table table-borderless table-hover table-condensed">
              <thead className="bg-light">
                <tr>
                  <th scope="col" className="py-2">
                    Tracking No
                  </th>
                  <th scope="col" className="py-2">
                    Full Name
                  </th>
                  <th scope="col" className="py-2">
                    Email
                  </th>
                  <th scope="col" className="py-2">
                    Contact No
                  </th>
                  <th scope="col" className="py-2">
                    Address
                  </th>
                  <th scope="col" className="py-2">
                    Product Name
                  </th>
                  <th scope="col" className="py-2">
                    Quanity
                  </th>
                  <th scope="col" className="py-2">
                    Total Price
                  </th>
                  <th scope="col" className="py-2">
                    Payment Method
                  </th>
                  <th scope="col" className="py-2">
                    Date of Canceled
                  </th>
                </tr>
              </thead>
              {product.map((data) => {
                return (
                  <tbody key={data.id}>
                    <tr>
                      <td className="py-2">{data.trackingNo}</td>
                      <td className="py-2">{data.customerName}</td>
                      <td className="py-2">{data.customerEmail}</td>
                      <td className="py-2">{data.contactNo}</td>
                      <td className="py-2">{data.address}</td>
                      <td className="py-2">{data.productName}</td>
                      <td className="py-2">{data.quantity}</td>
                      <td className="py-2">???{data.totalPrice}</td>
                      <td className="py-2">{data.paymentMethod}</td>
                      <td className="py-2">{data.timestampCancel}</td>
                    </tr>
                  </tbody>
                );
              })}
            </table>
          </div>
          <div>
            <center>
              <br />
              <span>{noData}</span>
            </center>
          </div>
        </div>
      </section>
      <AdminFooter />
    </>
  );
};
export default AdminCancel;
