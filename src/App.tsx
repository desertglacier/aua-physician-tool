import { useState } from "react";
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
import React from "react";

type BehaviorInput = {
  type: string;
  duration: string;
};

const defaultBehaviorInput = {
  type: Object.keys(BEHAVIOR_RESPONSIVENESS)[0],
  duration: Object.keys(DURATION_NUMBER)[0],
};

function App() {
  const pmhxRef = React.useRef<HTMLTextAreaElement>(null);
  const medsRef = React.useRef<HTMLTextAreaElement>(null);
  const [recommendation, setRecommendation] = useState<string>("");

  const [behaviorInputs, setBehaviorInputs] = useState<BehaviorInput[]>([
    defaultBehaviorInput,
  ]);

  const addBehaviorInput = () => {
    setBehaviorInputs((prev) => [...prev, defaultBehaviorInput]);
  };

  const removeBehaviorInput = (index: number) => {
    setBehaviorInputs((prev) => prev.filter((_, i) => i !== index));
  };

  const updateBehaviorInput = ({
    index,
    type,
    duration,
  }: {
    index: number;
    type?: string;
    duration?: string;
  }) => {
    const newInputs = behaviorInputs.map((input, i) => {
      if (i !== index) {
        return input;
      }

      if (type) {
        return { ...input, type };
      }

      if (duration) {
        return { ...input, duration };
      }

      return input;
    });
    setBehaviorInputs(newInputs);
  };

  const onClick = () => {
    const userInput = {
      pmhx: pmhxRef.current?.value,
      meds: medsRef.current?.value,
      behaviors: behaviorInputs,
    };

    setRecommendation(getRecommendation(userInput));
  };

  return (
    <div className="Main">
      <div className="UserInputSection">
        <div className="Card">
          <label>PMHX</label>
          <textarea className="TextAreaInput" ref={pmhxRef} />
        </div>
        <div className="Card">
          <label>Meds</label>
          <textarea className="TextAreaInput" ref={medsRef} />
        </div>
        <div className="Card">
          <label>Behaviors</label>
          <div className="InputList">
            {behaviorInputs.map((input, index) => (
              <div className="InputListItem">
                <select
                  onChange={(e) => {
                    console.log(e);
                    updateBehaviorInput({ index, type: e.target.value });
                  }}
                  value={input.type}
                >
                  {Object.keys(BEHAVIOR_RESPONSIVENESS).map((behavior) => (
                    <option>{behavior}</option>
                  ))}
                </select>
                <select
                  onChange={(e) => {
                    console.log(e);
                    updateBehaviorInput({ index, duration: e.target.value });
                  }}
                  value={input.duration}
                >
                  {Object.keys(DURATION_NUMBER).map((behavior) => (
                    <option>{behavior}</option>
                  ))}
                </select>
                <button
                  className="SecondaryCta"
                  onClick={() => removeBehaviorInput(index)}
                >
                  -
                </button>
              </div>
            ))}
            <button className="SecondaryCta" onClick={addBehaviorInput}>
              +
            </button>
          </div>
        </div>
      </div>
      <button className="PrimaryCta" onClick={onClick}>
        Get Recommendation
      </button>
      {recommendation && <div className="Result">{recommendation}</div>}
    </div>
  );
}

export default App;

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
