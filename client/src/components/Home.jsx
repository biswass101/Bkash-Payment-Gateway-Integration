import React from 'react'
import axios from 'axios'
const Home = () => {
    const handlePayBaksh = async () => {
        try {
            const { data } = await axios.post(
                'http://localhost:5000/api/bkash/payment/create',
                {
                    amount: 50,
                    orderId: 1
                },
            )
            window.location.href = data.bkashURL;
            console.log(data);
        } catch (error) {
            console.log(error.response.data);
        }
    }
  return (
    <div>
        <button onClick={handlePayBaksh}>Pay Bkash</button>
    </div>
  )
}

export default Home