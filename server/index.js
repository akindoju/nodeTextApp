var express = require("express");
var bodyParser = require("body-parser");
var Vonage = require("@vonage/server-sdk");
var cors = require("cors");
require("dotenv").config();

var app = express();
app.use(cors());

var vonage = new Vonage({
  apiKey: process.env.API_KEY,
  apiSecret: process.env.API_SECRET,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Up and Running");
});

app.post("/send", (req, res) => {
  const from = "Olusola";
  const number = req.body.phoneNumber;
  const text = req.body.text;

  vonage.message.sendSms(
    from,
    number,
    text,
    { type: "unicode" },
    (err, responseData) => {
      if (err) {
        console.log(err);
      } else {
        console.dir(responseData);
        res.send("Successful");
      }
    }
  );
});

const port = 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
