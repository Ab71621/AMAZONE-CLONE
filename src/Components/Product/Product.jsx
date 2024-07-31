import React, { useEffect, useState } from 'react'
import axios from "axios"
import ProductCard from './ProductCard';
import classes from "./Product.module.css"
import Loader from '../Loader/Loader';
function Product() {
  const [products, setProducts] = useState([]);
  const [isloading, setisloading] = useState(false)

  useEffect(() => {
    setisloading(true)
   axios.get("https://fakestoreapi.com/products").then((res) => {
     setProducts(res.data)
     setisloading(false);
   }).catch((error)=>{
    console.log(error)
    setisloading(false);
   })
  }, [])
  
  return (
    <>
      {isloading ? (
        <Loader />
      ) : (
        <section className={classes.products_container}>
          {products.map((singleProduct) => (
            <ProductCard product={singleProduct} key={singleProduct.id} renderAdd={true}/>
          ))}
        </section>
      )}
    </>
  );
}

export default Product