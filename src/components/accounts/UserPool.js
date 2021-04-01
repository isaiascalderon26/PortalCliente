import { CognitoUserPool } from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId: 'us-east-1_KtfzBjpbR',
  ClientId: '18kl2si1f1fgt39tj2kllicth6'
}

export default new CognitoUserPool(poolData)