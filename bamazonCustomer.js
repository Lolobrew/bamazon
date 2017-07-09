let inquirer = require('inquirer');
let mysql = require('mysql');

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "hellonurse",
  database: "bamazondb"
});

connection.connect(function (err) {
  if (err) throw err;
  displayStore();
});

function displayStore(){
    connection.query("SELECT * FROM products", function (err, res) {
      if (err) throw err;
      for(var i = 0; i < res.length; i++){
            console.log ("Product ID: " + res[i].position + " | Product Name: " + res[i].product_name + " | Product Price: $" + res[i].price + " | Stock Quantity: " + res[i].stock_quantity);
        }
        console.log("--------------------------------------------------------");

        purchase();
    });
}

function purchase(){
      inquirer
        .prompt([
            {
                name: "id",
                type: "input",
                message: "Input the ID of the item you would like to purchase",
            },
            {
                name: "quantity",
                type: "input",
                message: "How many units of the product would you like to purchase?"
            }
        ]).then(function(answer){
            showTotal();
        });
}

function showTotal(){
    console.log("Your total is null")
}