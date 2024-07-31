import React from "react";
import Carousel from "../../Carousel/Carousel";
import Catagory from "../../Catagory/Catagory";
import Product from "../../Product/Product";
import LayOut from "../../LayOut/LayOut";

function Landing() {
  return (
    <LayOut>
      <Carousel />
      <Catagory />
      <Product />
    </LayOut>
  );
}

export default Landing;
