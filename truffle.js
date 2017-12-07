

//const constants = require('./constants');
var HDWalletProvider = require("truffle-hdwallet-provider");
var mnemonic = "oil snack powder kiwi exhibit clay rate table famous behind final river";

module.exports = {
	networks: {
		rinkeby: {
			provider: function() {
				return new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/bvIvPElsNPoXVy7ObzS6")
			},
			network_id: 3,
			gas: 5712388
		},
		development: {
			host: "127.0.0.1",
			port: 7545,
			network_id: "*" // Match any network id
		}
	}
};

/*module.exports = {
	networks: {
		development: {
			host: "127.0.0.1",
			port: 7545,
			network_id: "*" // Match any network id
		}
	}
};*/

