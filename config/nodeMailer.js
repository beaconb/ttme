var nodemailer = require('nodemailer'); // email sender function 
exports.sendEmail = function(name, surename, email, subject, query, callback){
	console.log('VOy a enviar el correo');
    var transporter = nodemailer.createTransport("SMTP",{
      host: 'smtp.trastoo.me',
      port: 465,
      secureConnection: true,
      auth: {
           user: 'info@trastoo.me',
           pass: 'Raul#G0mez'
       }
	});
	var mailOptions = {
       from: 'info@trastoo.me',
       to: email,
       subject: subject,
       text: query
	};
	transporter.sendMail(mailOptions, function(error, callback){
    if (error){
        console.log(error);
        callback({'response':"Se ha producido un error:"+error}); 
    } else {
        console.log("Email sent");
        callback({'response':"Su consulta se ha procesado correctamente:"+error}); 
    }
});
};