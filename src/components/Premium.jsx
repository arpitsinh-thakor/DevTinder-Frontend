import axios from "axios"
import { BASE_URL } from "../utils/constants"
import { useState } from "react";


const Premium = () => {

    const [isPremiumUser, setIsPremiumUser] = useState(false);

    const verifyPayment = async () => {
        const res = await axios.post(BASE_URL + "/payment/verify", {}, { withCredentials: true });
        if (res.data.success) {
            setIsPremiumUser(true);
        } else {
            alert("Payment verification failed. Please try again.");
        }
    }

    const handleBuyMembership = async (type) => {
        
        const order = await axios.post(BASE_URL + "/payment/create",
                { 
                membershipType: type
              },
             { withCredentials: true })

        const { amount, currency, RAZORPAY_KEY_ID, notes, orderId } = order.data;
        const { membershipType, firstName, lastName, email } = notes;
        
        const options = {
            key: RAZORPAY_KEY_ID, 
            amount: amount, 
            currency: currency,
            name: "DevTinder",
            description: `Purchase ${membershipType} Membership`,
            order_id: orderId, 
            prefill: {
                name: `${firstName} ${lastName}`,
                email: email,
                contact: "9999999999" 
            },
            handler: verifyPayment,
            theme: {
                color: "#3399cc"
            }
        }

        const rzp = new window.Razorpay(options);
        rzp.open();
        
    }
  return isPremiumUser ? (
    <div className="premium-container flex flex-col items-center justify-center h-screen">
      <h1>Welcome to Premium Membership</h1>
      <p>Thank you for being a premium user!</p>
    </div>
  ) : (
        
    //silver and gold membership options
    <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-3xl mb-4">Premium Membership</h1>
        <div className="flex flex-col md:flex-row gap-4">
            <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body">
                <h2 className="card-title">Silver Membership</h2>
                <p>Access to exclusive features and content.</p>
                <button className="btn btn-primary"
                    onClick={() => handleBuyMembership('silver')}
                    >Subscribe Now - Silver</button>
            </div>
            </div>
            <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body">
                <h2 className="card-title">Gold Membership</h2>
                <p>All Silver features plus additional perks.</p>
                <button className="btn btn-primary"
                    onClick={() => handleBuyMembership('gold')}
                    >Subscribe Now - Gold</button>
            </div>
            </div>
        </div>
        <p className="mt-4 text-gray-500">Upgrade your experience with our premium memberships!</p>
    </div>
  )
}

export default Premium