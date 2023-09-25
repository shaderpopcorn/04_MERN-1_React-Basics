import React, { useState, useEffect, useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import "./App.css";

function App() {
  const [data, setData] = useState({});
  const [date, setDate] = useState(new Date());

  const fetchData = useCallback(async () => {
    const res = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${
        import.meta.env.VITE_API
      }&date=2014-10-01`
    );
    const data = await res.json();
    setData(data);
  });

  useEffect(() => {
    console.log(data);
    console.log(date);
    /* const newDate = format(date, "dd/MM/YYYY");
    console.log(newDate); */
  }, [fetchData]);

  const onSubmit = (data) => alert(JSON.stringify(data));

  return (
    <>
      <h1>Hello World</h1>
      <form action="">
        <DatePicker
          type="date"
          dateFormat="yyyy/MM/dd"
          selected={date}
          onChange={(date) => setDate(date.format("y-MM-dd"))}
        />
      </form>
      <br />
      <button onClick={fetchData}>Fetch</button>
    </>
  );
}

export default App;
