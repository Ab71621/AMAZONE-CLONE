import React, { useEffect, useState } from 'react'
import classes from "../../Product/Product.module.css"
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { productUrl } from '../../../API/endPoints';
import LayOut from '../../LayOut/LayOut';
import ProductCard from '../../Product/ProductCard';
import Loader from '../../Loader/Loader';

function ProductDetail() {
const [product,setProduct] = useState({})
const {productID} = useParams();
const [isLoading, setisLoading] = useState(false)

useEffect(() => {
  setisLoading(true);
  axios
    .get(`${productUrl}/products/${productID}`)
    .then((res) => {
      setProduct(res.data);
      setisLoading(false)
    })
    .catch((error) => {
      console.log(error);
      setisLoading(false);
    });
},[productID]);
  return (
    <LayOut>
      {isLoading ? (<Loader />) : (
        <div className={classes.products_container_large}>
          <ProductCard product={product} flex={true} renderDes={true} renderAdd={true}/>
        </div>
      )}
    </LayOut>
  );
}

export default ProductDetail