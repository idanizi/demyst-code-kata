import {matchedData, validationResult} from "express-validator";

export {default as createLoanRequestValidator} from "./loadn-request-validator";

const bodyValidatorMiddleware = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({msg: 'Bad request. Fix the following errors', errors: errors.array()})
        return
    }
    req.body = matchedData(req, {locations: ['body']});
    next();
}