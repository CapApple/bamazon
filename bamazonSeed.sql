CREATE DATABASE bamazon_db;
USE bamazon_db;
CREATE TABLE products (
    item_id INTEGER(5) NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(50) NOT NULL,
    department_name VARCHAR(50),
    price DECIMAL(10,2),
    stock_quantity INTEGER(4),
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name,  price, stock_quantity)
VALUES ("Desk Lamp", "Office", 32, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Icecream Scoop", "Kitchen", 16.5, 60);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Wireless Printer", "Office", 70.89, 40);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Air Fryer", "Kitchen", 191, 30);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("VR Goggle", "Entertainment", 200, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("PS4", "Entertainment", 389, 30);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Blender", "Kitchen", 64, 42);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Stapler", "Office", 15, 52);