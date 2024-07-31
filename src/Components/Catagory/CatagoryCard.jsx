import React from 'react';
import classes from "./Catagory.module.css";
import { Link } from "react-router-dom";

function CatagoryCard({data}) {
  console.log(data)
  // function truncate(str, num) {
  //   // return str?.length > num ? str.slice(0, num) + "..." : str;
  // }

  return (
    <div className={classes.catagory}>
      <Link to={`/catagory/${data.name}`}>
        <span>
          <h2>{data.title}</h2>
        </span>
        <img src={data.imgLink} alt="" />
        <p>{data.subTitle}</p>
      </Link>
    </div>
  );
}

export default CatagoryCard



