import React, { useState, useEffect } from "react";
import "./App.css";

const ProductDisplay = () => (
  <div>
    <div className="row m-auto">
      <img className='col-6 ml-3 img_'
        src="https://i.imgur.com/EHyR2nP.png"
        alt="The cover of Stubborn Attachments"
      />
      <div className="description col-4">
        <h3 className='h3_'>Usuario Premiun</h3>
        <h5 className='h5_'>$2.00</h5>
        <form action="/your-server-side-code" method="POST">
          <button className='button_' type="submit">
            Checkout
          </button>
        </form>
      </div>
    </div>

  </div>
);

const Message = ({ message }) => (
  <section className='section_'>
    <p className='p_'>{message}</p>
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
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, []);

  return message ? (
    <Message message={message} />
  ) : (
    <ProductDisplay />
  );
}