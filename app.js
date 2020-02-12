const express = require("express");
const cors = require("cors");
const app = express();

app.use(
    cors({
      origin: "http://localhost:5500"
    })
  );
app.get("/", function(req, res) {
    "use strict";
    console.log(req.query.url);
    const request = require("request");
    
    let subscriptionKey = process.env["COMPUTER_VISION_SUBSCRIPTION_KEY"];
    let endpoint = process.env["COMPUTER_VISION_ENDPOINT"];

    var uriBase = endpoint + "vision/v2.1/analyze";
    const imageUrl = req.query.url;
    
    // Request parameters.
    const params = {
      visualFeatures: "Categories,Description,Color",
      details: "",
      language: "en"
    };
    
    const options = {
      uri: uriBase,
      qs: params,
      body: '{"url": ' + '"' + imageUrl + '"}',
      headers: {
        //"Content-Type": "text/plain",
        //"Content-Type": "application/json",
        "Ocp-Apim-Subscription-Key": subscriptionKey
      }
    };
    
    request.post(options, (error, response, body) => {
      if (error) {
        console.log("Error: ", error);
        return;
      }

      let jsonResponse = JSON.stringify(JSON.parse(body), null, "  ");

      
      res.setHeader('content-type', 'application/json');
      res.send(jsonResponse);
    });
    
});
app.listen(process.env.PORT, function() {
  console.log(`Related Pics listening on port ${process.env.PORT}!`);
});
