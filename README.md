# EVS

port = 5000
db_url = 'mongodb://127.0.0.1:27017/bkash'

bkash_username = 'sandboxTokenizedUser02'
bkash_password = 'sandboxTokenizedUser02@12345'
bkash_api_key = '4f6o0cjiki2rfm34kfdadl1eqq'
bkash_secret_key = '2is7hdktrekvrbljjh44ll3d9l1dtjo4pasmjvs5vl5qr3fug4b'

bkash_grant_token_url = https://tokenized.sandbox.bka.sh/v1.2.0-beta/tokenized/checkout/token/grant
bkash_create_payment_url =  https://tokenized.sandbox.bka.sh/v1.2.0-beta/tokenized/checkout/create
bkash_execute_payment_url = https://tokenized.sandbox.bka.sh/v1.2.0-beta/tokenized/checkout/execute
bkash_refund_transaction_url = https://tokenized.sandbox.bka.sh/v1.2.0-beta/tokenized/checkout/payment/refund

# API's
POST: <BaseURL>/bkash/payment/create       //For creating Payment
      url: bkash_create_payment_url,
      body: {
        mode: "0011",
        payerReference: " ",
        callbackURL: "<BaseURL>/api/bkash/payment/callback",
        amount: amount,
        currency: "BDT",
        intent: "sale",
        merchantInvoiceNumber: "Any Number",
      }
      Headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        authorization: "id_token",
        "x-app-key": bkash_api_key,
      }
GET: <BaseURL>/bkash/payment/callback     //For Getting Bkash Interface
      url: bkash_execute_payment_url,
      body: {
        paymentID
      }
      Headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        authorization: "id_token",
        "x-app-key": bkash_api_key,
      }
GET: <BaseURL>/bkash/payment/refund/:trxId      //Refund
      url: bkash_refund_transaction_url
      body: {
        paymentID: paymentID,
        amount: amount,
        trxID : trxId,
        sku: "payment",
        reason: "valid reason",
      }
       Headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        authorization: "id_token",
        "x-app-key": bkash_api_key,
      }

# Authentication
url: bkash_grant_token_url
body: {
  app_key : bkash_api_key,
  app_secret : bkash_secret_key,
}
headers: 
  {
    "Content-Type" : "application/json",
    "Accept" : "application/json",
    username : bkash_username,
    password : bkash_password
  }


# Testing Numbers, Password and OTP:
Test Numbers: 
	01770618575 (money available)
	01823074817 (no money)
	01823074818 blcoked

authorization:
	password: 12121
	otp: 123456
	
