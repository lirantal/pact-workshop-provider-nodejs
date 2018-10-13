const path = require('path')
const { Verifier } = require('@pact-foundation/pact')
const pkg = require(path.resolve('./package.json'))
const config = require(path.resolve('./config'))

// this is required due to the time it takes to spin up the verification process
// such as: d/l the pacts from the broker and running the tests
jest.setTimeout(30000);
const pactVerifier = new Verifier()

describe('Reviews Contract verification', () => {
  it('should validate expectations of Reviews contract', async () => {

    const options = {
      provider: config.provider,
      providerBaseUrl: config.providerBaseUrl,
      providerStatesSetupUrl: config.providerStatesSetupUrl,
      pactBrokerUrl: config.pactBrokerUrl,
      // Fetch from broker with given tags
      tags: ['develop'],
      pactBrokerUsername: config.pactBrokerUsername,
      pactBrokerPassword: config.pactBrokerPassword,
      // Send verification results on failure
      publishVerificationResult: true,
      // Set the provider version for the results that
      // will be published to the broker after provider testing
      providerVersion: pkg.version,
    }

    const testResults = await pactVerifier.verifyProvider(options)
    console.log('Pact Verification Complete!')
    console.log(testResults)
  })
})
