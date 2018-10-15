const Repository = require('../repositories/reviews')

class ReviewsController {
  static async get(req, res) {
    try {
      const movieIds = req.query.movieId || []
      const reviewsSummaryDTO = await Repository.getAll(movieIds)

      if (!reviewsSummaryDTO.length) {
        return res.status(404).end()
      }

      return res.status(200).json(reviewsSummaryDTO)

    } catch (err) {
      return res.status(500).end()
    }
  }
}

module.exports = ReviewsController