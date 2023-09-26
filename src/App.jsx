import React, { useState, useEffect } from "react";
import ApodFigure from "./ApodFigure";
import MarsFigure from "./MarsFigure";
import "./App.css";

function App() {
  const today = new Date(Date.now()).toISOString().slice(0, 10);

  const [date, setDate] = useState(today);
  const [apodData, setApodData] = useState(null);
  const [marsData, setMarsData] = useState(null);
  const [select, setSelect] = useState("apod");

  useEffect(() => {
    if (select === "apod") {
      setMarsData(null);
      (async () => {
        try {
          const res = await fetch(
            `${import.meta.env.VITE_NASA_URL}/planetary/apod?api_key=${
              import.meta.env.VITE_API
            }&date=${date}`
          );
          const data = await res.json();
          setApodData(data);
        } catch (error) {
          console.error("Not able to fetch APOD data", error);
        }
      })();
    }

    if (select === "mars") {
      setApodData(null);
      (async () => {
        try {
          const res = await fetch(
            `${
              import.meta.env.VITE_NASA_URL
            }/mars-photos/api/v1/rovers/curiosity/photos?api_key=${
              import.meta.env.VITE_API
            }&earth_date=${date}`
          );
          const data = await res.json();
          setMarsData(data.photos[0]);
        } catch (error) {
          console.error("Not able to fetch APOD data", error);
        }
      })();
    }
  }, [date, select]);

  const handleInput = (ev) => {
    setDate(ev.target.value);
  };

  const handleSelect = (ev) => {
    setSelect(ev.target.value);
  };

  return (
    <>
      <h1>Astronomical Picture of the Day</h1>
      <form className="form-container">
        <div>
          <label htmlFor="dateInput">Select date:</label>
          <input
            name="dateInput"
            className="date-input"
            type="date"
            value={date}
            max={today}
            onChange={handleInput}
          />
        </div>
        <div>
          <label htmlFor="planetSelect">Select API:</label>
          <select
            name="planetSelect"
            className="planet-select"
            onInput={handleSelect}
          >
            <option selected="selected" value="apod">
              APOD
            </option>
            <option value="mars">MARS</option>
          </select>
        </div>
      </form>
      <p>
        The following image corresponds to the date: <strong> {date}</strong>
      </p>
      {apodData && <ApodFigure apodData={apodData} />}
      {marsData && <MarsFigure marsData={marsData} />}
    </>
  );
}

export default App;
