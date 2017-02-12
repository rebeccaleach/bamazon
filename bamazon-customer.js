var mysql = require('mysql');
var prompt = require('prompt');

var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "yourmomlol",
	database: "bamazon"
});


var prompting = {
	properties: {
		productID: {
			description: "Enter the ID number of the product you'd like to buy",
		},
		quantity: {
			description: "Enter the quantity of the product you want"
		}
	}
};


var productChoice;
var productQuantity;
var quantityResult;
var orderTotal;



connection.connect(function(err) {
	if (err) throw err;
	console.log("connected as id " + connection.threadId);
	start();
});


var start = function() {
	connection.query('SELECT * FROM product', function(err, res) {
		console.log("PRODUCTS AVAILABLE: ");
		// displaying all the available products from the database in the console
		for (var i = 0; i < res.length; i++) {
			console.log(res[i].itemID + " | " + res[i].productNAME + " | " + res[i].price);
		};
		buyProducts();

	});
};


var buyProducts = function() {
	connection.query('SELECT * FROM product', function(err, res) {
		prompt.start();
		prompt.get(prompting, function(error, response) {
			desiredProduct = response.productID;
			desiredQuantity = response.quantity;

			for (var j = 0; j < res.length; j++) {
				// console.log(res[j].itemID + " | " + res[j].productNAME + " | " + res[j].stockQUANTITY);
				if (res[j].itemID == desiredProduct) {
					console.log("You selected " + desiredQuantity + " of " + res[j].productNAME);
					var quantityResult = res[j].stockQUANTITY - desiredQuantity;
					// console.log(res[j].stockQUANTITY);
					// console.log(desiredQuantity);
					// console.log(quantityResult);
					if (quantityResult >= 0) {

						connection.query('UPDATE product SET ? WHERE ?', [{
								stockQUANTITY: quantityResult
							}, {
								itemID: desiredProduct
							}], function(reply) {
								console.log("Inventory was updated.");
							}
						); // end of second connection.query

						orderTotal = res[j].price * desiredQuantity;
						console.log("Your total is: $" + orderTotal);
						console.log("Your order has been placed!");
					}
					else {
						console.log("We don't have enough of that item to fulfill your order.");
					}
				}
			}
			// console.log("-------------------");
			// console.log(desiredProduct);
			// console.log(productQuantity);

		}); // end of prompt.get
	}); // end of connection.query
}; // end of buyProducts function

