var chgpass = require('../config/chgpass'); 
var register = require('../config/register'); 
var login = require('../config/login');   
var promo = require('../config/promo');  
var user = require('../config/user');
var user2promo = require('../config/user2promo');
var path = require("path");

module.exports = function(app) {        

//ruta de entrada
     app.get('/', function(req, res) {       
          res.sendFile(path.join(__dirname + '/index.html'));
     });
//listado de promociones activas en la plataforma
     app.get('/promo', function(req, res) {       
     	promo.listPromos(function(found){
     		console.log(found);
     		res.json(found);
     	});
     });
//detalle de una promocion dado un id
     app.get('/promo/:idPromo', function(req, res) {       
          promo.getPromo(req.params.idPromo,function(found){
               console.log(found);
               res.json(found);
          });
     });
//alta de promocion en el sistema
	app.post('/promo',function(req,res){         
		var description = req.body.description;
		var title = req.body.title;
		var summary = req.body.summary;
		var publishedDate = req.body.publishedDate;
		var fromDate = req.body.fromDate;
		var toDate = req.body.toDate;
		var link = req.body.link;
		var categoryID = req.body.categoryID;
		var providerID = req.body.providerID;	

        promo.addPromo(description,title,summary,publishedDate,fromDate,toDate,link,categoryID,providerID, function (found) {             
             console.log(found);             
             res.json(found);    
     	});     
     }); 
//login en la app con hash en la pwd     
     app.post('/login',function(req,res){        
          var email = req.body.email;             
          var password = req.body.password;       

          login.login(email,password,function (found) {           
               console.log(found);             
               res.json(found);    
     });    
     });     
//registro de un nuevo usuario en la plataforma
     app.post('/register',function(req,res){         
          var email = req.body.email;             
          var password = req.body.password;       

          register.register(email,password,function (found) {             
               console.log(found);             
               res.json(found);    
     });     
     });     
//añade una promocion como favorita para un usuario     
     app.post('/user/favPromo',function(req,res){
     	var idPromo = req.body.idPromo;
     	var idUser = req.body.idUser;
     	user.favPromo(idPromo, idUser, function(found){
     		console.log(found);
     		res.json(found);
     	});
     });
//elimina las promociones de favoritos de un usuario
     app.post('/user/unfavPromo',function(req,res){
     	var idPromo = req.body.idPromo;
     	var idUser = req.body.idUser;
     	user.unfavPromo(idPromo, idUser, function(found){
     		console.log(found);
     		res.json(found);
     	});
     });
//obtiene las promociones favoritas de un usuario
     app.post('/user/favs',function(req,res){
          var idUser = req.body.idUser;
          user.listaFavs(idUser,function(found){
               console.log(found);
          promo.getPromos(found.arrayFav,function(encuentra){
               console.log(encuentra);
                res.json(encuentra);
          });     
         
          });
     });
//añade una promocion a las vistas por un usuario     
      app.get('/promo/:idpromo/:iduser',function(req,res){        
          var promo = req.params.idpromo;             
          var user = req.params.iduser;       
          user2promo.viewedPromo(promo,user,function (found) {           
               console.log(found);             
               res.json(found);    
     });    
     });   
//obtiene el detalle de un usuario dado un id     
     app.get('/user/:idUser', function(req, res) {       
          user.userDetail(req.params.idUser,function(found){
               console.log(found);
               res.json(found);
          });
     });
//peticion de cambio de contraseña     
     app.post('/api/chgpass', function(req, res) {       
          var id = req.body.id;                 
          var opass = req.body.oldpass;         
          var npass = req.body.newpass;       

          chgpass.cpass(id,opass,npass,function(found){           
               console.log(found);             
               res.json(found);    
     });     
     });     
//peticion de reseteo de contraseña de un usuario
     app.post('/api/resetpass', function(req, res) {         

          var email = req.body.email;         

          chgpass.respass_init(email,function(found){             
               console.log(found);             
               res.json(found);    
     });     
     });     
//reseteo de la contraseña paso 2
     app.post('/api/resetpass/chg', function(req, res) {         
          var email = req.body.email;         
          var code = req.body.code;       
          var npass = req.body.newpass;       

     chgpass.respass_chg(email,code,npass,function(found){           
          console.log(found);             
          res.json(found);    
     
     });     
     });  
};