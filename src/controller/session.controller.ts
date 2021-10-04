import config from 'config';
import { Request, Response } from 'express';
import { get } from 'lodash';
import { createAccessToken, createSession, findSessions, updateSession } from '../service/session.service';
import { validatePassword } from "../service/user.service";
import { sign } from '../utils/jwt.utils';


export async function createUserSessionHandler(req: Request, res: Response) {
    // validate email and password
    const user = await validatePassword(req.body)

    if (!user) {
        return res.status(401).send("Invalid username or password")
    }

    // create a session
    const session = await createSession(user._id, req.get("user-agent") || "")

    const accessToken = createAccessToken({
        user,
        session
    })

    const refreshToken = sign(session, {
        expiresIn: config.get("refreshTokenTtl")
    })

    res.send({ accessToken, refreshToken })
}

export async function invalidateUserSessionHandler(req: Request, res: Response) {
    const sessionId = get(req, "user.session")

    await updateSession({ _id: sessionId }, { valid: false })

    return res.sendStatus(200)
}

export async function getUserSessionsHandler(req: Request, res: Response) {

    const userId = get(req, "user._id")

    const sessions = await findSessions({user: userId, valid: true})

    return res.send(sessions)
}