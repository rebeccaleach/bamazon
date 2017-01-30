var mysql = require('mysql');
var prompt = require('prompt');

var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "",
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


connection.connect(function(err) {
	if (err) throw err;
	console.log("connected as id " + connection.threadId);
	buyProducts();
});



var buyProducts = function() {
	var productChoice;
	var productQuantity;
	// displaying all the available products from the database in the console
	connection.query('SELECT * FROM product', function(err, res) {
		console.log("PRODUCTS AVAILABLE: ");
		for (var i = 0; i < res.length; i++) {
			console.log(res[i].itemID + " | " + res[i].productNAME + " | " + res[i].price);
		}
		prompt.start();
		prompt.get(prompting, function(err, res) {
			productChoice = res.productID;
			productQuantity = res.quantity;
			console.log('The product ID you entered is ' + productChoice);
			console.log('The quantity you entered is ' + productQuantity);

			for (var i = 0; i < res.length; i++) {
				if (res[i].productID === productChoice) {
					var quantityResult = res[i].quantity - productQuantity;
					if (quantityResult >= 0) {
						console.log("Hurray! Your order has been placed!");
					}
					else {
						console.log("Your order cannot be fulfilled because we don't have enough items in stock.");
					}
				}
			}

		}); // end of prompt.get
	}); // end of connection.query
}; // end of buyProducts function
