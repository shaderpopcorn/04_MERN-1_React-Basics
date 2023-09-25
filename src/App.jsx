import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const today = new Date(Date.now()).toISOString().slice(0, 10);

  const [date, setDate] = useState(today);
  const [apodData, setApodData] = useState(null);
  const [marsData, setMarsData] = useState(null);

  useEffect(() => {
    const apodFetch = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_NASA_URL}/planetary/apod?api_key=${
            import.meta.env.VITE_API
          }&date=${date}`
        );
        const data = await res.json();
        setApodData(data);
        console.log(data);
      } catch (error) {
        console.error("Not able to fetch APOD data", error);
      }
    };
    apodFetch();

    const marsFetch = async () => {
      try {
        const res = await fetch(
          `${
            import.meta.env.VITE_NASA_URL
          }/mars-photos/api/v1/rovers/curiosity/photos?api_key=${
            import.meta.env.VITE_API
          }&earth_date=${date}`
        );
        const data = await res.json();
        setMarsData(data);
        console.log(data.photos[0]);
      } catch (error) {
        console.error("Not able to fetch APOD data", error);
      }
    };
    marsFetch();
  }, [date]);

  const handleInput = (ev) => {
    setDate(ev.target.value);
  };

  return (
    <>
      <h1>Hello World</h1>
      <form action="">
        <input type="date" value={date} onChange={handleInput} />
        <br />
        <select name="planet-select" id="planet-select">
          <option value="apod">APOD</option>
          <option value="mars">MARS</option>
        </select>
      </form>
    </>
  );
}

export default App;
