DROP DATABASE IF EXISTS bamazondb;

CREATE DATABASE bamazondb;

USE bamazondb;

CREATE TABLE products (
    position INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(45) NOT NULL,
    department_name VARCHAR(45) NOT NULL,
    price DECIMAL(6,2) NULL,
    stock_quantity INT NOT NULL,
    PRIMARY KEY (position)    
);

SELECT * FROM products;
