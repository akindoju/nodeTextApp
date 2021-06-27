import "./App.css";
import { useState } from "react";
import axios from "axios";

const App = () => {
  const [smsNumber, setSmsNumber] = useState("");
  const [smsText, setSmsText] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [whatsappText, setWhatsappText] = useState("");
  const [isSmsSuccessful, setIsSmsSuccessful] = useState(false);
  const [isWhatsappSuccessful, setIsWhatsappSuccessful] = useState(false);

  const sendSMS = () => {
    axios
      .post("http://localhost:5000/sms", {
        smsNumber: smsNumber,
        smsText: smsText,
      })
      .then(function (response) {
        response === "Successful" && setIsSmsSuccessful(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const sendWhatsappMsg = () => {
    axios
      .post("http://localhost:5000/whatsapp", {
        whatsappNumber: whatsappNumber,
        whatsappText: whatsappText,
      })
      .then(function (response) {
        response === "Successful" && setIsWhatsappSuccessful(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="App">
      {/* sms */}
      <div>
        <h2>Send SMS Message</h2>
        <input
          type="tel"
          name="number"
          placeholder="Enter Recipient's Number"
          value={smsNumber}
          onChange={({ target }) => {
            setSmsNumber(target.value);
          }}
        />
        <input
          type="text"
          name="msg"
          placeholder="Enter Text Message"
          value={smsText}
          onChange={({ target }) => {
            setSmsText(target.value);
          }}
        />
        <button
          type="button"
          className="button-1"
          onClick={(event) => {
            event.preventDefault();
            sendSMS();
          }}
        >
          Send Message
        </button>
        {isSmsSuccessful && <p>Message sent to {smsNumber}</p>}
      </div>

      {/* whatsapp */}
      <div>
        <h2>Send Whatsapp Message</h2>
        <input
          type="tel"
          name="number"
          placeholder="Enter Recipient's Number"
          value={whatsappNumber}
          onChange={({ target }) => {
            setWhatsappNumber(target.value);
          }}
        />
        <input
          type="text"
          name="msg"
          placeholder="Enter Text Message"
          value={whatsappText}
          onChange={({ target }) => {
            setWhatsappText(target.value);
          }}
        />
        <button
          type="button"
          className="button-2"
          onClick={(event) => {
            event.preventDefault();
            sendWhatsappMsg();
          }}
        >
          Send Message
        </button>
        {isWhatsappSuccessful && <p>Message sent to {whatsappNumber}</p>}
      </div>
    </div>
  );
};

export default App;
