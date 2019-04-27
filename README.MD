# Bamazon-node-app

In this project, I created an Amazon-like storefront with node.js and MySQL. This contains three individual apps. The basic app (bamazonCustomer.js) will take in orders from customers and deplete stock from the store's inventory. The bamazonManager.js and bamazonSupervisor.js will provide more functions for magagers and supervisors such as viewing low inventory and viewing performance of departments. 


## App #1: Customer View (bamazonCustomer.js)

### How the app works

1. Running this application in node will first display all of the items available for sale. Include the ids, names, and prices of products for sale.

2. The app should then prompt users with two messages.

   * The first should ask them the ID of the product they would like to buy.
   * The second message should ask how many units of the product they would like to buy.

3. Once the customer has placed the order, the app can check if your store has enough of the product to meet the customer's request.

   * If not, the app should log a phrase like `Insufficient quantity!`, and then prevent the order from going through.

4. However, if your store _does_ have enough of the product, you should fulfill the customer's order.
   * This means updating the SQL database to reflect the remaining quantity.
   * Once the update goes through, show the customer the total cost of their purchase.

### How I made the app

1. Created a MySQL Database called `bamazon`.

2. Then create a Table inside of that database called `products`, which has the following colums:
    * item_id (unique id for each product)
    * product_name (Name of product)
    * department_name
    * price (cost to customer)
    * stock_quantity (how much of the product is available in stores).
   And then populated the database with some different products. 

3. Wrote the js file using the following node packages: 
    * [mysql](https://www.npmjs.com/package/mysql)
    * [inquirer](https://www.npmjs.com/package/inquirer)
    * [console.table](https://www.npmjs.com/package/console.table)

### Demo of the app in use

    ![bamazon customer view](https://github.com/CapApple/bamazon/blob/master/screenshots/bamazonCustomer.gif)


- - -

## App #2: Manager View

### How the app works:

Running this application will:

* List a set of menu options:

* View Products for Sale
    
* View Low Inventory
    
* Add to Inventory
    
* Add New Product

  * If a manager selects `View Products for Sale`, the app should list every available item: the item IDs, names, prices, and quantities.

  * If a manager selects `View Low Inventory`, then it should list all items with an inventory count lower than five.

  * If a manager selects `Add to Inventory`, your app should display a prompt that will let the manager "add more" of any item currently in the store.

  * If a manager selects `Add New Product`, it should allow the manager to add a completely new product to the store.

- - -
