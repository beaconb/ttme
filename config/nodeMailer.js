var nodemailer = require('nodemailer'); // email sender function 
exports.sendEmail = function(name, surename, email, subject, query, callback){
	console.log('VOy a enviar el correo');
    var transporter = nodemailer.createTransport("SMTP",{
       service: 'Gmail',
       auth: {
           user: 'beaconb.mail@gmail.com',
           pass: 'Raul#G0mez'
       }
	});
	var mailOptions = {
       from: 'trastoo.me',
       to: email,
       subject: subject,
       text: query
	};
	transporter.sendMail(mailOptions, function(error, info){
    if (error){
        console.log(error);
        callback({'response':"Se ha producido un error:"+error}); 
    } else {
        console.log("Email sent");
        callback({'response':"Su consulta se ha procesado correctamente:"+error}); 
    }
});
};