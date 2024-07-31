import React from 'react'
import { CircleLoader } from "react-spinners";
function Loader() {
  return (
    <div style={{
      display:"flex",
      alignItems:"center",
      justifyContent:"Center",
      height:"25Vh",
    }}>
      <CircleLoader color="red"/>
    </div>
  );
}

export default Loader