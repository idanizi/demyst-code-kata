export interface IAccountingSoftware {
    getBalanceSheet: () => BalanceSheet
}

export interface IDecisionEngine {
    getDecision: (req: LoanRequest) => boolean
}

export type Balance = {
    year: number
    month: number
    profitOrLoss: number
    assetsValue: number
}

export type BalanceSheet = Balance[]

export type LoanRequest = {

}