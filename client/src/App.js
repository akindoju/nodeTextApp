import "./App.css";
import { useState } from "react";
import axios from "axios";

const App = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [text, setText] = useState("");
  const [isSuccessful, setIsSuccessful] = useState(false);

  const sendText = () => {
    axios
      .post("http://localhost:5000/send", {
        phoneNumber: phoneNumber,
        text: text,
      })
      .then(function (response) {
        response === "Successful" && setIsSuccessful(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="App">
      <h2>Send SMS Message</h2>
      <input
        type="tel"
        name="number"
        placeholder="Enter Phone Number"
        value={phoneNumber}
        onChange={({ target }) => {
          setPhoneNumber(target.value);
        }}
      />
      <input
        type="text"
        name="msg"
        placeholder="Enter Text Message"
        value={text}
        onChange={({ target }) => {
          setText(target.value);
        }}
      />
      <button
        type="button"
        className="button"
        onClick={(event) => {
          event.preventDefault();
          sendText();
        }}
      >
        Send Text Message
      </button>
      {isSuccessful && <p>Message sent to {phoneNumber}</p>}
    </div>
  );
};

export default App;
