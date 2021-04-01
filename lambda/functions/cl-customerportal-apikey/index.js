const { APIGateway, CognitoIdentityServiceProvider } = require('aws-sdk')

const API = new APIGateway({ region: 'us-east-1' })
const cognito = new CognitoIdentityServiceProvider({ region: 'us-east-1' })

const generateApiKey = async (sub) => {
  return await new Promise((resolve, reject) => {
    const params = {
      name: `custPortal-${sub}`,
      generateDistinctId: true,
      enabled: true,
      stageKeys: [
        {
          restApiId: 'ne58mah6v9',
          stageName: 'production',
        },
      ],
    }

    API.createApiKey(params, (err, results) => {
      if (err) reject(err)
      else resolve(results)
    })
  })
}

const addToPlan = async (keyId) => {
  return await new Promise((resolve, reject) => {
    const params = {
      keyId,
      keyType: 'API_KEY',
      usagePlanId: '8r6vwl',
    }

    API.createUsagePlanKey(params, (err, results) => {
      if (err) reject(err)
      else resolve(results)
    })
  })
}

const saveApiKey = async (sub, apikey) => {
  return await new Promise((resolve, reject) => {
    const params = {
      UserAttributes: [
        {
          Name: 'custom:apikey',
          Value: apikey,
        },
      ],
      Username: sub,
      UserPoolId: 'us-east-1_KtfzBjpbR',
    }

    cognito.adminUpdateUserAttributes(params, (err, results) => {
      if (err) reject(err)
      else resolve(results)
    })
  })
}

const addGroup = async(userName,Group) =>{
  return await new Promise((resolve,reject)=>{
    const params = {
      GroupName: Group,
      UserPoolId: 'us-east-1_KtfzBjpbR',
      Username: userName
    }
    cognito.adminAddUserToGroup(params, (err, result) => {
      if (err) reject(err)
      else  resolve(result)
    });
  })
}

const main = async (event) => {
  if (event.triggerSource == 'PostConfirmation_ConfirmSignUp') {
    const { sub } = event.request.userAttributes
    const { id, value: apikey } = await generateApiKey(sub)
    await addToPlan(id)
    await saveApiKey(event.userName, apikey)
    await addGroup(event.userName,event.request.userAttributes['custom:group'])
  }

  return event
}

exports.handler = main