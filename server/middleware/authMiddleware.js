require('dotenv').config();
const axios = require('axios');
const globals = require('node-global-storage');
const bkashAuth = async(req, res, next) => {
    globals.unsetValue('id_token');
    try {
        const {data} = await axios.post(process.env.bkash_grant_token_url, 
            //parameters
            {
                app_key : process.env.bkash_api_key,
                app_secret : process.env.bkash_secret_key,
            },
            //options
            {
                headers: {
                    "Content-Type" : "application/json",
                    "Accept" : "application/json",
                    username : process.env.bkash_username,
                    password : process.env.bkash_password
                }
            }
        );

        globals.setValue('id_token', data.id_token, {protected: true});
        next();
    } catch (error) {
        return res.status(401).jsoon({error: error.message});
    }
}

module.exports = {bkashAuth}