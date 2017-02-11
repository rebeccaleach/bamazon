var mysql = require('mysql');
var prompt = require('prompt');

var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "lunabin86",
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
			productChoice = response.productID;
			productQuantity = response.quantity;
			console.log('The product ID you entered is ' + productChoice);
			console.log('The quantity you entered is ' + productQuantity);


			for (var j = 0; j < res.length; j++) {
				// console.log(res[j].itemID + " | " + res[j].productNAME + " | " + res[j].stockQUANTITY);
				if (res[j].itemID == productChoice) {
					console.log(res[j].productNAME);
					console.log("Quantity of " + res[j].productNAME + " left in stock: " + productQuantity);
				}
				// else {
				// 	console.log("You entered an invalid product ID.");
				// 	buyProducts();
				// 	break;
				// }




				// if (res[j].productID === productChoice) {
				// 	var quantityResult = res[j].quantity - productQuantity;
				// 	if (quantityResult >= 0) {
				// 		console.log("Hurray! Your order has been placed!");
				// 	}
				// 	else {
				// 		console.log("Your order cannot be fulfilled because we don't have enough items in stock.");
				// 	}
				// }
			}
			// console.log("-------------------");
			// console.log(productChoice);
			// console.log(productQuantity);
			


		}); // end of prompt.get



		



	}); // end of connection.query
}; // end of buyProducts function
