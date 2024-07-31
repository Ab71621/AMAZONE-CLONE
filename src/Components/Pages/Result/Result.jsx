import React, { useEffect, useState } from 'react';
import classes from "./Result.module.css";
import LayOut from '../../LayOut/LayOut';
import { useParams } from "react-router-dom";
import axios from "axios";
import { productUrl } from '../../../API/endPoints';
import ProductCard from '../../Product/ProductCard';
import Loader from '../../Loader/Loader';

function Result() {
   const {catagoryName} = useParams();
   const [isLoading, setisLoading] = useState(false)
   const [result, setResult] = useState([])

   useEffect(() => {
    setisLoading(true);
    axios.get(`${productUrl}/products/category/${catagoryName}`)
       .then((res) => {
         setResult(res.data)
         setisLoading(false);
       }).catch((error)=>{
        console.log(error)
        setisLoading(false);
      })
   },[]);
   
  return (
    <LayOut>
      <section>
        <h1 style={{ padding: "30px" }}>Results</h1>
        <p style={{ padding: "30px" }}>Catagory/{catagoryName}</p>
        <hr />
        {isLoading ? (
          <Loader />
        ) : (
          <div className={classes.products_container}>
            {result.map((product) => (
              <ProductCard key={product.id} product={product} renderAdd={true}
              renderDes={false}/>
            ))}
          </div>
        )}
      </section>
    </LayOut>
  );
}

export default Result