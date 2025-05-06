import {
  ANTIPSYCHOTICS_CATEGORY,
  BEHAVIOR_RESPONSIVENESS,
  CODE_RECOMMENDATIONS,
  DIAGNOSES_CATEGORY,
  DURATION_NUMBER,
} from "./constants";

function getCode(input, mapping, fallback) {
  let code = "";
  const sanitizedInput = input.toLowerCase().replace(" ", "_");

  Object.entries(mapping).forEach(([key, value]) => {
    const position = sanitizedInput.indexOf(key);
    if (position >= 0) {
      code = code.concat(value);
    }
  });

  if (code === "") {
    return fallback;
  }

  return code;
}

function getDxCode(userInput) {
  return getCode(userInput.pmhx, DIAGNOSES_CATEGORY, "X");
}

function getApCode(userInput) {
  return getCode(userInput.meds, ANTIPSYCHOTICS_CATEGORY, "W");
}

function getAppropriatenessCode(userInput) {
  const results = userInput.behaviors.map(behavior => {
    const responsiveness = BEHAVIOR_RESPONSIVENESS[behavior.type];
    const durationNumber = DURATION_NUMBER[behavior.duration];

    return 10 * responsiveness + durationNumber + 10;
  });

  return Math.max(...results).toString();
}

/**
 * The getRecommendation function is the entry point into this file. 
 * You can change the internals of the function, but ensure the parameter 
 * and the return object have the same structure as defined here:
 * 
 * @param {{
 *     pmhx: string | undefined;
 *     meds: string | undefined; 
 *     behaviors: {type: string, duration: string}[]
 * }} userInput 
 * Example:
 *    {
 *      pmhx: "Schizophrenia\nDementia\nDiabetes\nOsteoarthritis\nGout",
 *      meds: "Metformin 500 mg BID\nAcetaminophen 650 mg QID\nClozapine 500 mg qHS\nLoxapine 5 mg qHS",
 *      behaviors: [
 *        {
 *          type: "wandering",
 *          duration: "ongoing"
 *        },
 *        {
 *          type: "spitting",
 *          duration: "ongoing"
 *        },
 *        {
 *          type: "insomina",
 *          duration: "ongoing"
 *        },
 *      ]
 *    }
 * 
 * @returns {{ msg: string; danger: number}} recommendation
 * Example:
 *   {
 *     msg: "Likely appropriate. Continue AP.",
 *     danger: 4,
 *   }
 */
export function getRecommendation(userInput) {
  const apCode = getApCode(userInput);
  const dxCode = getDxCode(userInput);
  const appropriatenessCode = getAppropriatenessCode(userInput);

  return (
    CODE_RECOMMENDATIONS[apCode] ??
    CODE_RECOMMENDATIONS[dxCode] ??
    CODE_RECOMMENDATIONS[appropriatenessCode] ??
    { msg: "Encounted error generating a recommendation", danger: 1 }
  );
}
