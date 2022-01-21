import { Route, Routes, Navigate } from "react-router-dom";
import Weather from "./components/Weather";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="/weather" />} />
        {/* <Route path="/weather" element={<Weather />} /> */}
        <Route path="/weather" element={<Weather />} />
      </Routes>
    </div>
  );
};

export default App;
