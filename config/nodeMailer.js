var nodemailer = require('nodemailer'); // email sender function 

exports.sendEmail = function(name, surename, email, subject, query, callback){
	
    var transporter = nodemailer.createTransport("SMTP",{
      host: 'smtp.trastoo.me',
      port: 465,
      secureConnection: true,
      auth: {
           user: 'info@trastoo.me',
           pass: 'Raul#G0mez'
       }
	});
    console.log('transporter creado');
	var mailOptions = {
       from: 'info@trastoo.me',
       to: email,
       subject: subject,
       text: query
	};
  console.log('opciones creado');
	transporter.sendMail(mailOptions, function(error, callback){
    console.log('VOy a enviar el correo, con resultado: '+error);
    if (error){
        console.log(error);
        callback({'response':"Se ha producido un error:"+error}); 
    } else {
        console.log("Email sent");
        callback({'response':"Resultado de la operacion OK"}); 
    }
});
};