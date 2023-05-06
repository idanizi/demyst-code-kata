import {Router} from "express";
import InitController from "@src/controllers/init-controller";
import {BalanceController, DecisionController} from "@src/controllers";

const router = Router();

router.get('/', (req, res) => {
    res.json({msg: 'ok'});
});

router.get('/health', (req, res) => {
    res.sendStatus(200)
});

router.get('/init', InitController.initApplication);
router.get('/balance', BalanceController.getBalanceSheet);
router.post('/loan_request', DecisionController.submitLoanRequest);


export default router;
