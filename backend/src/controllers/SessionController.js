const connection = require('../database/connection')

module.exports = {
  async create(request, response) {
    const { user_id } = request.body

    const user = await connection('users').where('user_id', user_id).select('userName').first()

    if (!user) {
      return response.status(400).json({ error: 'No user found with this ID' })
    }

    return response.json(user)
  },
}
