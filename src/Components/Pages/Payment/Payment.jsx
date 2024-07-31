import React, { useContext, useState } from "react";
import classes from "./Payment.module.css";
import LayOut from "../../LayOut/LayOut";
import { DataContext } from "../../DataProvider/DataProvider";
import ProductCard from "./../../Product/ProductCard";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormat from "../../CurrencyFormate/CurrenyFormate";
import { axiosInstance } from "../../../API/axios";
import { ClipLoader } from "react-spinners";
import { db } from "../../Utility/firebase";
import { useNavigate } from "react-router-dom";
import {Type} from "../../Utility/action.type";

function Payment() {
  const [{ user, basket }, dispatch] = useContext(DataContext);

  const selectedItemTotal = basket.reduce((amount, item) => {
    return amount + item.amount;
  }, 0);

  const total = basket.reduce((amount, item) => {
    return amount + item.price * item.amount;
  }, 0);

  const [cardError, setCardError] = useState(null);

  const [processing, setProcessing] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  const navigate = useNavigate();

  const handleChange = (e) => {
    e?.error?.message ? setCardError(e?.error?.message) : setCardError("");
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    try {
      setProcessing(true);
      //1 Backend function-->contact to the client secret
      const response = await axiosInstance({
        method: "POST",
        url: `/payment/create?total=${total * 100}`,
      });
      // console.log(response.data);

      const clientSecret = response.data?.clientSecret;

      //2 Client Side (react side confirmation)

      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      // console.log(confirmation);

      //3 After Confirmation--> order fire store data base save, clear basket
      await db
        .collection("users")
        .doc(user.uid)
        .collection("orders")
        .doc(paymentIntent.id)
        .set({
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        });
      //Empty the basket
      dispatch({ type: Type.EMPTY_BASKET });

      setProcessing(false);
      navigate("/order", { state: { msg: "You Have Placed New Order" } });
    } catch (error) {
      // console.log(error);
      setProcessing(false);
    }
  };

  return (
    <LayOut>
      {/* /Header */}
      <div className={classes.payment_header}>
        checkout ({selectedItemTotal}) items
      </div>
      {/* /Payment */}
      <section className={classes.Payment}>
        {/* /address */}
        <div className={classes.flex}>
          <h3> Delivery Address </h3>
          <div>
            <div>{user?.email}</div>
            <div>1234 React Lane </div>
            <div>Chicago</div>
          </div>
        </div>
        <hr />
        {/* /product */}
        <div className={classes.flex}>
          <h3>Review Item & Delivery </h3>
          <div>
            {basket?.map((item) => (
              <ProductCard product={item} flex={true} />
            ))}
          </div>
        </div>
        <hr />
        {/* /Card Form */}
        <div className={classes.flex}>
          <h3>Payment Methods</h3>
          <div className={classes.payment_card_container}>
            <div className={classes.payment_Details}>
              <form onSubmit={handlePayment}>
                {/* error */}
                {cardError && (
                  <small style={{ color: "red" }}> {cardError} </small>
                )}
                {/* cardElement */}
                <CardElement onChange={handleChange} />

                {/* price */}
                <div className={classes.payment__price}>
                  <div>
                    <span style={{ display: "flex", gap: "10px" }}>
                      <p>Total Order |</p>
                      <CurrencyFormat amount={total} />
                    </span>
                    s
                  </div>
                  <button type="submit">
                    {processing ? (
                      <div className={classes.loading}>
                        <ClipLoader color="gray" size={12} />
                        <p>Please wait...</p>
                      </div>
                    ) : (
                      "Pay Now"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Payment;
