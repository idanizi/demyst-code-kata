import {applyRulesToSummariseLoanRequest} from "@src/controllers/decision-controller";
import {balances} from "@src/services/accounting-software.mock";
import {LoanRequest} from "@src/types";

describe('decision controller', function () {
    it('should apply rules to requested loan', function () {
        const act = applyRulesToSummariseLoanRequest(balances, 1200)
        expect(act).toBe<LoanRequest>({
            balanceSheet: balances,
            preAssessment: 60,
        })
    });
});