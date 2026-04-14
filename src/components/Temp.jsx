import React, { useState } from "react";

const Temp = () => {
  const [city, setCity] = useState("");
  const [result, setResult] = useState("");

  const changeHandler = (e) => {
    setCity(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=6e585c28010b06d95bafcfe154c445f7`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        if (data.main) {
          const kelvin = data.main.temp;
          const celsius = kelvin - 273.15;

          setResult(`Temperature at ${city} is ${Math.round(celsius)} °C`);
          setCity(" ");
        } else {
          setResult("City not found");
        }
      })
      .catch(() => {
        setResult("Error fetching data");
      });
  };

  return (
    <div style={{ textAlign: "center", marginTop: "5px", border: "1px solid #160606", padding:
      '40px',borderRadius:"3px",maxWidth: "50%",margin: "0 auto",background: "linear-gradient(to right, green, lightgreen, lightblue)",boxShadow: "0px 4px 10px rgba(0,0,0,0.3)"
}}>
      <h2>Weather App</h2>

      <form onSubmit={submitHandler}>
        <input
          type="text"
          value={city}
          onChange={changeHandler}
          placeholder="Enter City"
          style={{padding:"5px"}}
        /><br></br>
        <br></br>
        <button type="submit" style={{padding:"5px",color:"white",background:"black"}}>Get Temperature</button>
      </form>

      <h3>{result}</h3>
    </div>
  );
};

export default Temp;