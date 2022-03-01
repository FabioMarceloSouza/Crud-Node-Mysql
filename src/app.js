const express =  require("express");
const mysql = require("mysql");
var bodyParser = require('body-parser')

var con = mysql.createConnection({
    host: "localhost",
    database: "aula",
    user: "root",
    password: ""
  });

  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");

  });


const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//Views

app.get('/', (req, res) => {
    
    con.query("SELECT * FROM users", function(err, result) {
        if (err) throw err;

       
       res.render('pages/index', { users: result });
    })

})

app.get('/update/:id', (req, res) => {
    let sql = "SELECT * FROM users WHERE id = ?";
    let id = req.params.id
    
    
    con.query(sql, id, function(err, result) {
        if (err) throw err;
         
        res.render('pages/update', { user: result });
    })
})

//Controllers

app.post('/add-user', (req, res) => {
    var sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?);";


    con.query(sql, [req.body.name, req.body.email, req.body.password], function(err, result) {
        if(err) throw err;
        res.redirect("/")
    })
})

app.get('/delete-user/:id',(req, res) => {
    const id = req.params.id
  var sql = "DELETE FROM users WHERE id = ?";

  con.query(sql, id, function (err, result) {
    if (err) throw err;
    console.log("deletado com sucesso");
    res.redirect('/')
  });
})


app.post('/update-user', (req, res) => {
    let sql = "UPDATE users SET name = ?, email = ? , password = ? WHERE id = ?";

    con.query(sql, [req.body.name, req.body.email, req.body.password, req.body.id], (err, result) => {
        if(err) throw err;

        res.redirect('/')
    })
})

module .exports = {
    app
}