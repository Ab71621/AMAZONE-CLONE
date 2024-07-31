import React, { useContext, useEffect, useState } from "react";
import classes from "./Order.module.css";
import LayOut from "../../LayOut/LayOut";
import { db } from "../../Utility/firebase";
import { DataContext } from "../../DataProvider/DataProvider";
import ProductCard from "./../../Product/ProductCard";

function Order() {
  const [{ user, basket }, dispatch] = useContext(DataContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      db.collection("users")
        .doc(user.uid)
        .collection("orders")
        .orderBy("created", "desc")
        .onSnapshot((snapshot) => {
          console.log(snapshot);
          setOrders(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
        });
    } else {
      setOrders([]);
    }
  }, [user]);

  return (
    <LayOut>
      <section className={classes.container}>
        <div className={classes.orders_container}>
          <h2> Your Orders </h2>

          {/* when there is no order */}
          {orders?.length == 0 && (
            <div style= {{ padding: "16px" }}>
              {" "}
              You Don't Have An Order Yet.{" "}
            </div>
          )}

          {/* //ordered items */}
          <div>
            {orders?.map((eachOrder, i) => {
              return (
                <div key={i}>
                  <hr />
                  <p> Order ID:{eachOrder?.id} </p>
                  {eachOrder?.data?.basket?.map((order) => {
                    return (
                      <ProductCard flex={true} product={order} key={order.id} />
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Order;
