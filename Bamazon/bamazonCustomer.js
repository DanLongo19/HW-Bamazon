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
        chooseProduct(response);
    })
    const chooseProduct = function(response){
        inquirer.prompt([{
        type: "input",
        name: "choose",
        message: "Which product would you like to buy?",
        }])
        .then(function(answer){
          for (var i = 0; i < response.length; i++){
              if (response[i].productName = answer.choose){
                  correct = true;
                  const product = answer.choose;
                  const id = i;
        inquirer.prompt({
        type: "input",
        name: "quantity",
        message: "How many would you like to buy?",
        validate: function(value){
            if(isNaN(value) == false){
                return true;
            } else {
                return false;
            }
            }
        }).then(function(answer){
            if((response[id].stockQuantity-answer.quantity)>0){
                connection.query("UPDATE products SET stockQuantity='"+(response[id].stockQuantity-answer.quantity)+"' WHERE productName='"+product+"'", function(err,response2){
                    console.log("Great Purchase!");
                    makeTable();
                })
            } else {
                console.log("Sorry we don't have that in stock. Place another purchase");
                chooseProduct(response);
            }
        })
    }
}

})
}
}
