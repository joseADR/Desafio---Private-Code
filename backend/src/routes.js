const express = require('express')
const { celebrate, Segments, Joi } = require('celebrate')

const UserController = require('./controllers/UserController')
const TaskController = require('./controllers/TaskController')
const ProfileController = require('./controllers/ProfileController')
const SessionController = require('./controllers/SessionController')

const routes = express.Router()

routes.post('/sessions', SessionController.create)

routes.get('/users', UserController.index)
routes.post(
  '/users',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      userName: Joi.string().required(),
    }),
  }),
 UserController.create
)

routes.get(
  '/profile',
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
  }),
  ProfileController.index
)

routes.get(
  '/tasks',
  celebrate({
    [Segments.QUERY]: Joi.object().keys({
      page: Joi.number(),
    }),
  }),
  TaskController.index
)

routes.post('/tasks', TaskController.create)

routes.delete(
  '/tasks/:id',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().required(),
    }),
  }),
  TaskController.delete
)

module.exports = routes
