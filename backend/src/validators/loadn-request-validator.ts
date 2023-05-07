import {body, matchedData, validationResult} from "express-validator";
import {Request, Response, NextFunction} from "express";

export default () =>
    [
        body('loanAmount').exists().isNumeric().withMessage('Loan amount must be a number'),
        body('balanceSheet').notEmpty().isArray().withMessage('Balance sheet (balance sheet) must not be empty'),
        body('balanceSheet.*.year').exists().isNumeric().withMessage('Balance must have numeric year'),
        body('balanceSheet.*.month').exists().isNumeric().withMessage('Balance must have numeric month'),
        body('balanceSheet.*.profitOrLoss').exists().isNumeric().withMessage('Balance must have numeric profit or loss'),
        body('balanceSheet.*.assetsValue').exists().isNumeric().withMessage('Balance must have numeric assets value'),
    ];