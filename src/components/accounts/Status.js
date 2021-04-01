import React, { useContext, useState, useEffect } from 'react'
import { AccountContext } from './Accounts'

const Status = () => {

  const [status, setStatus] = useState(false)

  const { getSession, logout } = useContext(AccountContext)

  useEffect(() => {
    getSession()
      .then(session => {
        console.log("Session", session)
        setStatus(true)
      })
  }, [])

  return (
    <div>
      <h1>{status ? (
        <div>
          'log in'
          <button onClick={logout}>Logout</button>
        </div>) : 'not login'}</h1>
    </div>
  )
}

export default Status
