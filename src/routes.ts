import { createUserSchema } from './schema/user.schema';
import { Express, Request, Response } from "express"
import { createUserHandler, getUserHandler } from "./controller/user.controller"
import validateRequest from "./middleware/validateRequest"


export default (app: Express) => {

    app.get("/health", (req: Request, res: Response) => {
        res.sendStatus(200)
    })

    app.post("/api/users", validateRequest(createUserSchema), createUserHandler)

    app.get("/api/users/:userId", getUserHandler)

    //Register user
    //POST /api/users

    //Login
    //POST /api/sessions

    //Get the user's session
    //GET /api/sessions

    //Logout
    //DELETE /api/sessions

}

