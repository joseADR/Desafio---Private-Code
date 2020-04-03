const connection = require('../database/connection')

module.exports = {
  async index(request, response) {
    const { page = 1 } = request.query

    const [count] = await connection('tasks').count()

    console.log(count)

    const tasks = await connection('tasks')
      .join('users', 'users.user_id', '=', 'tasks.user_id')
      .limit(5)
      .offset((page - 1) * 5)
      .select([
        'tasks.*',
        'users.user_id',
      ])

    response.header('X-Total-Count', count['count(*)'])

    return response.json(tasks)
  },

  async create(request, response) {
    const { title, description } = request.body
    const user_id = request.headers.authorization

    const [userName] = await connection('tasks').insert({
      title,
      description,
      user_id,
    })

    return response.json({ userName })
  },

  async put(request, response) {
    const { title, description } = request.body
    const user_id = request.headers.authorization

    const [userName] = await connection('tasks').insert({
      title,
      description,
      user_id,
    })

    return response.json({ userName })
  },

  async delete(request, response) {
    const user_id = request.headers.authorization

    const task = await connection('tasks')
      .where('user_id', user_id)
      .select('user_id')
      .first()

    if (task.user_id !== user_id) {
      return response.status(401).json({ error: 'Operation not permitted.' })
    }

    await connection('tasks')
      .where('user_id', user_id)
      .delete()

    return response.status(204).send()
  },
}
