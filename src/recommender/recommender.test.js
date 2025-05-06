import { expect, test } from 'vitest';
import { getRecommendation } from './recommender';
import { CODE_RECOMMENDATIONS } from './constants';

test('Likely appropriate. Continue AP.', () => {
    const userInput = {
        pmhx: "Schizophrenia\nDementia\nDiabetes\nOsteoarthritis\nGout",
        meds: "Metformin 500 mg BID\nAcetaminophen 650 mg QID\nClozapine 500 mg qHS\nLoxapine 5 mg qHS",
        behaviors: [
            {
                type: "wandering",
                duration: "ongoing"
            },
            {
                type: "spitting",
                duration: "ongoing"
            },
            {
                type: "insomnia",
                duration: "ongoing"
            },
        ]
    }

    const result = getRecommendation(userInput)
    expect(result).toEqual(CODE_RECOMMENDATIONS.PN)
});

test('Likely inappropriate. Trial taper of AP.', () => {
    const userInput = {
        pmhx: "Major neurocognitive disorder\nHypertension\nDyslipidemia",
        meds: "Atorvastatin 40 mg qHS\nRamipril 5 mg qAM\nQuetiapine 50 mg QHS",
        behaviors: [
            {
                type: "wandering",
                duration: "ongoing"
            },
            {
                type: "spitting",
                duration: "ongoing"
            },
            {
                type: "insomnia",
                duration: "ongoing"
            },
        ]
    }

    const result = getRecommendation(userInput)
    expect(result).toEqual(CODE_RECOMMENDATIONS[11])
});