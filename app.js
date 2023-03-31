const express  = require("express");
const app = express();
const { engine } = require('express-handlebars');
// const Post = require('./Model/Post');
const Users = require('./Model/Users');
const db = require("./Model/db");
const admin = require('./routes/admin');
const path = require('path');


// config
    // Template engine
    app.engine(
      "handlebars",
      engine({
        defaultLayout: "main",
        runtimeOptions: {
          allowProtoPropertiesByDefault: true,
          allowProtoMethodsByDefault: true,
        },
      })
    );
    

    app.use(express.static(__dirname + '/public'));
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'handlebars');
    app.use(express.urlencoded({extended:false}));
    app.use(express.json());

    app.get('/', (req, res) => {
      res.render('home')
    })  


    app.get('/admin/users/create', (req, res) => {
      res.render('admin/users/create')
    })

    app.get('/admin/users/list', (req, res) => {
      res.render('admin/users/list') // caminho das pastas
    })

    app.get('/admin/users/update', (req, res) => {
      res.render('admin/users/update')
    })

    app.get('/admin/users/delete', (req, res) => {
      res.render('admin/users/delete')
    })





    // ROTA LOGIN: admin
    app.get('/admin', (req, res) => {
      res.render('login/admin')
    })

    // ROTA LOGIN: alunos
    app.get('/alunos', (req, res) => {
      res.render('login/alunos')
    })


    // VALIDANDO FORMULARIO DE LOGIN
    // app.post('/login', (req, res) => {
    //   var erros = [];

    //   if(!req.body.email || typeof req.body.nome == undefined || req.body.nome == null) {

    //   }



    // })


    app.post('/create-user', (req, res) => {
      Users.create({
        // userName: req.body.nome,
        userEmail: req.body.email,
        userPassword: req.body.password,
      }).then(() => {
        res.send('Usuário cadastrado com sucesso!')
      }).catch((erro) => {
        res.send('Não foi possível cadastrar usuário', + erro)
      })
    })

    app.post('/add', (req, res) => {
      res.send('usuário cadastrado com sucesso!')
    })



  
    app.get('/cadastro', (req, res) => {
      res.render('cadastro')
    })

    app.get('/sobre', (req, res) => {
      res.render('sobre')
    })


   // PÁGINA NÃO EXISTE
    app.get('*', function(req, res){
      res.render('404');
    });



    // ROTAS: admin
  
    // no parametro get eu escrevo a minha url: ex.: users/list
    app.get('/admin/users/create', (req, res) => {
      res.render('admin/users/create') //caminho das pastas
    });

 

    // CREATE USERS ( users system )
    app.post('/admin/users/list', (req, res) => {
        Users.create({
        userName: req.body.name,
        userEmail: req.body.email,
        userPassword: req.body.password,
        // user_contact: req.body.contact
        }).then(() => {
            res.send('Usuário cadastrado com sucesso!');
        }).catch((erro) => {
            res.send('Usuário não cadastrado: ' + erro);
        });
    });

    
  

    // Rotas admin
    app.use('/admin', admin);



// RODANDO NA PORTA 8081
app.listen(8081, () => {
    console.log('Servidor iniciado na porta 8081: http://localhost:8081');
});