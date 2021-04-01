import React, { useState, useEffect, useContext } from 'react'

import { AccountContext } from './Accounts'
import ChangePswd from './ChangePswd'
import ChangeEmail from './ChangeEmail'


const Settings = () => {
  const [loggedIn, setLoggedIn] = useState(false)
  const { getSession } = useContext(AccountContext)

  useEffect(() => {
    getSession()
      .then(() => {
        setLoggedIn(true)
      })
  }, [])

  return (
    <div>
      {loggedIn && (
        <>
          <h1>Settings:</h1>
          <ChangePswd />
          <ChangeEmail />
        </>
      )}


    </div>
  )
}

export default Settings
