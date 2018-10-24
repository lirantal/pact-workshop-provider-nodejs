const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const ReviewsRepository = require('../repositories/reviews')
const StatsRepository = require('../repositories/stats')
const DataSet = require('../data/seed.json')

const adapter = new FileSync('./db.json')
const db = low(adapter)

function populateReviews() {
  const documentInserts = []

  console.log('+ Seeding DB data with reviews')
  DataSet['reviews'].forEach(item => {
    console.log(`  - ${item.id}`)
    documentInserts.push(ReviewsRepository.insert(item))
  })

  return Promise.all(documentInserts)
}

function populateStats() {
  const documentInserts = []

  console.log('+ Seeding DB data with stats')
  DataSet['stats'].forEach(item => {
    console.log(`  - ${item.id}`)
    documentInserts.push(StatsRepository.insert(item))
  })

  return Promise.all(documentInserts)
}

function deleteAllReviews() {
  return ReviewsRepository.deleteAll()
}

function deleteAllStats() {
  return StatsRepository.deleteAll()
}

function tableMigrate() {
  return db.defaults({
      stats: [],
      reviews: []
    })
    .write()
}

module.exports = {
  populateReviews,
  populateStats,
  tableMigrate,
  deleteAllReviews,
  deleteAllStats
}