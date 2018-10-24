const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

function getDbHandler() {
  const adapter = new FileSync('./db.json')
  const db = low(adapter)

  return db
}

class Repository {
  static insert(item) {
    return getDbHandler().get('stats')
    .push(item)
    .write() 
  }

  static async getAll(movieIds) {
    const stats = getDbHandler().get('stats').value()
    
    let statsFiltered
    if (movieIds && Array.isArray(movieIds) && movieIds.length > 0) {
      statsFiltered = stats.filter(function filterMovieIds(item) {
        return movieIds.indexOf(item.id) !== -1
      })

      return statsFiltered
    } else {
      return stats
    }
  }

  static async deleteAll() {
    return getDbHandler().set('stats', [])
    .write()
  }
}

module.exports = Repository