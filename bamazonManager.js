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

connection.connect(function(err){
    if(err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    manage();
});

function manage(){
    inquirer.prompt([
        {
            type: "rawlist",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"],
            name: "view",
            message: "What would you like to do?"
        }
    ]).then(function(answer){
        if(answer.view === "View Products for Sale") {
            console.log("Here are all the products for sale: \n");
            forsale();
        }
        else if(answer.view === "View Low Inventory") {
            console.log("These items are running low (less than 5 in stock): \n");
            low();
        }
        else if(answer.view === "Add to Inventory"){
            console.log("Adding to Inventory...\n");
            addToInventory();
        }
        else if(answer.view === "Add New Product"){
            console.log("Adding new products...\n");
            addNewProduct();
        }
    });
};

function forsale(){
    connection.query("SELECT * FROM products", function(err, res){
        if(err) throw err;
        // display all the products in table 
        var tableArr = [];
        for (var i=0; i<res.length; i++){
            var product = {
                ID: res[i].item_id,
                name: res[i].product_name,
                price: res[i].price,
                inventory: res[i].stock_quantity
            };
            tableArr.push(product);
        };
        var table = cTable.getTable(tableArr);
        console.log(table);
        inquirer.prompt([
            {
                type: "input",
                name: "anykey",
                message: "Press enter to return to main menu:\n"
            }
        ]).then(function(key){
            if(key.anykey === ""){
                manage();
            }
        });
    });
}

function low(){
    connection.query("SELECT * FROM products", function(err, res){
        if (err) throw err;
        // display all low inventory items
        var tableArr = [];
        for (var i=0; i<res.length; i++){
            var item = {
                ID: res[i].item_id,
                name: res[i].product_name,
                price: res[i].price,
                inventory: res[i].stock_quantity
            };
            if(item.inventory <= 5){
                tableArr.push(item);
            }
        }
        var table = cTable.getTable(tableArr);
        console.log(table);
        inquirer.prompt([
            {
                type: "input",
                name: "anykey",
                message: "Press enter to return to main menu:\n"
            }
        ]).then(function(key){
            if(key.anykey === ""){
                manage();
            }
        });
    })
}

function addToInventory(){
    connection.query("SELECT * FROM products", function(err, res){
        if(err) throw err;
        // display all the products in table 
        var tableArr = [];
        for (var i=0; i<res.length; i++){
            var product = {
                ID: res[i].item_id,
                name: res[i].product_name,
                price: res[i].price,
                inventory: res[i].stock_quantity
            };
            tableArr.push(product);
        };
        var table = cTable.getTable(tableArr);
        console.log(table);

        inquirer.prompt([
            {
                type: "input",
                name: "id",
                message: "Which product do you want to add inventory?(type in ID)"
            },
            {
                type: "input",
                name: "number",
                message: "How many of them are you adding?"
            } 
        ]).then(function(response){
            var id = parseInt(response.id);
            var number = parseInt(response.number);
            // locate chosen item
            var chosen;
            for (var j=0; j<res.length; j++){
                if (res[j].item_id === id){
                    chosen = res[j];
                }
            }
            
            connection.query(
                "UPDATE products SET ? WHERE ?",
                [
                    {stock_quantity: chosen.stock_quantity+number},
                    {item_id: id}
                ],
                function(err){
                    if (err) throw err;
                    console.log("Inventory added!\n");
                    forsale();
                }
            )
        });
    });
}

function addNewProduct(){
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What's the name of the product you are adding?"
        },
        {
            type: "input",
            name: "price",
            message: "What's the price of the product?"
        },
        {
            type: "input",
            name: "stock",
            message: "How many of them are you adding?"
        },
        {
            type: "list",
            choices: ["Office", "Kitchen", "Entertainment"],
            name: "department",
            message: "Which department are you adding the product to?"
        }
    ]).then(function(response){
        connection.query(
            "INSERT INTO products SET ?",
            [
                {
                    product_name: response.name.trim(),
                    department_name: response.department,
                    price: parseFloat(response.price),
                    stock_quantity: parseInt(response.stock)
                }
            ],
            function(err){
                if (err) throw err;
                console.log("Product added successfully!\n");
                forsale();
            }
        )
    })
}