import { Navigate, useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";
import "./Payment.css";

const stripePromise = loadStripe(import.meta.env.VITE_PK_STRIPE);

const Payment = ({ token }) => {
  const location = useLocation();
  const { title, price, id } = location.state;
  const options = {
    // Type de transaction
    mode: "payment",
    // Montant de la transaction
    amount: Number((price * 100).toFixed(0)),
    // Devise de la transaction
    currency: "eur",
    // On peut customiser l'apparence ici
    appearance: {
      /*...*/
    },
  };

  return (
    <>
      {token ? (
        <div className="payment-container">
          <Elements stripe={stripePromise} options={options}>
            <CheckoutForm
              amount={options.amount}
              title={title}
              id={id}
              token={token}
            />
          </Elements>
        </div>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};

export default Payment;
