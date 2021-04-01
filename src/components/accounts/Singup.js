import React, { useState } from 'react'
import { CognitoUserAttribute } from 'amazon-cognito-identity-js'
import UserPool from './UserPool'

const Singup = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')

  const onSubmit = event => {
    event.preventDefault()

    UserPool.signUp(username, password, [
      new CognitoUserAttribute({ Name: 'email', Value: email })
    ], null, (err, data) => {
      if (err) console.log(err)
      console.log(data)
    })
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input value={username} onChange={event => setUsername(event.target.value)} />
        <input value={email} onChange={event => setEmail(event.target.value)} />
        <input value={password} onChange={event => setPassword(event.target.value)} />
        <button type='submit'>crear usuario</button>
      </form>
    </div>
  )
}

export default Singup
