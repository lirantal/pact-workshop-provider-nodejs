const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('./reviews.json')
const db = low(adapter)

class Repository {
  static insert(item) {
    return db.get('reviews')
    .push(item)
    .write() 
  }

  static async getAll(movieIds) { 
    const reviews = db.get('reviews').value()
    
    let reviewsFiltered
    if (movieIds && Array.isArray(movieIds) && movieIds.length > 0) {
      reviewsFiltered = reviews.filter(function filterMovieIds(item) {
        return movieIds.indexOf(item.id) !== -1
      })

      return reviewsFiltered
    } else {
      return reviews
    }
  }

  static async deleteAll() {
    return db.get('reviews')
    .remove()
    .write()
  }

  static async initModel() {
    return db.defaults({ reviews: [] })
    .write()
  }
}

module.exports = Repository