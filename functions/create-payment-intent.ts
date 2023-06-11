require("dotenv").config();

const stripe = require("stripe")(process.env.REACT_APP_AUTH_STRIPE_SECRET_KEY);

exports.handler = async function (event, context) {
  if (event.body) {
    const { cart, shippingFee, totalAmount } = JSON.parse(event.body);

    const calculateAmount = () => {
      return shippingFee + totalAmount;
    };

    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateAmount(),
        currency: "usd",
      });

      return {
        statusCode: 200,
        body: JSON.stringify({ clientSecret: paymentIntent.client_secret }),
      };
    } catch (err) {
      return {
        statusCose: 500,
        body: JSON.stringify({ error: err.message }),
      };
    }
  }

  return {
    statusCode: 200,
    body: "Create Payment Intent",
  };
};
