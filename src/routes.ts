import { Request, Response, Router } from 'express'
import { UsersController } from './controllers/UsersController'
import { createUsersPayload } from './schemas/UsersSchemas_old'
import { checkSchema } from "express-validator"
import { AuthController } from './controllers/AuthController'
import { ensureAuthenticated } from './middlewares/ensureAuthenticated'
import { UsersAdminController } from './controllers/UsersAdminController'
import { AuthAdminController } from './controllers/AuthAdminController'
import { ensureAdminAuthenticated } from './middlewares/ensureAdminAuthenticated'

const router = Router()

const usersController = new UsersController()
const authController = new AuthController()

const usersAdminController = new UsersAdminController()
const authAdminController = new AuthAdminController()

router.post('/auth', authController.handle)
router.post('/users', checkSchema(createUsersPayload), usersController.create)
router.post('/teste_admin', ensureAdminAuthenticated, (request: Request, response: Response) => {
    return response.json({
        message: 'logou com sucesso !'
    })
})

router.post('/auth_admin', authAdminController.handle)
router.post('/users_admin', usersAdminController.create)
router.put('/users_admin/:id', usersAdminController.update)

router.post('/teste', ensureAuthenticated, (request: Request, response: Response) => {
    return response.json({
        message: 'logou com sucesso !'
    })
})

export {
    router
}