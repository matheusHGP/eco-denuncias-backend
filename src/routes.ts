import { Request, Response, Router } from 'express'
import { UsersController } from './controllers/UsersController'
import { createUsersPayload } from './schemas/UsersSchemas_old'
import { checkSchema } from "express-validator"
import { AuthController } from './controllers/AuthController'
import { ensureAuthenticated } from './middlewares/ensureAuthenticated'

const router = Router()

const usersController = new UsersController()
const authController = new AuthController()

router.post('/auth', authController.handle)
router.post('/users', checkSchema(createUsersPayload), usersController.create)
router.post('/teste', ensureAuthenticated, (request: Request, response: Response) => {
    return response.json({
        message: 'logou com sucesso !'
    })
})

export {
    router
}