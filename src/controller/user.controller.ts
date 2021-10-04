import { Request, Response } from 'express';
import { get, omit } from 'lodash';
import log from '../logger';
import { createUser, findUser } from "../service/user.service";

export async function createUserHandler(req: Request, res: Response) {

    try {
        const user = await createUser(req.body)
        return res.send(omit(user.toJSON(), "password"))
    }
    catch (e) {
        log.error(e)
        return res.status(409).send(e.message)
    }

}

export async function getUserHandler(req: Request, res: Response) {

    const userId = get(req, "params.userId")
    const user = await findUser({ _id: userId })

    if (!user) {
        return res.sendStatus(404)
    }

    return res.send(omit(user.toJSON(), "password"))

}