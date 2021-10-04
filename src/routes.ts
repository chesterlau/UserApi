import { createUserSchema, createUserSessionSchema } from './schema/user.schema';
import { Express, Request, Response } from "express"
import { createUserHandler, getUserHandler } from "./controller/user.controller"
import validateRequest from "./middleware/validateRequest"
import { createUserSessionHandler, getUserSessionsHandler, invalidateUserSessionHandler } from './controller/session.controller';
import requiresUser from './middleware/requiresUser';

export default (app: Express) => {

    app.get("/health", (req: Request, res: Response) => {
        res.sendStatus(200)
    })

    //Register user
    app.post("/api/users", validateRequest(createUserSchema), createUserHandler)

    
    app.get("/api/users/:userId", getUserHandler)

    //Login
    app.post("/api/sessions", validateRequest(createUserSessionSchema), createUserSessionHandler)

    //Get the user's sessions
    app.get("/api/sessions", requiresUser, getUserSessionsHandler)

    //Logout
    app.delete("/api/sessions", requiresUser, invalidateUserSessionHandler)

}

