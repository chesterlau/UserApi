import { Express, Request, Response } from "express"

export default (app: Express) => {

    app.get("/health", (req: Request, res: Response) => {
        res.sendStatus(200)
    })

}

