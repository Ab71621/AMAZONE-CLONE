import React, { useContext,useState } from 'react';
import Rating from "@mui/material/Rating";
import CurrencyFormat from '../CurrencyFormate/CurrenyFormate';
import classes from "./Product.module.css";
import { Link } from 'react-router-dom';
import { DataContext } from '../DataProvider/DataProvider';
import { Type } from '../Utility/action.type';

function ProductCard({ product, flex, renderDes ,renderAdd}) {
  const { title, image, price, rating, id, description }=product;
  const [{basket},dispatch]=useContext(DataContext)
  const addToCart=()=>{
    dispatch({
      type:Type.ADD_TO_BASKET,
      item:{ title, image, price, rating, id, description},
    });
  }

  return (
    <div
      key={id}
      className={`${classes.card_container} ${
        flex ? classes.product_flexed : ""
      }`}
    >
      <Link to={`/products/${id}`}>
        <img src={image} alt={title} />
      </Link>
      <div>
        <h3>{title}</h3>
        {renderDes && <div style={{ maxWidth: "700px" }}>{description}</div>}
        <div className={classes.rating}>
          {/* rating */}
          <Rating value={rating?.rate || 1} precision={0.1} />
          {/* rating counter */}
          <small>{rating?.count || 1}</small>
        </div>
        <div>
          {/* price */}
          <CurrencyFormat amount={price} />
          {renderAdd && (
            <button
              className={`${classes.button} ${
                flex ? `${classes.btn_flexed}` : ""
              }`}
              onClick={addToCart}
            >
              Add to cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
export default ProductCard