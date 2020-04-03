const generateUniqueId = require('../utils/generateUniqueId')
const connection = require('../database/connection')

module.exports = {
  async index(request, response) {
    const users = await connection('users').select('*')

    return response.json(users)
  },

  async create(request, response) {
    const { userName } = request.body
    
    const user_id = generateUniqueId()

    await connection('users').insert({
      user_id,
      userName
    })

    return response.json({ userName })
  },
}
