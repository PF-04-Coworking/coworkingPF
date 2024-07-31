"use client"; // Añade esto en la primera línea

import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
    "pk_test_51PiJBMRr3u9f1QX1f9tySfmCWJ6vOEBbhFcp5fLQc2txm22XvNjecmKm9FYepn3YzF0akJuczr8nMe17VmVYeWbw005F6mm9fL",
);

const ProductDisplay = () => {
    const handleClick = async () => {
        // Obtén la instancia de Stripe
        const stripe = await stripePromise;

        // Solicita al backend la sesión de checkout
        const response = await fetch("http://localhost:3000/payments/create-checkout-session", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const sessionId = await response.json();

        // Redirige a Stripe Checkout
        const { error } = await stripe.redirectToCheckout({ sessionId: sessionId.id });

        if (error) {
            console.error("Error:", error);
        }
    };

    return (
        <section>
            <div className="product">
                <img src="https://i.imgur.com/EHyR2nP.png" alt="The cover of Stubborn Attachments" />
                <div className="description">
                    <h3>Stubborn Attachments</h3>
                    <h5>$20.00</h5>
                </div>
            </div>
            <button onClick={handleClick}>Checkout</button>
        </section>
    );
};

const Message = ({ message }) => (
    <section>
        <p>{message}</p>
    </section>
);

export default function App() {
    const [message, setMessage] = useState("");

    useEffect(() => {
        // Check to see if this is a redirect back from Checkout
        const query = new URLSearchParams(window.location.search);

        if (query.get("success")) {
            setMessage("Order placed! You will receive an email confirmation.");
        }

        if (query.get("canceled")) {
            setMessage("Order canceled -- continue to shop around and checkout when you're ready.");
        }
    }, []);

    return message ? <Message message={message} /> : <ProductDisplay />;
}
