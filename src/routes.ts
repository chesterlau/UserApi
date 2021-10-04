import { createUserSchema, createUserSessionSchema } from './schema/user.schema';
import { Express, Request, Response } from "express"
import { createUserHandler, getUserHandler } from "./controller/user.controller"
import validateRequest from "./middleware/validateRequest"
import { createUserSessionHandler, getUserSessionsHandler, invalidateUserSessionHandler } from './controller/session.controller';
import requiresUser from './middleware/requiresUser';
import { createPostHandler, deletePostHandler, getPostHandler, updatePostHandler } from './controller/post.controller';
import { createPostSchema, deletePostSchema, updatePostSchema } from './schema/post.schema';

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

    // create post
    app.post("/api/posts", [requiresUser, validateRequest(createPostSchema)], createPostHandler)

    // update post
    app.put("/api/posts/:postId", [requiresUser, validateRequest(updatePostSchema)], updatePostHandler)

    // get post
    app.get("/api/posts/:postId", getPostHandler)

    //delete post
    app.delete("/api/posts/:postId", [requiresUser, validateRequest(deletePostSchema)], deletePostHandler)
}

