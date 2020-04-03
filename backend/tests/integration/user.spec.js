/* eslint-disable no-undef */
const request = require('supertest')
const app = require('../../src/app')
const connection = require('../../src/database/connection')

describe('user', () => {
  beforeEach(async () => {
    await connection.migrate.rollback()
    await connection.migrate.latest()
  })

  afterAll(async () => {
    await connection.destroy()
  })

  it('should be able to create a new user', async () => {
    const response = await request(app).post('/users').send({
      userName: 'User2',
    })

    expect(response.body).toHaveProperty('userName')
  })
})
