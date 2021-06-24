const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const Vonage = require("@vonage/server-sdk");
const socketio = require("socket.io");

const app = express();

const vonage = new Vonage({
  apiKey: "8d390734",
  apiSecret: "u2FZrbvik9B2fEk7",
});

app.set("view engine", "html");
app.engine("html", ejs.renderFile);

app.use(express.static(__dirname + "/public"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/", (req, res) => {
  const from = "Olusola";
  const number = req.body.number;
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
        const data = {
          id: responseData.messages[0]["message-id"],
          number: responseData.messages[0]["to"],
        };

        io.emit("smsStatus", data);
      }
    }
  );
});

const port = 5000;

const server = app.listen(port, () =>
  console.log(`Server started on port ${port}`)
);

const io = socketio(server);
io.on("connection", (socket) => {
  console.log("Connected");
  io.on("disconnect", () => {
    console.log("Disconnected");
  });
});
