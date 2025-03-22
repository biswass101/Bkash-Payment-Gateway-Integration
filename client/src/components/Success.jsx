import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import axios from "axios";

const Success = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const trxId = searchParams.get("trxId");
  localStorage.setItem("trxId", JSON.stringify(trxId));
  const [userData, setUserData] = useState();
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api//bkash/payment/user/${trxId}`)
      .then((res) => {
        if (res.status === 200) {
          setUserData(res.data.data);
          enqueueSnackbar(res.data.message, { variant: "success" });
        }
        if (res.status === 404) {
          enqueueSnackbar(res.data.message, { variant: "error" });
        }
      })
      .catch((err) => {
        enqueueSnackbar("Wrong Transaction ID", { variant: "error" });
      });
  }, []);

  const formateData = (dateString) => {
    const date = new Date(dateString);
    const localTime = date.toLocaleString();
    return localTime;
  };
  return (
    <>
      <div>Payment Success</div>
      <div className="info">
        <p>Transaction ID: {userData && userData.trxId}</p>
        <p>Amount: {userData && userData.amount} BDT</p>
        <p>Date: {userData && formateData(userData.createdAt)}</p>
      </div>
      <button onClick={() => navigate("/")}>Home</button>
    </>
  );
};

export default Success;
