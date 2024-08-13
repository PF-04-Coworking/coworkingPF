export const pruebaEmail =  `<!DOCTYPE html>
<html lang="es" xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="format-detection" content="telephone=no">
    <title>Reserva Confirmada</title>
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,400i,700,700i" rel="stylesheet">
    <style>
        body {
            font-family: 'Open Sans', sans-serif;
            background-color: #fafafa;
            margin: 0;
            padding: 0;
            color: #333333;
        }
        .email-wrapper {
            width: 100%;
            background-color: #fafafa;
            padding: 20px 0;
        }
        .email-content {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 10px;
            overflow: hidden;
        }
        .email-header, .email-footer {
            background-color: #161616;
            color: #ffffff;
            padding: 20px;
            text-align: center;
        }
        .email-body {
            padding: 20px;
            background-color: #333333;
            color: #ffffff;
        }
        .email-body h1 {
            color: #eb9a32;
        }
        .email-body p {
            margin: 10px 0;
        }
        .social-icons {
            padding: 20px 0;
            text-align: center;
        }
        .social-icons img {
            margin: 0 10px;
            width: 32px;
        }
        .unsubscribe {
            font-size: 12px;
            color: #888888;
            text-align: center;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="email-wrapper">
        <div class="email-content">
            <div class="email-header">
                <img src="https://eohjeqh.stripocdn.email/content/guids/CABINET_c2a15c4f24dc676ad1685aa0be79941b2bfc30e1074d6fb0ecb2bdb7011cb4f8/images/logo_para_lola.png" alt="Logo" width="200">
            </div>
            <div class="email-body">
                <h1>¡Tienes una Reserva!</h1>
                <p>Hola {{NAME}},</p>
                <p>Nos comunicamos desde <span style="color:#eb9a32;">Relux Team</span> para recordarte tu reserva próxima en <strong>{{OFFICE}}</strong> desde el día <strong>{{STARTDATE}} </strong> hasta el día <strong>{{ENDDATE}}</strong>, inclusive.</p>
                <p>¡Esperamos contar contigo en las instalaciones durante esos días!</p>
                <p>Saludos cordiales,<br><span style="color:#eb9a32;">Relux Support Team</span></p>
            </div>
            <div class="email-footer">
                <div class="social-icons">
                    <a href="#"><img src="https://eohjeqh.stripocdn.email/content/assets/img/social-icons/logo-black/facebook-logo-black.png" alt="Facebook"></a>
                    <a href="#"><img src="https://eohjeqh.stripocdn.email/content/assets/img/social-icons/logo-black/twitter-logo-black.png" alt="Twitter"></a>
                    <a href="#"><img src="https://eohjeqh.stripocdn.email/content/assets/img/social-icons/logo-black/instagram-logo-black.png" alt="Instagram"></a>
                    <a href="#"><img src="https://eohjeqh.stripocdn.email/content/assets/img/social-icons/logo-black/youtube-logo-black.png" alt="YouTube"></a>
                </div>
                <p>© 2021 Relux, Inc. Todos los derechos reservados.<br>4562 Límites de Panda Nebuloso, Cruce de Sillas, Kentucky, EE.UU., 607898</p>
                <p class="unsubscribe">Si no deseas recibir más correos, <a href="#">desuscríbete aquí</a>.</p>
            </div>
        </div>
    </div>
</body>
</html>
 `