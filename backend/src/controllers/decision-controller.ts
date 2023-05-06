import {Request, Response} from "express";
import {IDecisionEngine} from "@src/types";
import {DecisionEngine} from "@src/services";

class DecisionController {
    constructor(private decisionEngine: IDecisionEngine) {
    }

    submitLoanRequest = (req: Request, res: Response) => {
        const data = this.decisionEngine.getDecision(req)
        res.json({data});
    }
}

export default new DecisionController(DecisionEngine);