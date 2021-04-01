import logging
import re
import os
import json
import datetime
import time
import email.message
import smtplib

logger = logging.getLogger()
logger.setLevel(logging.INFO)

def lambda_handler(event, context):
    logger.info(json.dumps(event))
    params = json.loads(json.dumps(event))
    logger.info(params)   
    if params is not None:
        if "nombre" in params  and params['nombre']  is not None and "message" in params and params['message'] is not None:
            logger.info('Holaaaa')
            emailToSend = []
            emailToSend.append('isaiasa.calderon@gmail.com')
            emailToSend.append('example@gmail.com')
            emailToSend.append('example@gmail.com')
            try:
                msg = email.message.Message()
                msg['From'] = "<soluciones@miandina.cl>"
                msg['To'] = ",".join(emailToSend)
                msg['Subject'] ="Servicio al Cliente"
                body = """
                        <html>
                            <head>
                                <link href="https://fonts.googleapis.com/css?family=Goudy+Bookletter+1911|Share+Tech" rel="stylesheet">
                            </head>
                            <body style="margin: auto;
                                width: fit-content!important;">
                                <div style="padding: 10px;
                                background: #1862ac;
                                border-radius: 17px;">
                                <div style="background-color: #fff; padding: 20px; border-radius: 10px;">
                                <img style="text-align: center; max-width: 100%; border-radius: 30px; display: block; margin-left: auto; margin-right: auto;" src="https://cristopherav.files.wordpress.com/2015/10/email-icon.png"/>
                                <h4 style="font-weight: 400;">
                                Acabas de recibir un nuevo mensaje de contacto desde Mi Sitio Web con el siguiente contenido:
                                </h4>
                                    <table style="width: 100%;">
                                        <tbody>
                                            <tr>
                                            <td style="background: #607D8B;
                                                text-align: left;
                                                vertical-align: middle;
                                                font-size: 14px;
                                                text-shadow: -1px -1px 1px rgba(0, 0, 0, 0.1);
                                                border: 1px solid #C1C3D1;
                                                padding: 10px;
                                                color: #FFFFFF;">
                                            FECHA</td>
                                            <td style="background: #FFFFFF;
                                                text-align: left;
                                                vertical-align: middle;
                                                font-size: 14px;
                                                text-shadow: -1px -1px 1px rgba(0, 0, 0, 0.1);
                                                border-bottom: 1px solid #C1C3D1;
                                                padding: 10px;">
                                            """ +   datetime.datetime.now().strftime('%d/%m/%Y  %H:%M') + """</td>
                                            </tr>
                                            
                                            <tr>
                                            <td style="background: #607D8B;
                                                text-align: left;
                                                vertical-align: middle;
                                                font-size: 14px;
                                                text-shadow: -1px -1px 1px rgba(0, 0, 0, 0.1);
                                                border: 1px solid #C1C3D1;
                                                padding: 10px;
                                                color: #FFFFFF;">
                                            NOMBRE</td>
                                            <td style="background: #FFFFFF;
                                                text-align: left;
                                                vertical-align: middle;
                                                font-size: 14px;
                                                text-shadow: -1px -1px 1px rgba(0, 0, 0, 0.1);
                                                border-bottom: 1px solid #C1C3D1;
                                                padding: 10px;">
                                            """ + str(params['nombre']) + """</td>
                                            </tr>
                                            
                                            <tr>
                                            <td style="background: #607D8B;
                                                text-align: left;
                                                vertical-align: middle;
                                                font-size: 14px;
                                                text-shadow: -1px -1px 1px rgba(0, 0, 0, 0.1);
                                                border: 1px solid #C1C3D1;
                                                padding: 10px;
                                                color: #FFFFFF;">
                                            E-MAIL</td>
                                            <td style="background: #FFFFFF;
                                                text-align: left;
                                                vertical-align: middle;
                                                font-size: 14px;
                                                text-shadow: -1px -1px 1px rgba(0, 0, 0, 0.1);
                                                border-bottom: 1px solid #C1C3D1;
                                                padding: 10px;">
                                             """ + str(params['email']) + """</td>
                                            </tr>
                                          
                                            <tr>
                                            <td style="background: #607D8B;
                                                text-align: left;
                                                vertical-align: middle;
                                                font-size: 14px;
                                                text-shadow: -1px -1px 1px rgba(0, 0, 0, 0.1);
                                                border: 1px solid #C1C3D1;
                                                padding: 10px;
                                                color: #FFFFFF;">
                                            COMENTARIO</td>
                                            <td style="background: #FFFFFF;
                                                text-align: left;
                                                vertical-align: middle;
                                                font-size: 14px;
                                                text-shadow: -1px -1px 1px rgba(0, 0, 0, 0.1);
                                                border-bottom: 1px solid #C1C3D1;
                                                padding: 10px;">
                                            """ + str(params['message']) + """</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <p style="text-align: center;">--------------------------</p>
                                    <p style="text-align: center; font-size:12px">Mi sitio Web 2020 Derechos reservados.<br/><br/>
                                    Este correo es informativo, favor no responder a esta direccion de correo, ya que no se encuentra habilitada para recibir mensajes.</p>
                                </div>
                                </div> 
                            </body>
                        </html>
                    """
            
                msg.add_header('Content-Type', 'text/html')
                msg.set_payload(body)
                server = smtplib.SMTP("email-smtp.us-east-1.amazonaws.com",587)
                server.starttls()
                server.login("AKIAU2VBDEZ53JME4CO2","BL4Zih90MJZGIrDuFweFUofT9hZ6z2zxDW8jpld3IYca")
                server.sendmail(msg['From'], emailToSend, msg.as_string())
                server.quit()
            except Exception as e:
                logger.error(e)
        
    content = {
        "success": True,
        "message": "OK.",
        "requestDate": datetime.datetime.utcnow().strftime('%m/%d/%Y %H:%M:%S')
    }
    
    response = {
        "isBase64Encoded": False,
        "statusCode": 200,
        "body": json.dumps(content),
        "headers": {
            'content-Type': 'application/json',
            'charset': 'utf8',
            'Access-Control-Allow-Origin': '*'
        }
    }
    
    return response    