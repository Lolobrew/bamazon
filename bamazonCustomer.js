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
    console.log("\n\n");
    connection.query("SELECT * FROM products", function (err, res) {
      if (err) throw err;
      console.log("Welcome to Our Store!");
      for(var i = 0; i < res.length; i++){
            console.log("------------------------------------------------------------------------------------------------------");
            console.log ("Product ID: " + res[i].position + "  | Product Name: " + res[i].product_name + "  | Product Price: $" + res[i].price + "  | Stock Quantity: " + res[i].stock_quantity);
        }
        console.log("------------------------------------------------------------------------------------------------------");

        purchase();
    });
}

function purchase(){
    console.log("\n");
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
            let id = answer.id;
            let quantity = answer.quantity;
            validateQuantity(id, quantity);
        });
}

function validateQuantity(id, quantity){
    let query = "SELECT stock_quantity FROM products WHERE ?";
    connection.query(query, {position: id}, function (err, res) {
        if (err) throw err;
        var stock = res[0].stock_quantity;
        console.log("\n")
        if (stock > quantity){
            console.log("We have verified this items availability.");
            buyProduct(id, quantity);
        } else {
            console.log("Sorry there is not enough of that product in inventory.");
            displayStore();
        }
    });
}

function buyProduct(id, quantity){
    let query = `UPDATE products SET stock_quantity = stock_quantity - ${quantity} WHERE position = ${id}`;
    connection.query(query, function (err, res) {
        if (err) throw err;
    });

    let query2 = `SELECT * FROM products WHERE position = ${id}`;
    connection.query(query2, function(err, res) {
        if (err) throw err;
        let item = res[0].product_name;
        console.log(`You have bought ${quantity} ${item}'s!`);
        showTotal(id, quantity);
    });
}


function showTotal(id, quantity){
    let query = `SELECT price FROM products WHERE position = ${id}`;
    connection.query(query, function(err, res){
        if (err) throw err;
        let price = res[0].price;
        let total = price * quantity;
        console.log(`Your Total is $${total}`);
        displayStore();
    });
}