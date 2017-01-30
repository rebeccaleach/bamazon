-- Create a MySQL Database called Bamazon.

-- Then create a Table inside of that database called Products.

-- The products table should have each of the following columns:

-- ItemID (unique id for each product)

-- ProductName (Name of product)

-- DepartmentName

-- Price (cost to customer)

-- StockQuantity (how much of the product is available in stores)


CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE product (
	itemID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	productNAME VARCHAR(500) NOT NULL,
	departmentNAME VARCHAR(500) NOT NULL,
	price DECIMAL(15,2) NOT NULL,
	stockQUANTITY INT NOT NULL
);


INSERT INTO product (productNAME, departmentNAME, price, stockQUANTITY)
VALUES ("Javascript for Dummies", "books", 25.46, 13);
INSERT INTO product (productNAME, departmentNAME, price, stockQUANTITY)
VALUES ("LEGO Star Wars: The Force Awakens", "video games", 30.12, 5);
INSERT INTO product (productNAME, departmentNAME, price, stockQUANTITY)
VALUES ("white t-shirt", "clothing", 10.00, 2);
INSERT INTO product (productNAME, departmentNAME, price, stockQUANTITY)
VALUES ("water bottle", "camping equipment", 17.21, 8);
INSERT INTO product (productNAME, departmentNAME, price, stockQUANTITY)
VALUES ("lightbulbs", "household", 5.50, 4);
INSERT INTO product (productNAME, departmentNAME, price, stockQUANTITY)
VALUES ("backpack", "school/office supplies", 32.05, 9);
INSERT INTO product (productNAME, departmentNAME, price, stockQUANTITY)
VALUES ("bookcase", "home furnishings", 235.77, 5);
INSERT INTO product (productNAME, departmentNAME, price, stockQUANTITY)
VALUES ("Equalizer Stain and Odor Remover, 4 pack", "pet supplies", 65.88, 29);
INSERT INTO product (productNAME, departmentNAME, price, stockQUANTITY)
VALUES ("iPhone case", "electronics", 10.99, 78);
INSERT INTO product (productNAME, departmentNAME, price, stockQUANTITY)
VALUES ("The Amulet of Samarkand", "books", 12.89, 4);
INSERT INTO product (productNAME, departmentNAME, price, stockQUANTITY)
VALUES ("purple sheets, 500 thread count", "bedding", 50.32, 44);

