import React from "react";
import "./Figure.css";

const ApodFigure = ({ apodData }) => {
  console.log(apodData.url);
  return (
    <div className="figure">
      <h2>{apodData.title}</h2>
      <img
        className="image"
        src={apodData.url}
        alt=""
        style={{ width: "700px" }}
      />
      <div className="image-info">
        <p>© {apodData.copyright}</p>
        <p>Date: {apodData.date}</p>
      </div>
      <div className="explanation">
        <p>{apodData.explanation}</p>
      </div>
    </div>
  );
};

export default ApodFigure;
