import {IDecisionEngine, LoanRequest} from "@src/types";

class DecisionEngineMock implements IDecisionEngine {
    getDecision = (req: LoanRequest): boolean => {
        let decision = true;
        console.log("[DecisionEngineMock] got loan request:", req);
        console.log("[DecisionEngineMock] returning decision:", decision);
        return decision;
    }
}

export default new DecisionEngineMock();