var chgpass = require('../config/chgpass'); 
var register = require('../config/register'); 
var login = require('../config/login');   
var promo = require('../config/promo');
var category = require('../config/category');
var user = require('../config/user');
var user2promo = require('../config/user2promo');
var path = require("path");
var session = require('express-session');
var mailer = require('../config/nodeMailer');

module.exports = function(app) {        
     app.use(session({secret: 'ssshhhhh'}));
     
//ruta de entrada
     app.get('/', function(req, res) {       
          res.render("pages/login");
          //res.sendFile(path.join(__dirname + '/login.html'));
     });
//listado de promociones activas en la plataforma
     app.get('/promo', function(req, res) {    
      sess=req.session; 
          if (sess.hash){   
     	promo.listPromos(function(found){
     		console.log(found);
     		res.json(found);
     	});
          }else{
               res.render('pages/loginMensaje',{mensaje:"Usuario no logado"});
          }
     });
//detalle de una promocion dado un id
     app.get('/promo/:idPromo', function(req, res) {       
          sess=req.session; 
          if (sess.hash){
               promo.getPromo(req.params.idPromo,function(found){
                    var contenido = found;
                    user.userDetail(sess.hash,function(usuario){
                      var perfil = usuario;
                      res.render('pages/promo',{contenido:found.doc,perfil:usuario});
                    });
               });
          }else{
               res.render('pages/loginMensaje',{mensaje:"Usuario no logado"});
          }
     });
//alta de promocion en el sistema
	app.post('/promo',function(req,res){
     sess=req.session; 
     if (sess.hash){         
		var description = req.body.description;
		var title = req.body.title;
		var summary = req.body.summary;
		var publishedDate = req.body.publishedDate;
		var fromDate = req.body.fromDate;
		var toDate = req.body.toDate;
		var link = req.body.link;
		var categories = req.body.categories;
		var providerID = req.body.providerID;	

        promo.addPromo(description,title,summary,publishedDate,fromDate,toDate,link,categories,providerID, function (found) {             
             console.log(found);             
             res.json(found);    
     	});
     }else{
          res.render('pages/loginMensaje',{mensaje:"Usuario no logado"});
     }     
     }); 
var sess;
//login en la app con hash en la pwd     
     app.post('/login',function(req,res){    
          sess=req.session;    
          var email = req.body.email;             
          var password = req.body.password;       

          login.login(email,password,function (found) {           
        

          //In this we are assigning email to sess.email variable.
          //email comes from HTML page.
          sess.hash=found.token;
          console.log("sessionHash: "+sess.hash);
          promo.listPromos(function(encontrado){
          var resultado = encontrado;
          var perfil = found;
          category.listCategories(function(listado){
                  console.log(listado);
                var categs = listado;
                  res.render("pages/home",{resultado:encontrado,perfil:found,categs:listado});
                });
          });
     });    
     });     
//registro de un nuevo usuario en la plataforma
     app.post('/register',function(req,res){         
          var email = req.body.email;             
          var password = req.body.password;       

          register.register(email,password,function (found) {             
               console.log(found);             
               res.render('pages/login');    
     });     
     });     
//añade una promocion como favorita para un usuario     
     app.post('/user/favPromo',function(req,res){
          sess=req.session; 
          console.log('entro a favs');
          if (sess.hash){ 
          	var idPromo = req.body.idPromo;
          	var idUser = sess.hash;
          	user.favPromo(idPromo, idUser, function(found){
          		console.log(found);
          	res.redirect('/user/favs');
          	});
          }else{
               res.render('pages/loginMensaje',{mensaje:"Usuario no logado"});
          }  
     });
//elimina las promociones de favoritos de un usuario
     app.post('/user/unfavPromo',function(req,res){
          sess=req.session; 
          if (sess.hash){ 
          	var idPromo = req.body.idPromo;
          	var idUser = sess.hash;
          	user.unfavPromo(idPromo, idUser, function(found){
          		console.log(found);
          		res.redirect('/user/favs');
          	});
           }else{
               res.render('pages/loginMensaje',{mensaje:"Usuario no logado"});
          }  
     });
//obtiene las promociones favoritas de un usuario
     app.get('/user/favs',function(req,res){
          sess=req.session; 
          if (sess.hash){ 
               var idUser = sess.hash;
               user.listaFavs(idUser,function(found){
                    console.log(found);
                    promo.getPromos(found.arrayFav,function(encuentra){
                      var resultado = encuentra;
                      user.userDetail(sess.hash,function(usuario){
                      var perfil = usuario;
                      console.log(encuentra);
                      res.render("pages/favs",{resultado:encuentra,perfil:usuario});
                    });    
                    }); 
               });
          }else{
               res.render('pages/loginMensaje',{mensaje:"Usuario no logado"});
          }
     });
//añade una promocion a las vistas por un usuario     
      app.get('/user/promo/:idpromo',function(req,res){     
        console.log('entro');  
          sess=req.session; 
          if (sess.hash){    
               var promo = req.params.idpromo;             
                
               user.userDetail(sess.hash,function(usuario){
                console.log("IdUsuario: "+usuario.doc._id);
                 user2promo.viewedPromo(promo,usuario.doc._id,function (found) {           
                      console.log(found);             
                      res.redirect('/promo/'+promo);    
                 }); 
               });
          }else{
               res.render('pages/loginMensaje',{mensaje:"Usuario no logado"});
          }  
     });   
//obtiene el detalle de un usuario dado un id     
     app.get('/user', function(req, res) {
          sess=req.session; 
          if (sess.hash){       
               user.userDetail(sess.hash,function(found){
                    console.log(found);
                     var perfil = found;
                    res.render('pages/user',{perfil:found});
               });
          }else{
               res.render('pages/loginMensaje',{mensaje:"Usuario no logado"});
          }    
     });
     //obtiene el detalle de un usuario dado un id     
     app.post('/user', function(req, res) {
          sess=req.session; 
          if (sess.hash){       
               var name = req.body.name;
               var surename = req.body.surename;
               var facebook = req.body.facebook;
               var twitter = req.body.twitter;
               var google = req.body.google;
               
               user.userUpdate(sess.hash,name,surename,facebook,twitter,google,function(found){
                    console.log(found);
                     var perfil = found;
                    res.render('pages/userUpdate',{perfil:found});
               });
          }else{
               res.render('pages/loginMensaje',{mensaje:"Usuario no logado"});
          }    
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
     app.get('/about', function(req, res) { 
      sess=req.session; 
          if (sess.hash){       
               user.userDetail(sess.hash,function(found){
                    console.log(found);
                     var perfil = found;
                    res.render('pages/about',{perfil:found});
               });
          }else{
               res.render('pages/loginMensaje',{mensaje:"Usuario no logado"});
          }   
     });
     app.get('/newUser', function(req, res) { 
          res.render("pages/newUser");
     });
     app.get('/userUpdate', function(req, res) { 
          sess=req.session; 
          if (sess.hash){       
               user.userDetail(sess.hash,function(found){
                console.log(found);
                var perfil = found;
                res.render("pages/userUpdate",{perfil:found});
               });
          }else{
               res.render('pages/loginMensaje',{mensaje:"Usuario no logado"});
          }   
     });
     app.get('/home', function(req, res) { 
          sess=req.session; 
          if (sess.hash){       
               user.userDetail(sess.hash,function(found){
                console.log(found);
                promo.listPromos(function(encontrado){
                var resultado = encontrado;
                var perfil = found;
                category.listCategories(function(listado){
                  console.log(listado);
                var categs = listado;
                  res.render("pages/home",{resultado:encontrado,perfil:found,categs:listado});
                });
          });
               });
          }else{
               res.render('pages/loginMensaje',{mensaje:"Usuario no logado"});
          }    
          
     });
     app.get('/logout',function(req,res){
          req.session.destroy(function(err) {
            if(err) {
              console.log(err);
            } else {
              res.redirect('/');
            }
          });
     });
      app.get('/contacto', function(req, res) { 
        sess=req.session; 
          if (sess.hash){       
               user.userDetail(sess.hash,function(found){
                var perfil = found;
                res.render("pages/contacto",{perfil:found});
              });
          }
          else {
             res.render('pages/loginMensaje',{mensaje:"Usuario no logado"});
          }
     });
     app.post('/contacto',function(req,res){
        var email = req.body.email;         
        var name = req.body.name;       
        var surename = req.body.surename; 
        var subject = req.body.subject; 
        var query = req.body.query; 

       mailer.sendEmail(name, surename, email, subject, query);

        sess=req.session; 
        if (sess.hash){       
            user.userDetail(sess.hash,function(found){
              var perfil = found;
              res.render("pages/contactoMensaje",{perfil:found});
            });
        }
        else {
           res.render('pages/loginMensaje',{mensaje:"Usuario no logado"});
        }
     });

     app.get('/categories', function(req, res) {    
      sess=req.session; 
          if (sess.hash){   
      promo.listPromos(function(found){
        console.log(found);
        res.json(found);
      });
          }else{
               res.render('pages/loginMensaje',{mensaje:"Usuario no logado"});
          }
     });
     //lista todas las promos de una categoria concreta
     app.get('/categories/:idCategory',function(req, res){
      sess=req.session; 
      
      if (sess.hash){    
        var categoryId = req.params.idCategory;
        category.categoryDetail(categoryId,function(claseDB){
            var clase = claseDB;
            console.log("Categoria que me esta llegando: "+clase.name);
          });

            promo.getPromosByCategory(categoryId,function(listado){
             console.log("resultado de promos by cat: "+listado);   
                 
              user.userDetail(sess.hash,function(found){
              var resultado = listado;   
              var perfil = found;
              
              res.render('pages/categories',{resultado:listado,clase:claseDB,perfil:found}); 
            });  
               
          });

      }else{
        res.render('pages/loginMensaje',{mensaje:"Usuario no logado"});
      }  
     });
};