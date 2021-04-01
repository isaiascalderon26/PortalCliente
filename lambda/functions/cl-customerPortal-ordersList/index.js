const axios = require('axios').default

const main = async (event) => {
  const { rut } = event
  
  const urlLogin = 'http://191.235.92.195/api/auth/login'

  const body = {
    "username": "customerPortal",
    "password": "PanconPalta.01.!"
  }
  
  let headers = { 'Content-Type': 'application/json', 'Authorization': null }
  let token = null;
  console.log("urlLogin", urlLogin)
  await axios.post(urlLogin,body,{headers})
    .then(res => {
      token = res.data.token
      console.log("response login", res)
    })
    .catch(e=>console.log(e))
  
  headers["Authorization"] = `Token ${token}`
  
  const url = `http://191.235.92.195/api/T001/getDataOrders/?rut=${rut}`
  const result = await axios.get(url,{headers})

  if (!result.data)
    return {
      status: 400,
      message: 'noData'
    }

  return {
    status: 200,
    payload: result.data
  }
}

exports.handler = main