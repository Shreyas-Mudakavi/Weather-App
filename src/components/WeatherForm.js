import React, { useState } from "react"; //npm i --save-dev @types/react
import { useNavigate } from "react-router-dom";
import Card from "../UI/Card";

import styles from "./WeatherForm.module.css";

const WeatherForm = () => {
  const [city, setCity] = useState("");
  const [temp, setTemp] = useState("");
  const [tempFeelsLike, setTempFeelsLike] = useState("");
  const [description, setDescription] = useState("");
  const [httpError, setHttpError] = useState();

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (event) => {
    setCity(event.target.value);
  };

  const formSubmissionHandler = (event) => {
    event.preventDefault();
  };

  const navigationBtn = () => {
    navigate("/", { replace: true });
  };

  const submitHandler = async () => {
    if (city.trim().length === 0 || city === "") {
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=8090dc5b6885bf2f88b29b6bd0f4fbfc&units=metric`
      );

      const data = await response.json();

      if (response.status === 404 || !response.ok) {
        throw new Error("Something went wrong! Please try again");
      }

      console.log(data);
      setTemp(data.list[0].main.temp);

      setTempFeelsLike(data.list[0].main.feels_like);

      setDescription(data.list[0].weather[0].description);

      setIsLoading(false);
    } catch (error) {
      // console.log(error);
      setIsLoading(false);
      setHttpError(error.message);
    }
  };

  if (httpError) {
    return (
      <div>
        <h4>{httpError}</h4>
        <button className={styles.naviBtn} onClick={navigationBtn}>
          Go back
        </button>
      </div>
    );
  }

  return (
    <React.Fragment>
      <form onSubmit={formSubmissionHandler} className={styles.form}>
        <label htmlFor="text">Enter City</label>
        <input
          type="text"
          id="text"
          name="city"
          placeholder="eg: Ahmedabad"
          onChange={handleChange}
          value={city}
          autoComplete="off"
          required
        />
        <button className={styles.btn} onClick={submitHandler}>
          Show Weather
        </button>
      </form>
      {temp && tempFeelsLike && description && (
        <Card>
          <h3>The temperature is {temp} degree Celsius.</h3>
          <p>Feels like {tempFeelsLike} degree Celsius.</p>
          <p>Currently the weather is {description}</p>
        </Card>
      )}

      {isLoading && <h4>Loading...</h4>}
    </React.Fragment>
  );
};

export default WeatherForm;
