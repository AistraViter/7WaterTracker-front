import styles from "./App.module.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage.jsx";

export default function App() {
  return (
    <div className={styles.app}>
      <Router>
        <Routes>
          <Route path="/home" element={<HomePage />} />
        </Routes>
      </Router>
    </div>
  );
}
