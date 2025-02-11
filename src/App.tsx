import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import {
  getApCode,
  getAppropriatenessCode,
  getDxCode,
  getRecommendation,
} from "./recommender/init";
import {
  BEHAVIOR_RESPONSIVENESS,
  DURATION_NUMBER,
} from "./recommender/constants";

function App() {
  const [count, setCount] = useState(0);

  window.getRecommendation = getRecommendation;
  window.getAppropriatenessCode = getAppropriatenessCode;
  window.getDxCode = getDxCode;
  window.getApCode = getApCode;
  window.userInput = {
    pmhx: `
Major neurocognitive disorder
Hypertension
Dyslipidemia
    `,
    meds: `
Atorvastatin 40 mg qHS
Ramipril 5 mg qAM
Quetiapine 50 mg QHS`,
    behaviors: [
      {
        type: "wandering",
        duration: "3-ongoing",
      },
      {
        type: "spitting",
        duration: "3-ongoing",
      },
      {
        type: "insomnia",
        duration: "3-ongoing",
      },
    ],
  };

  return (
    <div className="main">
      <div className="card">
        <label>PMHX</label>
        <textarea />
      </div>
      <div className="card">
        <label>Meds</label>
        <textarea />
      </div>
      <div className="card">
        <label>Behaviors</label>
        <select>
          {Object.keys(BEHAVIOR_RESPONSIVENESS).map(behavior => (
            <option>{behavior}</option>
          ))}
        </select>
        <select>
          {Object.keys(DURATION_NUMBER).map(behavior => (
            <option>{behavior}</option>
          ))}
        </select>
      </div>
      <button>Get Recommendation</button>
    </div>
  );
}

export default App;
