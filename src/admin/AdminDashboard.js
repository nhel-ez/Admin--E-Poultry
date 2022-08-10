import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from ".././firebase";
import { query, collection, onSnapshot } from "firebase/firestore";
import poster from "./images/poster.webp";
import AdminHeader from "./AdminHeader";
import AdminFooter from "./AdminFooter";

const AdminDashboard = (props) => {
  const [admin, loading] = useAuthState(auth);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const [countUsers, setCountUsers] = useState(0);
  const [countCheckout, setCountCheckout] = useState(0);
  const [countToShip, setCounToShip] = useState(0);
  const [countCanceled, setCountCanceled] = useState(0);
  const [countDelivered, setCountDelivered] = useState(0);
  const [totalPriceSold, settotalPriceSold] = useState(0);
  const [totalPriceLoss, settotalPriceLoss] = useState(0);

  useEffect(() => {
    if (loading) return;
    if (!admin) return navigate("/");

    const x = query(collection(db, "admin"));
    const y = onSnapshot(x, (querySnapshot) => {
      let z = [];
      querySnapshot.forEach((doc) => {
        z.push({ ...doc.data(), id: doc.id });
        console.log(querySnapshot.docs.length);
      });
      if (z.length > 0) {
        setUsers(z.filter((doc) => doc.uid === admin.uid));
      }
    });
    return () => y();
  }, [admin, loading, navigate]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
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
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const x = query(collection(db, "users"));
    const y = onSnapshot(x, (querySnapshot) => {
      let z = [];
      querySnapshot.forEach((doc) => {
        z.push({ ...doc.data(), id: doc.id });
      });
      const countUsers = z.length;
      setCountUsers(countUsers);
    });
    return () => y();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const x = query(collection(db, "product"));
    const y = onSnapshot(x, (querySnapshot) => {
      let z = [];
      querySnapshot.forEach((doc) => {
        z.push({ ...doc.data(), id: doc.id });
        const totalPriceSold = z.reduce((acc, curr) => {
          if (curr.status === "Delivered") {
            return acc + curr.totalPrice;
          } else {
            return acc;
          }
        }, 0);

        const totalPriceSoldFormatted = totalPriceSold.toLocaleString("en-US", {
          style: "currency",
          currency: "PHP",
        });
        settotalPriceSold(totalPriceSoldFormatted);

        const totalPriceLoss = z.reduce((acc, curr) => {
          if (curr.status === "Canceled") {
            return acc + curr.totalPrice;
          } else {
            return acc;
          }
        }, 0);

        const totalPriceLossFormatted = totalPriceLoss.toLocaleString("en-US", {
          style: "currency",
          currency: "PHP",
        });
        settotalPriceLoss(totalPriceLossFormatted);
      });
    });
    return () => y();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <AdminHeader />
      <section
        style={{ marginTop: "100px", marginLeft: "20px", marginRight: "20px" }}
      >
        <center>
          <div className="col-md-10">
            <div className="row ">
              <div className="col-xl-3 col-lg-6">
                <div className="card l-bg-orange-dark">
                  <div className="card-statistic-3 p-4">
                    <div className="card-icon card-icon-large ">
                      <i className="fas fa-shopping-cart px-4"></i>
                    </div>
                    <div className="mb-4">
                      <h5 className="card-title mb-0">Checkout</h5>
                    </div>
                    <div className="row align-items-center mb-2 d-flex">
                      <h2>{countCheckout}</h2>
                      <div className="col-4 text-right"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-6">
                <div className="card l-bg-blue-dark">
                  <div className="card-statistic-3 p-4">
                    <div className="card-icon card-icon-large">
                      <i className="fas fa-shopping-cart px-4"></i>
                    </div>
                    <div className="mb-4">
                      <h5 className="card-title mb-0">To Ship</h5>
                    </div>
                    <div className="row align-items-center mb-2 d-flex">
                      <h2>{countToShip}</h2>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-6">
                <div className="card l-bg-cherry">
                  <div className="card-statistic-3 p-4">
                    <div className="card-icon card-icon-large">
                      <i className="fas fa-shopping-cart px-4"></i>
                    </div>
                    <div className="mb-4">
                      <h5 className="card-title mb-0">Canceled</h5>
                    </div>
                    <div className="row align-items-center mb-2 d-flex">
                      <h2>{countCanceled}</h2>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-6">
                <div className="card l-bg-green-dark">
                  <div className="card-statistic-3 p-4">
                    <div className="card-icon card-icon-large">
                      <i className="fas fa-shopping-cart px-4"></i>
                    </div>
                    <div className="mb-4">
                      <h5 className="card-title mb-0">Delivered</h5>
                    </div>
                    <div className="row align-items-center mb-2 d-flex">
                      <h2>{countDelivered}</h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </center>
      </section>
      <section>
        <div className="container py-5">
          <div className="row d-flex align-items-center justify-content-center h-100">
            {users.map((data) => {
              return (
                <div className="col-md-8 col-lg-7 col-xl-6" key={data.id}>
                  <center>
                    <h1>
                      Welcome{" "}
                      <span style={{ color: "#004077" }}>{data.name}</span> to
                      E-
                      <span style={{ color: "#004077" }}>Poultry</span>
                    </h1>

                    <p className="lead" style={{ marginBottom: "40px" }}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                    <button className="btn-grad">Track Orders Now!</button>
                  </center>
                </div>
              );
            })}
            <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
              <center>
                <img src={poster} height={300} width={300} alt="poster" />
              </center>
            </div>
          </div>
        </div>
      </section>
      <hr
        style={{
          border: "1px dashed gray",
          marginTop: "20px",
        }}
      />
      <center>
        <section className="">
          <div className="container mb-5">
            <div className="row d-flex align-items-center justify-content-center">
              <div className="container">
                <h1 class="text" style={{ fontSize: "60px" }}>
                  {countUsers}
                </h1>
                <h5 style={{ color: "#004077" }}>Total Users</h5>
              </div>
            </div>
          </div>
        </section>
      </center>
      <center>
        <section className="">
          <div className="container mb-5">
            <div className="row d-flex align-items-center justify-content-center">
              <div className="container">
                <h1 class="text" style={{ fontSize: "60px" }}>
                  {totalPriceSold}
                </h1>
                <h5 style={{ color: "#004077" }}>Total Selling Price</h5>
              </div>
            </div>
          </div>
        </section>
      </center>
      <center>
        <section className="">
          <div className="container mb-5">
            <div className="row d-flex align-items-center justify-content-center">
              <div className="container">
                <h1 class="text" style={{ fontSize: "60px" }}>
                  {totalPriceLoss}
                </h1>
                <h5 style={{ color: "#004077" }}>Total Loss Price</h5>
              </div>
            </div>
          </div>
        </section>
      </center>
      <AdminFooter />
    </>
  );
};
export default AdminDashboard;
