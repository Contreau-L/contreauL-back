import {NextFunction, Request, Response} from "express";

export function waitingActionsMiddleware(req: Request, res: Response, next: NextFunction) {
    if (!req.params.id)
        res.status(400).json({ error: "Id mac param is missing !" });
    else
        next();
}

export function actionInsertionMiddleware(req: Request, res: Response, next: NextFunction) {
    if (!req.params.id )
        res.status(400).json({ error: "Id mac or garden line param is missing !" });
    else
        next();
}

export function actionsRetrievalMiddleware(req: Request, res: Response, next: NextFunction) {
    if (!req.params.id)
        res.status(400).json({ error: "Id mac param is missing !" });
    else
        next();
}

export function updateActionsStatusMiddleware(req: Request, res: Response, next: NextFunction) {
    if (!req.body.actions)
        res.status(400).json({ error: "Actions body is missing !" });
    else if (!Array.isArray(req.body.actions))
        res.status(400).json({ error: "Actions body is not an array !" });
    else {
        let count: number = 0;
        req.body.actions.forEach((action: any) => {
            if (!action.id)
                res.status(400).json({ error: "Action id is missing !" });
            else if (!action.index)
                res.status(400).json({ error: "Action line index is missing !" });
            else if (!action.occurred_at)
                res.status(400).json({ error: "Action occurred_at is missing !" });
            else if (typeof action.status === "undefined")
                res.status(400).json({ error: "Action status is missing !" });
            else
                count ++;
        });
        if (req.body.actions.length === count)
            next();
    }
}