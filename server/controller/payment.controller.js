const axios = require("axios");
const globals = require("node-global-storage");
const payment = require("../models/payment.model");
const { v4: uuidv4 } = require("uuid");

//headers
const bkash_headers = () => {
  return {
    "Content-Type": "application/json",
    Accept: "application/json",
    authorization: globals.getValue("id_token"),
    "x-app-key": process.env.bkash_api_key,
  };
};
const callBack = async (req, res, next) => {
  const { paymentID, status } = req.query;
    // console.log(status);
  if (status === "cancel" || status === "failure") {
    return res.redirect(`http://localhost:5173/error?message=${status}`);
  }
  if (status === "success") {
    try {
      const { data } = await axios.post(
        process.env.bkash_execute_payment_url,
        {
          paymentID,
        },
        {
          headers: bkash_headers(),
        }
      );

      if (data && data.statusCode === "0000") {
        await payment.create({
          userId: Math.random() * 10 + 1,
          paymentID,
          trxId: data.trxID,
          date: data.paymentExecuteTime,
          amount: parseInt(data.amount),
        });

        return res.redirect(`http://localhost:5173/success`);
      } else {
        return res.redirect(`http://localhost:5173/error?message=${data.statusMessage}`)

      }
    } catch (error) {
      return res.redirect(`http://localhost:5173/error?message=${error.message}`);
    }
  }
};

const createPayment = async (req, res, next) => {
  const { amount } = req.body;
  try {
    const { data } = await axios.post(
      process.env.bkash_create_payment_url,
      {
        mode: "0011",
        payerReference: " ",
        callbackURL: "http://localhost:5000/api/bkash/payment/callback",
        amount: amount,
        currency: "BDT",
        intent: "sale",
        merchantInvoiceNumber: "Inv" + uuidv4().substring(0, 5),
      },
      {
        headers: bkash_headers(),
      }
    );
    return res.status(200).json({ bkashURL: data.bkashURL });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { createPayment, callBack };
