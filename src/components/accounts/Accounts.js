import React, { createContext } from 'react'
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js'
import Pool from './UserPool'

const AccountContext = createContext()

const Account = (props) => {

  const authenticate = async (Username, Password) => {
    const response = await new Promise((resolve, reject) => {
      const user = new CognitoUser({ Username, Pool })
      const authDetails = new AuthenticationDetails({ Username, Password })

      user.authenticateUser(authDetails, {
        onSuccess: data => {
          console.log('onSuccess Auth', data)
          resolve(data)
        },

        onFailure: data => {
          console.log('onFailure', data)
          reject(data)
        },

        newPasswordRequired: data => {
          console.log('newPasswordRequired', data)
          resolve(data)
        }
      })
    })
    return response
  }

  const getSession = async () =>
    await new Promise((resolve, reject) => {
      const user = Pool.getCurrentUser()
      console.log("user", user);
      if (user) {
        user.getSession(async (err, session) => {
          if (err) {
            reject()
          } else {

            const attributes = await new Promise((resolve, reject) => {
              user.getUserAttributes((err, attributes) => {
                if (err) {
                  reject(err)
                } else {
                  const results = {}

                  for (let atribute of attributes) {
                    const { Name, Value } = atribute
                    results[Name] = Value
                  }
                  resolve(results)
                }
              })
            })

            const token = session.getIdToken().getJwtToken()

            resolve({
              user,
              headers: {
                Authorization: token,
                'x-api-key': attributes['custom:apikey']
              },
              ...session,
              ...attributes,
            })
          }
        })
      } else {
        reject('noUser');
      }
    })


  const logout = () => {
    const user = Pool.getCurrentUser()
    if (user) {
      user.signOut()
    }
  }

  return (
    <AccountContext.Provider value={{
      authenticate,
      getSession,
      logout
    }}>
      {props.children}
    </AccountContext.Provider>
  )
}

export { Account, AccountContext }
