import React from 'react'
import { Grid, Typography, Box, Container } from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: 30,
    color: '#dddddd',
    [theme.breakpoints.up('sm')]: {
      color: '#222222',
    },
  },
  Box: {
    paddingBottom: 20,
    textAlign: 'center'
  },
  subtitle: {
    marginTop: 30,
    marginBottom: 10,
    fontWeight: 700,
    color: 'white',
    [theme.breakpoints.up('sm')]: {
      color: 'black',
    },
  },
  title: {
    margin: '40px 0 40px 0',
    color: 'white',
    [theme.breakpoints.up('sm')]: {
      color: 'black',
    },
  }
}))

const Terms = () => {
  const classes = useStyles();

  return (
    <Container maxWidth='md'>
      <Grid container>
        <Grid item xs={12} className={classes.root}>
          <Box>
            <Typography variant='h4' className={classes.title}>
              TÉRMINOS Y CONDICIONES
          </Typography>
            <Typography variant='subtitle1' className={classes.subtitle}>
              CONSIDERACIONES GENERALES
          </Typography>
            <Typography variant='body2'>
              El acceso y uso por todo usuario o consumidor de este sitio web embotelladoraandina.cl, en adelante el “Sitio Web”, se rige por los términos y condiciones que se describen a continuación, en adelante los “Términos y Condiciones”, así como también por la legislación vigente en la República de Chile. En este Sitio Web el usuario podrá usar, sin costo alguno, nuestro software, incluida la versión móvil del Sitio Web. Al aceptar estos Términos y Condiciones, los usuarios declaran haberse informado de manera clara, comprensible e inequívoca de los mismos, y que han tenido posibilidad de almacenarlos y/o imprimirlos.
          </Typography>
            <Typography variant='subtitle1' className={classes.subtitle}>
              REGISTRO
            </Typography>
            <Typography variant='body2'>
              El usuario podrá completar un formulario de registro disponible en el Sitio Web y enviarlo a Embotelladora Andina, digitando un "click" en el campo respectivo. El registro antes señalado no es requisito excluyente para contratar en este Sitio Web, pero otorga la posibilidad de contar con un acceso personalizado, confidencial y seguro. El usuario deberá mantener bajo reserva y proteger la información de acceso a su cuenta personal siendo responsable del uso de claves o de su información secreta de acceso.
          </Typography>
            <Typography variant='subtitle1' className={classes.subtitle}>
              LIBERTAD PARA NAVEGAR Y COMPARAR PRODUCTOS Y SERVICIOS
          </Typography>
            <Typography variant='body2'>
              La sola visita de este Sitio Web no le impone obligación alguna al usuario, a menos que éste último haya expresado en forma inequívoca y mediante actos positivos su voluntad de adquirir determinados productos y/o bienes, en la forma indicada en estos Términos y Condiciones.
          </Typography>
            <Typography variant='subtitle1' className={classes.subtitle}>
              FORMACIÓN DEL CONSENTIMIENTO EN LOS CONTRATOS CELEBRADOS A TRAVÉS DE ESTE SITIO.
          </Typography>
            <Typography variant='body2'>
              Toda operación que se efectúe en este Sitio Web, la confirmación y/o validación o verificación por parte de Embotelladora Andina, será requisito para la formación del consentimiento.
         </Typography>
            <Typography variant='subtitle1' className={classes.subtitle}>
              CANALES DE ATENCIÓN Y AYUDA
          </Typography>
            <Typography variant='body2'>
              Toda presentación, duda, consulta o reclamo relacionado con estos Términos y Condiciones y/o con los actos o contratos ejecutados o celebrados a través del Sitio Web, debe ser presentado a través de los siguientes canales de atención: (i) call center: Teléfono 600 360 3600, y/o (iii) correo electrónico: bienvenido@embotelladoraandina.cl .
          </Typography>
            <Typography variant='subtitle1' className={classes.subtitle}>
              POLÍTICAS DE SEGURIDAD Y PROTECCIÓN DE DATOS PERSONALES
          </Typography>
            <Typography variant='body2'>
              Embotelladora Andina mantiene altos estándares que aseguran tanto la autenticidad del Sitio como el cifrado de toda la información que entregan los usuarios. La información entregada por el usuario será almacenada bajo altos estándares de seguridad, tratada en conformidad a la ley y con el exclusivo propósito de perfeccionar contrato, concretar las transacciones, validar los pedidos, recibir pagos y mejorar la labor de información y comercialización de los productos ofrecidos. En ningún caso podrán comunicarse o cederse a terceros, salvo cuando la ley lo permita, y solo a empresas relacionadas con Embotelladora Andina, con fines exclusivamente comerciales. El usuario registrado podrá ejercer sus derechos de información, modificación, eliminación, rectificación, cancelación y/o bloqueo de sus datos personales cuando lo estime pertinente, según lo establecido en la Ley N° 19.628 sobre Protección de la Vida Privada. Para ejercer esos derechos, efectuar dicha revocación o modificar la información el usuario deberá comunicarse al teléfono 2 2617 8819 en horario hábil, pudiendo solicitarse una verificación de la identidad de la persona que se presenta como titular, antes de efectuar los cambios, a través de los medios fehacientes que establece la ley.
          </Typography>
            <Typography variant='subtitle1' className={classes.subtitle}>
              PROPIEDAD INTELECTUAL
          </Typography>
            <Typography variant='body2'>
              Todos los contenidos incluidos en este Sitio Web, como textos, material gráfico, íconos de botones, códigos fuente, y compilaciones de datos, son propiedad de The Coca-Cola Company, o de sus proveedores de contenidos, y están protegidos por las leyes chilenas e internacionales sobre propiedad intelectual. Ningún producto o imagen pueden ser reproducidos, duplicados, copiados, vendidos, revendidos, visitados o explotados para ningún fin, en todo o en parte, sin el consentimiento escrito previo, sin perjuicio de las excepciones expresamente señaladas en la ley.
          </Typography>
            <Typography variant='subtitle1' className={classes.subtitle}>
              COMUNICACIONES
          </Typography>
            <Typography variant='body2'>
              Toda comunicación promocional o publicitaria enviada electrónicamente desde este Sitio Web indicará el asunto a que se refiere, nuestra identidad como remitente y, además, un link para que el destinatario, si lo desea, pueda solicitar la suspensión de esos envíos, e imprimir un comprobante de la solicitud. De esta forma cesarán los mensajes a toda persona que lo haya solicitado. Embotelladora Andina no solicita datos personales ni financieros a través de e-mail ni de ninguna otra forma escrita.
          </Typography>
            <Typography variant='subtitle1' className={classes.subtitle}>
              DOMICILIO
          </Typography>
            <Typography variant='body2'>
              El domicilio de Embotelladora Andina será la ciudad de Santiago. Para determinar la competencia de los tribunales, se podrá considerar el domicilio que el usuario haya indicado al registrarte en el Sitio Web, y; si no ha registrado un domicilio, se considerará la comuna en que tenga su residencia. Sin perjuicio de lo anterior, siempre podrán aplicarse las reglas de competencia establecidas en el artículo 50 A de la Ley N° 19.496. Un texto actualizado de este instrumento se mantendrá en el Sitio Web.
      </Typography>
          </Box>
        </Grid>
      </Grid >
    </Container>
  )
}

export default Terms
