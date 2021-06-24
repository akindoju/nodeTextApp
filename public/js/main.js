const numberInput = document.getElementById("number");
const textInput = document.getElementById("msg");
const button = document.getElementById("button");
const response = document.querySelector(".response");

const send = () => {
  const number = numberInput.value.replace(/\D/g, ""); //replacing non-numeric characters
  const text = textInput.value;

  fetch("/", {
    method: "post",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ number: number, text: text }),
  })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

button.addEventListener("click", send, false);

const socket = io();

socket.on("smsStatus", (data) => {
  response.innerHTML = "<h5> Text Message sent to " + data.number + "</h5>";
});
