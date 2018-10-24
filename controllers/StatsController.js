const Repository = require('../repositories/stats')

class StatsController {
  static async get(req, res) {
    try {
      const movieIds = req.query.movieId || []
      const statsSummaryDTO = await Repository.getAll(movieIds)

      if (!statsSummaryDTO.length) {
        return res.status(404).end()
      }

      return res.status(200).json(statsSummaryDTO)

    } catch (err) {
      console.error(err)
      return res.status(500).end()
    }
  }
}

module.exports = StatsController