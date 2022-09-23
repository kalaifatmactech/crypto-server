var express = require("express");
var app = express();
const axios = require('axios');
var cors = require('cors')
app.use(cors())
console.log("CORSS>>>>")
const bitbnsApi = require('bitbns');


app.listen(3000, () => {
 console.log("Server running on port 3000");
});

app.get("/url", (req, res, next) => {
    res.json(["Tony","Lisa","Michael","Ginger","Food"]);
});

app.get("/coinmarketcap", async (req, res) => {
	var resultsArray = []
    try {
		
		const responseAssets = await axios({
			url: "https://betconix.com/api/v1/assets",
			method: "get",
		});

		const response = await axios({
			url: "https://betconix.com/api/v1/all",
			method: "get",
		});
		let result = response.data
		// console.log("result",result)
		result.map((res, index)=>{
			// let coinname = responseAssets.data.fil
			// var picked = arr.find(o => o.city === 'Amsterdam');
			let symbol = res.base_currency
			// console.log("symbol",symbol)
			let coin = responseAssets.data[symbol].name
			// console.log("coin",coin)
			res.coin_name =  coin.charAt(0).toUpperCase() + coin.slice(1).toLowerCase()
			resultsArray.push(res)
			// var targetObject= responseAssets.data.find(x => x.symbol !== undefined);
		
			// console.log(responseAssets.data.find(({symbol}) => symbol));

			// let keys = Object.keys(foo)
			// var coinname = responseAssets.data.find(o =>  Object.keys(o) === symbol);
			// console.log("coinname",coinname)
		})

		// console.log("resultsArray",resultsArray.length)

		res.status(200).json(resultsArray);
	} catch (err) {
		res.status(500).json({ message: err });
	}
  
});
app.get("/wazirx", async (req, res) => {
    try {
		const response = await axios({
			url: "https://api.wazirx.com/api/v2/market-status",
			method: "get",
		});
		res.status(200).json(response.data);
	} catch (err) {
		res.status(500).json({ message: err });
	}


  
});

app.get("/bitbns", async (req, res) => {
	// try {
	const bitbns = new bitbnsApi();
	var bitbnsRes = []
	const response = await axios({
		url: "https://betconix.com/api/v1/all",
		method: "get",
	});
	let result = response.data
	result.map((res, index)=>{
		let trading_pairs = res.trading_pairs.split('_')

		// console.log("trading_pairs", trading_pairs)
		bitbns.fetchTrades(trading_pairs[0], trading_pairs[1], 1, function(error, data){
			let resData = data
			if(resData.data.length>0 && resData.data[0].hasOwnProperty('msg') === false) {
			
				resData.trading_pairs = trading_pairs
				
				bitbnsRes.push(resData)

				
			}
			else {
				resData.trading_pairs = {}
				
				bitbnsRes.push(resData)
			}

			console.log(bitbnsRes.length, result.length)

			// if(resData.data.hasOwnProperty('error')) {
			// 	resData.trading_pairs = trading_pairs
			// 	bitbnsRes.push(resData)
				
			// 	// console.log(resData);
	
			// }
			
			if(bitbnsRes.length === result.length) {
				console.log("final res...", bitbnsRes.length)
				res.status(200).json(bitbnsRes);
			}
		});
	})

	// console.log("bitbns res...", bitbnsRes)

	// }	catch (err) {
	// 	res.status(500).json({ message: err });
	// }
	
	
	
	// bitbns.getTickerApi('BTC,ETH',function(error,data){
	// 	console.log("BTC Price :: ",data);
	//   })
	// bitbns.fetchTrades('BTC', 'USDT', 10, function(error, data){
	// 	console.log(data);
	// });

	// bitbns.platformStatus(function(error, data){
	// 	console.log("eerrr",error, data);
	//  });

	// bitbns.fetchTickers(function(error, data){
	// 	console.log(data);
	// });

    // try {
	// 	const response = await axios({
	// 		url: "https://api.bitbns.com/api/trade/v1/platform/status",
	// 		method: "get",
	// 	});
	// 	res.status(200).json(response.data);
	// } catch (err) {
	// 	res.status(500).json({ message: err });
	// }
});




app.get("/async", async (req, res) => {
    const options = {
        method: 'POST',
        url: 'https://coinmarketcapzakutynskyv1.p.rapidapi.com/getCryptocurrenciesList',
        headers: {
          'X-RapidAPI-Key': '8525d27952msh1d664a71ae4be10p141c98jsn96d4e42fe421',
          'X-RapidAPI-Host': 'CoinMarketCapzakutynskyV1.p.rapidapi.com'
        }
      };
    try {
		const response = await axios({
			url: "https://coinmarketcapzakutynskyv1.p.rapidapi.com/getCryptocurrenciesList",
			method: "POST",
            headers: {
                'X-RapidAPI-Key': '8525d27952msh1d664a71ae4be10p141c98jsn96d4e42fe421',
                'X-RapidAPI-Host': 'CoinMarketCapzakutynskyV1.p.rapidapi.com',
                "Content-Type": "application/x-www-form-urlencoded"
            }
		});
		res.status(200).json(response.data);
	} catch (err) {
		res.status(500).json({ message: err });
	}

	
});


