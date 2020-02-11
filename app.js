const express = require("express");
const cors = require("cors");
const app = express();

app.use(
    cors({
      origin: "http://alloweddomain.com"
    })
  );
app.get("/", function(req, res) {
  res.send("CORS TEST");



    "use strict";
    console.log(req.query.url)
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
        "Content-Type": "application/json",
        "Ocp-Apim-Subscription-Key": subscriptionKey
      }
    };
    
    request.post(options, (error, response, body) => {
      if (error) {
        console.log("Error: ", error);
        return;
      }

      let jsonResponse = JSON.stringify(JSON.parse(body), null, "  ");
      
      for(let i = 0; i < JSON.parse(body).description.tags.length; i++) {
          //console.log(JSON.parse(body).description.tags[i]);
      }
      
      res.setHeader('content-type', 'application/json');
      res.send(jsonResponse);
    });
    
});
app.listen(3000, function() {
  console.log("Related Pics listening on port 3000!");
});
