import React from "react";
import "./Figure.css";

const MarsFigure = ({ marsData }) => {
  console.log();
  return (
    <div className="figure">
      <h2>{marsData.rover.name}</h2>
      <img
        className="image"
        src={marsData.img_src}
        alt=""
        style={{ width: "700px" }}
      />
      <div className="image-info">
        <p>© {marsData.full_name}</p>
        <p>Date: {marsData.earth_date}</p>
      </div>
      <div className="explanation">{/* <p>{marsData.explanation}</p> */}</div>
    </div>
  );
};

export default MarsFigure;
