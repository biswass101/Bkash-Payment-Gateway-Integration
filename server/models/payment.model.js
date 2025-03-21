const mongoose = require('mongoose');

const payment = new mongoose.Schema({
    userId : {
        type : Number,
    },
    amount : {
        type : Number,
    },
    trxId : {
        type: String,
    },
    paymentID : {
        type : String,
    },
    date : {
        type: String,
    }
}, {timestamps: true});


module.exports = mongoose.model("Payment", payment);