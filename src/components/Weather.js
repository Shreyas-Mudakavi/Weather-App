import WeatherForm from "./WeatherForm";

import styles from "./Weather.module.css";

const Weather = () => {
  return (
    <div>
      <nav className={styles.nav}>Weather App</nav>

      <WeatherForm />
    </div>
  );
};

export default Weather;
