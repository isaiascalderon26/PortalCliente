import React, { useState, useContext } from 'react'
import { AccountContext } from './Accounts'

const Login = () => {

  const [email, setEmail] = useState('odi.varas@gmail.com')
  const [password, setPassword] = useState('')

  const { authenticate } = useContext(AccountContext)

  const onSubmit = event => {
    event.preventDefault()
    authenticate(email, password)
      .then(data => {
        console.log('Logged In', data)
      })
      .catch(err => {
        console.log('Failed to Login', err)
      })

  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input value={email} onChange={event => setEmail(event.target.value)} />
        <input value={password} onChange={event => setPassword(event.target.value)} />
        <button type='submit'>LogIn</button>
      </form>
    </div>
  )
}

export default Login
