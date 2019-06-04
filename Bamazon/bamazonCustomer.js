var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Brewers2019!",
    database: "bamazon" 
})

connection.connect(function(err){
    if (err) throw err;
    console.log("conection successful")
    makeTable();
})
const makeTable = function(){
    connection.query("SELECT * FROM products", function (err, response){
        for (var i = 0; i < response.length; i++){
            console.log(response[i].itemid+" "+response[i].productName+" "+response[i].departmentName+" "+response[i].price+" "+response[i].stockQuantity+"\n")
        }
    })
}
