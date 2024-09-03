import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import axios from "axios";
import "./CheckoutForm.css";

const CheckoutForm = ({ amount, title, id, token }) => {
  // EDIT OFFER IN BACKEND
  const handleBoughtOffer = async (id) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/offer/modify/${id}`,
        {
          bought: true,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        console.log("Offer edited");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  // Permet de faire une requête à Stripe pour confirmer le paiement
  const stripe = useStripe();
  // Permet de récupérer le contenu des inputs
  const elements = useElements();

  // State qui gère les messages d'erreurs
  const [errorMessage, setErrorMessage] = useState(null);
  // State qui gère le fait que le paiement a été effectué
  const [completed, setCompleted] = useState(false);
  // State qui gère le fait qu'on est en train de payer
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      //On commence à charger
      setIsLoading(true);

      if (elements == null) {
        return;
      }

      // Vérification et validation des infos entrées dans les inputs
      const { error: submitError } = await elements.submit();

      if (submitError) {
        // Affiche l'erreur en question
        setErrorMessage(submitError.message);
        return;
      }

      // Demande au backend de créer l'intention de paiement, il nous renvoie le clientSecret
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/payment`,
        { amount: amount, title: title }
      );

      const clientSecret = response.data.client_secret;

      //Rêquete a Stripe pour valider le paiement
      const stripeResponse = await stripe.confirmPayment({
        // elements contient les infos et la configuration du paiement
        elements,
        clientSecret,
        // Éventuelle redirection
        confirmParams: {
          return_url: "http://localhost:5173/",
        },
        // Bloque la redirections
        redirect: "if_required",
      });

      // Si une erreur a lieu pendant la confirmation
      if (stripeResponse.error) {
        // On la montre au client
        setErrorMessage(stripeResponse.error.message);
      }
      // Si on reçois un status succeeded on fais passer completed à true
      if (stripeResponse.paymentIntent.status === "succeeded") {
        setCompleted(true);
        handleBoughtOffer(id);
      }
      // On a fini de charger
      setIsLoading(false);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return completed ? (
    <p className="payment-accepted">Paiement effectué</p>
  ) : (
    <form className="form-payment" onSubmit={handleSubmit}>
      <PaymentElement />
      <button type="submit" disabled={!stripe || !elements || isLoading}>
        Payer
      </button>
      {/* Éventuel message d'erreur */}
      {errorMessage && <div>{errorMessage}</div>}
    </form>
  );
};

export default CheckoutForm;