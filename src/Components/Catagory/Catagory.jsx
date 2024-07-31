import React from 'react'
import { CatagoryInfo } from "./CatagoryInfo";
import CatagoryCard from './CatagoryCard';
import classes from "./Catagory.module.css"
function Catagory() {
  return (
    <section className={classes.catagory_container}>
      {CatagoryInfo.map((info) => (
        <CatagoryCard data={info} />
      ))}
    </section>
  );
}

export default Catagory