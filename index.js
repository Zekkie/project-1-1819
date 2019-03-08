const fetch = require("fetch");
const express = require("express");
const xml = require("xml");
const cors = require("cors");
const app = express();


app.use(cors());



app.get("/:query",(req,res) => {
	let q = (req.params.query);
	fetch.fetchUrl("http://zoeken.oba.nl/api/v1/search/?authorization=1e19898c87464e239192c8bfe422f280&q="+q+"&facet=type(sheetmusic)&refine=true&pagesize=20&rctx=ASXIwQ2CMBQG4L$8GCSM4MkJml5cx7yWYgqFltIecAjDBE7l3atjaOLlO3wC1KKGysPEOXaLtvdhUyNrv3EsoyGBZmI3C0KbS2TzV9DJXZM1a7Qp8s2SqoC93@vq8SRRvS70eR$BOmgGcJYphCy9W4rr5O$astqEw$zFFw==", function(err,meta,body) {
		
		res.set("Content-Type", "text/xml");
		res.send(body.toString());
	})
})




app.listen(3000, function() {
	console.log("running")
})