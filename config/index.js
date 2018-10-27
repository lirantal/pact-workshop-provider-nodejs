require('dotenv').config()

const config = {
  provider: 'Reviews',
  providerBaseUrl: 'http://localhost:3002',
  providerStatesSetupUrl: 'http://localhost:4011/setup',
  pactBrokerUrl: process.env.BROKER_BASE_URL || 'http://localhost',
  pactBrokerUsername: process.env.BROKER_USERNAME,
  pactBrokerPassword: process.env.BROKER_PASSWORD,
  pactConsumersTag: process.env.CONSUMERS_CONTRACT_TAG || 'develop'
}

module.exports = config