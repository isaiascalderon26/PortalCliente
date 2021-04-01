import React, { useState, useEffect, useContext } from 'react'
import { CognitoUserAttribute } from 'amazon-cognito-identity-js'
import { AccountContext } from './Accounts'

const Attributes = () => {

  const [plan, setPlan] = useState('')

  const { getSession } = useContext(AccountContext)

  useEffect(() => {
    getSession()
      .then((data) => {
        console.log('DATA', data)
        setPlan(data['custom:plan'])
      })
  }, [])

  const onSubmit = (event) => {
    event.preventDefault()

    getSession()
      .then(({ user }) => {
        const attibutes = [
          new CognitoUserAttribute({ Name: 'custom:plan', Value: plan })
        ]

        user.updateAttributes(attibutes, (err, result) => {
          if (err) console.error(err)
          console.log(result)
        })
      })
  }
  return (
    <div>
      <h1>Update your plan</h1>
      <form onSubmit={onSubmit}>
        <input value={plan} onChange={(event) => setPlan(event.target.value)} />
        <button type='submit'>Change Plan</button>
      </form>
    </div>
  )
}

export default Attributes
