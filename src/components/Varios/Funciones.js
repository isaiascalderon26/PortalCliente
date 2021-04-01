import React from 'react'
import axios from 'axios'

const dv = (T) => {
  var M = 0, S = 1;
  for (; T; T = Math.floor(T / 10))
    S = (S + T % 10 * (9 - M++ % 6)) % 11;
  return S ? S - 1 : 'k';
}

export const validateRut = (e) => {
  //   if (changeRUT === true) {
  //     var rut = e.replace(/\./g, '')
  //     if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test(rut)) {
  //       setRutValidado(false)
  //       return 'Formato Incorrecto';
  //     }
  //     var tmp = rut.split('-');
  //     var digv = tmp[1];
  //     rut = tmp[0];
  //     if (digv == 'K') digv = 'k';

  //     if (dv(rut) == digv) {
  //       setRutLoading(true)
  //       return axios
  //         .get(`https://mimx1e8tqi.execute-api.us-east-1.amazonaws.com/dev/sii/consulta/${rut}-${digv}`)
  //         .then((res) => {
  //           setRutLoading(false)
  //           setRutValidado(true)
  //           setChangeRUT(false)
  //           setRs(res.data.razon_social)
  //           return ''
  //         })
  //         .catch((err) => {
  //           setRutLoading(false)
  //           setRutValidado(false)
  //           return 'Error al obtener RS'
  //         })
  //       return ''
  //     }
  //     setRutValidado(false)
  //     return 'RUT Invalido'
  //   }
  //   else {
  return ''
  //   }
}

export const valRut = (e) => {
  return new Promise(async (reject, resolve) => {
    var rut = e.replace(/\./g, '')
    if (!/^ [0 - 9] + [-|‐]{ 1}[0 - 9kK]{ 1}$ /.test(rut)) {
      reject({
        msg: 'Formato Incorrecto'
      })
    }
    var tmp = rut.split('-');
    var digv = tmp[1];
    rut = tmp[0];
    if (digv === 'K') digv = 'k';

    if (dv(rut) === digv) {
      await axios.get(`https://mimx1e8tqi.execute-api.us-east-1.amazonaws.com/dev/sii/consulta/${rut}-${digv}`)
        .then((res) => {
          resolve({
            msg: "Rut Valido"
          })
        })
        .catch((err) => {
          reject({
            msg: 'Error al obtener RS'
          })
        })
    }
    else {
      reject({
        msg: 'RUT Invalido'
      })
    }
  })
}