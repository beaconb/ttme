var chgpass = require('../config/chgpass'); 
var register = require('../config/register'); 
var login = require('../config/login');   
var promo = require('../config/promo');  
var user = require('../config/user');
var user2promo = require('../config/user2promo');

module.exports = function(app) {        


     app.get('/', function(req, res) {       

          res.end("Trastoo.me Node-Android-Project");    
     });

     app.get('/promo', function(req, res) {       
     	promo.listPromos(function(found){
     		console.log(found);
     		res.json(found);
     	});
     });

     app.get('/promo/:idPromo', function(req, res) {       
          promo.getPromo(req.params.idPromo,function(found){
               console.log(found);
               res.json(found);
          });
     });

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
     app.post('/login',function(req,res){        
          var email = req.body.email;             
          var password = req.body.password;       

          login.login(email,password,function (found) {           
               console.log(found);             
               res.json(found);    
     });    
     });     

     app.post('/register',function(req,res){         
          var email = req.body.email;             
          var password = req.body.password;       

          register.register(email,password,function (found) {             
               console.log(found);             
               res.json(found);    
     });     
     });     
     app.post('/user/favPromo',function(req,res){
     	var idPromo = req.body.idPromo;
     	var idUser = req.body.idUser;
     	user.favPromo(idPromo, idUser, function(found){
     		console.log(found);
     		res.json(found);
     	});
     });

     app.post('/user/unfavPromo',function(req,res){
     	var idPromo = req.body.idPromo;
     	var idUser = req.body.idUser;
     	user.unfavPromo(idPromo, idUser, function(found){
     		console.log(found);
     		res.json(found);
     	});
     });

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
      app.get('/promo/:idpromo/:iduser',function(req,res){        
          var promo = req.params.idpromo;             
          var user = req.params.iduser;       
          user2promo.viewedPromo(promo,user,function (found) {           
               console.log(found);             
               res.json(found);    
     });    
     });   
     
     app.get('/user/:idUser', function(req, res) {       
          user.userDetail(req.params.idUser,function(found){
               console.log(found);
               res.json(found);
          });
     });
     app.post('/api/chgpass', function(req, res) {       
          var id = req.body.id;                 
          var opass = req.body.oldpass;         
          var npass = req.body.newpass;       

          chgpass.cpass(id,opass,npass,function(found){           
               console.log(found);             
               res.json(found);    
     });     
     });     

     app.post('/api/resetpass', function(req, res) {         

          var email = req.body.email;         

          chgpass.respass_init(email,function(found){             
               console.log(found);             
               res.json(found);    
     });     
     });     

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