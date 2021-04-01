const axios = require('axios')

const E200 = 'Customer'
const E500 = 'Error al authentificarse con Thanos'
const E501 = 'No existe relacion entre el rut y el id'
const E502 = 'Error al intentar validar datos'
const dictError = {
    'E500':E500,
    'E501':E501,
    'E502':E502
}

let statusCode = 999
let message =''

exports.handler = async (event) => {
    
    const { rut, id } = event
    
    const token = await getToken()
                    .then(r=>r)
                    .catch(e=> {
                        statusCode=500,
                        message=E500
                    })
    if(statusCode!=999) return {statusCode,message}
    
    await doValidation(rut,id,token)
    .then(d=>{
        statusCode=200
        message=E200
    })
    .catch(err=>{
        statusCode=err,
        message=dictError[`E${err}`]
    })
    
    return {
        statusCode,
        message
    };
};

const getToken = async(rut,id) =>{
    return await new Promise(async(resolve,reject)=>{
        const urlLogin = 'http://191.235.92.195/api/auth/login'
        const body = {
            "username": "customerPortal",
            "password": "PanconPalta.01.!"
        }
        let headers = { 'Content-Type': 'application/json' }
        
        await axios.post(urlLogin,body,headers = headers)
            .then(d=>resolve(d.data.token))
            .catch(e=>reject(e.response.data))    
    })
}

const doValidation = async(rut,id,token)=>{
    return await new Promise(async(resolve,reject)=>{
        const headers = { 
            'Content-Type': 'application/json',
            'Authorization':`Token ${token}` 
        }
        const url = `http://191.235.92.195/api/T001/getDataClient/?rut=${rut}&id=${id}`
        
        await axios.get(url, { headers })
        .then(res => {
            console.log(res)
          if (res.data.puntos.length === 0) {
            reject(501)
          }
          else {
            resolve({})
          }
        })
        .catch(err => {
            console.log(err)
            reject(502)
            
        })
        
    })
}