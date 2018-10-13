const Repository = require('../repository')
const DataSet = require('../data/reviews.json')

function populateData() {
  const documentInserts = []

  console.log('+ Seeding DB data')
  DataSet.forEach(reviewItem => {
    console.log(`  - ${reviewItem.id}`)
    documentInserts.push(Repository.insert(reviewItem))
  })

  return Promise.all(documentInserts)
}

function clearAllData() {
  return Repository.deleteAll()
}

function tableMigrate() {
  return Repository.initModel()
}

module.exports = {
  populateData,
  tableMigrate,
  clearAllData
}