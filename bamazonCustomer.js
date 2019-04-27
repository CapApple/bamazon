var inquirer = require("inquirer");
var mysql = require("mysql");
var cTable = require("console.table");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "bamazon_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    sale();
});

function sale() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        // display all the items
        console.log("Here are some of our most popular items: \n");
        var tableArr = [];
        for (var i = 0; i < res.length; i++) {
            // console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].price);
            var item = {
                ID: res[i].item_id,
                name: res[i].product_name,
                price: res[i].price
            };
            tableArr.push(item);
        }
        var table = cTable.getTable(tableArr);
        console.log(table);

        inquirer.prompt([
            {
                type: "input",
                name: "id",
                message: "Please let us know the ID of the item you would like to buy.\n"
            },
            {
                type: "input",
                name: "quantity",
                message: "How many of them would you like to buy?\n"
            }
        ]).then(function (answer) {
            // find out the item in the database
            var chosenItem;
            for (var j = 0; j < res.length; j++) {
                if (res[j].item_id === parseInt(answer.id)) {
                    chosenItem = res[j];
                }
            }
            // console.log(chosenItem);
            // check stock 
            if(chosenItem.stock_quantity < parseInt(answer.quantity)){
                console.log("Insufficient quantity!\n");
                // sale();
                inquirer.prompt([
                    {
                        type: "input",
                        name: "anykey",
                        message: "Press enter to start over.\n"
                    }
                ]).then(function(keypress){
                    if (keypress.anykey === ""){
                        sale();
                    }
                })
            }
            // update sql
            else{
                var newStock = parseInt(chosenItem.stock_quantity - answer.quantity);
                var totalCost = chosenItem.price * answer.quantity;
                connection.query(
                    "UPDATE products SET ? WHERE ?",
                    [
                        {stock_quantity: newStock},
                        {product_name: chosenItem.product_name}
                    ],
                    function(err){
                        if (err) throw err;
                        console.log("Your order is confirmed! \nYour total cost is $" + totalCost + ".\n");
                        connection.end();
                    }
                )
            }
        })
    });
}

