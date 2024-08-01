import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const CheckoutForm: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Verifica si stripe y elements están disponibles
    if (!stripe || !elements) {
      setError('Stripe no está cargado correctamente. Intenta de nuevo más tarde.');
      return;
    }

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      setError('No se pudo obtener el elemento de la tarjeta.');
      return;
    }

    // Crea el método de pago
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      setError(error.message || 'Error al procesar el pago');
    } else {
      // Envía el paymentMethod.id al backend para crear un pago
      try {
        const response = await fetch('/api/create-payment-intent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ paymentMethodId: paymentMethod.id }),
        });

        const paymentIntent = await response.json();

        if (paymentIntent.error) {
          setError(paymentIntent.error);
        } else {
          setSuccess(true);
        }
      } catch (err) {
        setError('Error en la comunicación con el servidor.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>Pagar</button>
      {error && <div>{error}</div>}
      {success && <div>Pago realizado con éxito</div>}
    </form>
  );
};

export default CheckoutForm;
