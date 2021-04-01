import React, { useState, useContext } from 'react'
import rp from 'request-promise'
import { AccountContext } from './Accounts'

const RandomNumber = () => {

  const [number, setNumber] = useState(0)

  const { getSession } = useContext(AccountContext)

  const fetchNumber = () => {
    getSession()
      .then(async (user) => {
        const url = 'https://oitwdctjca.execute-api.us-east-1.amazonaws.com/dev/randomnumber?min=1&max=100'

        const number = await rp(url, { headers: user.headers })
        console.log(number)
        setNumber(number)
      })
  }
  return (
    <div>
      <div>Random number :{number}</div>
      <button onClick={fetchNumber}>Fetch new number</button>
    </div>
  )
}

export default RandomNumber
