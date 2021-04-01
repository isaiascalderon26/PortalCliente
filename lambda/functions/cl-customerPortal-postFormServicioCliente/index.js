const AWS = require('aws-sdk')
const db = new AWS.DynamoDB.DocumentClient({ region: 'us-east-1' })
var ses = new AWS.SES({ region: 'us-east-1' });

exports.handler = async (event, context, callback) => {
  
  

  const { idRquest, username, servicio, requerimiento, numEquipo, celContacto, comentario, marca, modelo, nombre, kunnr, horario, direccion, refCalles } = event['body-json']

  let params2 = {
    TableName: 'CL-customerPortal-solicitudesRecibidas',
    Item: {
      id: new Date().getTime(),
      username,
      servicio,
      requerimiento,
      numEquipo,
      marca,
      modelo,
      nombre,
      celContacto,
      kunnr,
      horario,
      direccion,
      refCalles,
      comentario
    }
  }

  
const params = {
    Destination: {
      ToAddresses: ["isaiasa.calderon@gmail.com", "icalderon@koandina.com", "csilvat@koandina.com"],
    },
    Message: {
      Body: {
        Text: { Data: `SERVICIO=${servicio}\N REQUERIMIENTO=${requerimiento}\N USERNAME=${username}\N NRO CLIENTE SAP=${kunnr}\N CELULAR:${celContacto}\N DIRECCION:${direccion} \N CALLES DE REFERENCIA:${refCalles}\N HORARIO DE PREFERENCIA:${horario}\NCOMENTARIO:${comentario}\NMARCA:${marca}\NMODELO:${modelo}\N NRO DE SERIE:${numEquipo}` },
      
       Html:{
           Data:`<!DOCTYPE html>
           <head>
           <style>
          #customers {
            font-family: Arial, Helvetica, sans-serif;
            border-collapse: collapse;
            width: 100%;
          }
          
          #customers td, #customers th {
            border: 1px solid #ddd;
            padding: 8px;
          }
          
          #customers tr:nth-child(even){background-color: #f2f2f2;}
          
          #customers tr:hover {background-color: #ddd;}
          
          #customers th {
            padding-top: 12px;
            padding-bottom: 12px;
            text-align: left;
            background-color: #ff0000;
            color: white;
          }
          </style>
           <meta Charset=\"UTF-8\">  
           <meta NAME=\"VIEWPORT\" CONTENT=\"WIDth=DEVICE-WIDth, INITIAL-SCALE=1.0\">  
           <title>Nuevo Requerimiento<\/title>
           <\/head>
           <body>
           <div style="overflow-x:auto;">
           <table id="customers">  
           <thead>      
           <tr>
           <th>ITEM<\/th>
           <th>VALUE<\/th>
           <\/tr>    
           <\/thead>    
           <tbody>      
           <tr>        
           <td>Servicio:<\/td>        
           <td>${servicio}<\/td>      
           <\/tr>   <tr>        
           <td>Requerimiento:<\/td>        
           <td>${requerimiento}<\/td>      
           <\/tr>      <tr>        
           <td>Nro Cliente:<\/td>        
           <td>${kunnr}<\/td>      <\/tr>      <tr>        
           <td>Celular:<\/td>        
           <td>${celContacto}<\/td>      <\/tr>      <tr>        
           <td>Direccion:<\/td>        <td>${direccion}<\/td>      
           <\/tr>      <tr>        <td>Calles de Referencia:<\/td>        <td>${refCalles}<\/td>      
           <\/tr>      <tr>        <td>Horario de Referencia:<\/td>        <td>${horario}<\/td>      
           <\/tr>      <tr>        <td>Comentario:<\/td>        <td>${comentario}<\/td>      
           <\/tr>      <tr>        <td>Marca:<\/td>        <td>${marca}<\/td>      
           <\/tr>      <tr>        <td>Modelo:<\/td>        <td>${modelo}<\/td>      
           <\/tr>      <tr>        <td>Nro de Serie:<\/td>        <td>${numEquipo}<\/td>      
           <\/tr>    <\/tbody>  <\/table>
           </div>
           <\/body><\/html>`
         }
      },
      Subject: { Data: `${servicio}  -  ${requerimiento}  -  ${kunnr}` },
    },
    Source: "soluciones@miandina.cl",
  };
  try {
    console.log("params", params)
    await ses.sendEmail(params).promise()
  } catch (e) {
    console.error("error", e)
    
  }
  
  // TODO implement
  const response = {
    statusCode: 200,
    body: JSON.stringify('Hello from Lambda!'),
  };
  return response;
//  await db.put(params).promise()
  
  params = {
    TABLENAME: 'FORMULARIOOPTIONS',
    KEY: { 'ID': IDRQUEST }
  }

  // VAR DATA = NULL
  // CONST {ITEM} = AWAIT DB.GET(PARAMS).PROMISE()
  // .thEN(D=>{RETURN D})
  // .CATCH(E=>CONSOLE.LOG(E))
  
  // VAR PARAMSEMAIL = {
  //   DESTINATION: {
  //     TOADDRESSES: ITEM['RECEIVER']
  //   },
  //   MESSAGE: {
  //     BODY: {
  //       TEXT: {
  //         DATA: `SERVICIO=${SERVICIO}\N REQUERIMIENTO=${REQUERIMIENTO}\N USERNAME=${USERNAME}\N NRO CLIENTE SAP=${KUNNR}\N CELULAR:${CELCONTACTO}\N DIRECCION:${DIRECCION} \N CALLES DE REFERENCIA:${REFCALLES}\N HORARIO DE PREFERENCIA:${HORARIO}\NCOMENTARIO:${COMENTARIO}\NMARCA:${MARCA}\NMODELO:${MODELO}\N NRO DE SERIE:${NUMEQUIPO}`
  //       },
  //       HTML:{
  //         DATA:`<!DOCTYPE HTML>\R\N<HTML lang=\"ES\">\R\N\R\N<HEAD>\R\N  <meta CHARSET=\"UTF-8\">\R\N  <meta NAME=\"VIEWPORT\" CONTENT=\"WIDth=DEVICE-WIDth, INITIAL-SCALE=1.0\">\R\N  <title>NUEVO REQUERIMIENTO<\/title>\R\N<\/HEAD>\R\N\R\N<BODY>\R\N  <H1>NUEVO REQUERIMIENTO<\/H1>\R\N\R\N  HA LLEDO UN NUEVO REQUERIMIENTO DEL USUARIO ${USERNAME}, CON LOS SIGUIENTES AtrIBUTOS:\R\N\R\N  <TABLE>\R\N    <thEAD>\R\N      <tr>\R\N        <th>ITEM<\/th>\R\N        <th>VALUE<\/th>\R\N      <\/tr>\R\N    <\/thEAD>\R\N    <tbody>\R\N      <tr>\R\N        <TD>SERVICIO<\/TD>\R\N        <TD>${SERVICIO}<\/TD>\R\N      <\/tr>\R\N      <tr>\R\N        <TD>REQUERIMIENTO<\/TD>\R\N        <TD>${REQUERIMIENTO}<\/TD>\R\N      <\/tr>\R\N      <tr>\R\N        <TD>NRO CLIENTE<\/TD>\R\N        <TD>${KUNNR}<\/TD>\R\N      <\/tr>\R\N      <tr>\R\N        <TD>CELULAR<\/TD>\R\N        <TD>${CELCONTACTO}<\/TD>\R\N      <\/tr>\R\N      <tr>\R\N        <TD>DIRECCION<\/TD>\R\N        <TD>${DIRECCION}<\/TD>\R\N      <\/tr>\R\N      <tr>\R\N        <TD> CALLES DE REFERENCIA<\/TD>\R\N        <TD>${REFCALLES}<\/TD>\R\N      <\/tr>\R\N      <tr>\R\N        <TD>HORARIO DE PREFERENCIA<\/TD>\R\N        <TD>${HORARIO}<\/TD>\R\N      <\/tr>\R\N      <tr>\R\N        <TD>COMENTARIO<\/TD>\R\N        <TD>${COMENTARIO}<\/TD>\R\N      <\/tr>\R\N      <tr>\R\N        <TD>MARCA<\/TD>\R\N        <TD>${MARCA}<\/TD>\R\N      <\/tr>\R\N      <tr>\R\N        <TD>MODELO<\/TD>\R\N        <TD>${MODELO}<\/TD>\R\N      <\/tr>\R\N      <tr>\R\N        <TD>NRO DE SERIE<\/TD>\R\N        <TD>${NUMEQUIPO}<\/TD>\R\N      <\/tr>\R\N    <\/tbody>\R\N  <\/TABLE>\R\N<\/BODY>\R\N\R\N<\/HTML>`
  //       }
  //     },
  //     SUBJECT: {
  //       DATA: `${SERVICIO} - ${REQUERIMIENTO} // ${KUNNR}}`
  //     }
  //   },
  //   SOURCE: "ODI.VARAS@GMAIL.COM"
  // };


//   AWAIT Ses.sendEmail(paramsEmail).promise()
  

};
