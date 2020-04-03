const connection = require('../database/connection')

module.exports = {
  async index(request, response) {
    const user_id = request.headers.authorization

    const tasks = await connection('tasks')
      .where('user_id', user_id)
      .select('*')

    return response.json(tasks)
  },
}
