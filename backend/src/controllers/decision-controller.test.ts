import {applyRulesToSummariseLoanRequest} from "@src/controllers/decision-controller";
import {balances} from "@src/services/accounting-software.mock";
import {BalanceSheet, LoanRequest} from "@src/types";
import dayjs from "dayjs";

describe('decision controller', function () {
    it('should apply rules to requested loan when loan is bigger then average asserts value', () => {
        const act = applyRulesToSummariseLoanRequest(balances, 1200000)
        expect(act).toEqual<LoanRequest>({
            balanceSheet: balances,
            preAssessment: 60,
        })
    });

    it('should apply rules to request loan when loan is smaller then average assets value', () => {
        const act = applyRulesToSummariseLoanRequest(balances, 120)
        expect(act).toEqual<LoanRequest>({
            balanceSheet: balances,
            preAssessment: 100,
        })
    })

    it('should return 20 when no profit and average assets value is smaller than request value', () => {
        const now = dayjs()
        let balances: BalanceSheet = [1, 2, 3, 4, 5, 6].map(x => {
            const date = now.subtract(x, 'month')
            return {
                profitOrLoss: -100,
                assetsValue: -1,
                month: date.month(),
                year: date.year(),
            }
        })
        const act = applyRulesToSummariseLoanRequest(balances, 1200000)
        expect(act).toEqual<LoanRequest>({
            balanceSheet: balances,
            preAssessment: 20,
        })
    })
});