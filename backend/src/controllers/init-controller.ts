import {Request, Response} from "express";

export class InitController {
    initApplication = (req: Request, res: Response) => {
        res.json({msg: "init complete"})
    }
}

export default new InitController()