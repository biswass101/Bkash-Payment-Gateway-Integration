import React, { useEffect, useState } from "react";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
const Home = () => {
  const [amount, setAmount] = useState({ amount: "" });
  const [loading, setIsloading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAmount((prev) => ({ ...prev, [name]: value }));
  };

  const handlePayBaksh = async () => {
    if (amount.amount === "") {
      enqueueSnackbar("Value must not be empty", { variant: "error" });
      return;
    }
    if (amount.amount < 20) {
      enqueueSnackbar("Value must be atleast 20 BDT", { variant: "error" });
      return;
    }
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/bkash/payment/create",
        {
          amount: amount.amount,
          orderId: 1,
        }
      );
      window.location.href = data.bkashURL;
      console.log(data);
    } catch (error) {
      console.log(error.response.data);
    }
  };
  const handleBkashRefund = async () => {
    try {
      const trxId = JSON.parse(localStorage.getItem("trxId"));
      if (!trxId) {
        enqueueSnackbar("Transaction Not Found", { variant: "error" });
        return;
      }
      setIsloading(true);
      const { data } = await axios.get(
        `http://localhost:5000/api/bkash/payment/refund/${trxId}`
      );
      setIsloading(false);
      enqueueSnackbar(data.message, { variant: "success" });
      localStorage.removeItem("trxId");
    } catch (error) {
      setIsloading(false);
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };
  return (
    <div>
      <div>
        <input
          style={{
            marginBottom: "10px",
            outline: "none",
            border: "none",
            padding: "10px",
            borderRadius: "10px",
          }}
          type="number"
          value={amount.amount}
          onChange={handleChange}
          name="amount"
          id="amount"
          placeholder="Enter amount.."
        />
      </div>
      <button onClick={handlePayBaksh}>Pay Bkash</button>
      <div style={{ marginTop: "10px" }}>
        <button onClick={handleBkashRefund}>{loading ? 'Refunding' : 'Request For Refund'}</button>
      </div>
    </div>
  );
};

export default Home;
