import { Request, Response, Router } from 'express'
import { UsersController } from './controllers/UsersController'
import { createUsersPayload } from './schemas/UsersSchemas_old'
import { checkSchema } from "express-validator"
import { AuthController } from './controllers/AuthController'
import { ensureAuthenticated } from './middlewares/ensureAuthenticated'
import { UsersAdminController } from './controllers/UsersAdminController'
import { AuthAdminController } from './controllers/AuthAdminController'
import { ensureAdminAuthenticated } from './middlewares/ensureAdminAuthenticated'
import { OccurrencesController } from './controllers/OccurrencesController'
import { OccurrencesAdminController } from './controllers/OccurrencesAdminController'

const router = Router()

const usersController = new UsersController()
const authController = new AuthController()
const occurrencesController = new OccurrencesController()
const occurrencesAdminController = new OccurrencesAdminController()

const usersAdminController = new UsersAdminController()
const authAdminController = new AuthAdminController()

router.post('/auth', authController.handle)
router.post('/users', checkSchema(createUsersPayload), usersController.create)
router.post('/occurrences', ensureAuthenticated, occurrencesController.create)
router.get('/occurrences', ensureAuthenticated, occurrencesController.getAll)
router.get('/occurrences/:id', ensureAuthenticated, occurrencesController.getOnly)

router.post('/auth_admin', authAdminController.handle)
router.post('/users_admin', usersAdminController.create)
router.put('/users_admin/:id', ensureAdminAuthenticated, usersAdminController.update)
router.put('/occurrences/:id', ensureAdminAuthenticated, occurrencesAdminController.update)
router.get('/occurrences_admin', ensureAdminAuthenticated, occurrencesAdminController.getAll)
router.get('/occurrences_admin/:id', ensureAdminAuthenticated, occurrencesAdminController.getOnly)

export {
    router
}