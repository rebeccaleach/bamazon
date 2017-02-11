var mysql = require('mysql');

var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "lunabin86",
	database: "bamazon"
});





connection.connect(function(err) {
	if (err) throw err;
	console.log("connected as id " + connection.threadId);
	
	connection.query('SELECT * FROM product', function(err, res) {
		console.log("PRODUCTS AVAILABLE: ");
		for (var i = 0; i < res.length; i++) {
			console.log(res[i].itemID + " | " + res[i].productNAME + " | " + res[i].price);
		}
		console.log("-----------------------------");
		console.log('Type "node [filename.js] [itemID] [quantity]" in the console to make your purchase.');
	}); // end of first connection.query
	// buyProducts();
});








var buyProducts = function() {
	var productChoice;
	var productQuantity;
	// displaying all the available products from the database in the console
	connection.query('SELECT * FROM product', function(err, res) {



		productChoice = process.argv[2];
		productQuantity = process.argv[3];
		console.log('The product ID you entered is ' + productChoice);
		console.log('The quantity you entered is ' + productQuantity);

		for (var j = 0; j < res.length; j++) {
			if (res[j].productID === productChoice) {
				var quantityResult = res[j].quantity - productQuantity;
				if (quantityResult >= 0) {
					console.log("Hurray! Your order has been placed!");
				}
				else {
					console.log("Your order cannot be fulfilled because we don't have enough items in stock.");
				}
			}
		}




	}); // end of connection.query
}; // end of buyProducts function
