/** @type {import("socket.io").Server} */
const socket = io();

const MAX_MESSAGE_LEN = 2048;

document.addEventListener("DOMContentLoaded", () => {
  socket.emit("waiting");
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    socket.emit("skip");
  }
});

/** @type {HTMLTextAreaElement} */
const input = document.getElementById("message-composer__textarea");

input.addEventListener("input", () => {
  if (input.value.length >= MAX_MESSAGE_LEN) {
    input.value = input.value.slice(0, MAX_MESSAGE_LEN);
  }
});

/** @type {HTMLFormElement} */
const form = document.getElementById("message-composer__form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const message = input.value.trim();

  if (message) {
    socket.emit("message", message);
  }

  form.reset();
});

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    form.requestSubmit();
  }
});

/** @type {HTMLDivElement} */
const messageContainer = document.getElementById("message-container");

/** @type {HTMLUListElement} */
const messageList = document.getElementById("message__list");

const sendSystemMessage = (text) => {
  const systemMessage = document.getElementById("system--message");

  if (systemMessage) {
    systemMessage.textContent = text;
  } else {
    const listItem = document.createElement("li");
    const waitingMessage = document.createElement("p");

    waitingMessage.id = "system--message";
    waitingMessage.classList.add("message--system");
    waitingMessage.textContent = text;
    listItem.appendChild(waitingMessage);
    messageList.appendChild(listItem);
  }
};

const skipButton = document.getElementById("message-composer__skip");

skipButton.addEventListener("click", () => {
  socket.emit("skip");
});

/** @type {HTMLButtonElement} */
const newChat = document.getElementById("new-chat");
const newChatButton = document.getElementById("new-chat__btn");

socket.on("waiting", () => {
  sendSystemMessage("Aguardando um usuário disponível...");
  newChat.hidden = true;
  newChatButton.hidden = true;
});

newChatButton.addEventListener("click", () => {
  newChat.hidden = true;
  newChatButton.hidden = true;
  messageList.replaceChildren();
  socket.emit("waiting");
});

socket.on("skip", () => {
  const inputs = document.querySelectorAll("#message-composer :enabled");

  newChat.hidden = false;
  newChatButton.hidden = false;
  inputs.forEach((el) => (el.disabled = true));
  sendSystemMessage("O usuário saiu da conversa.");
});

socket.on("match", () => {
  newChat.hidden = true;
  newChatButton.hidden = true;
  messageList.replaceChildren();

  /** @type {NodeListOf<HTMLButtonElement>} */
  const inputs = document.querySelectorAll("#message-composer :disabled");
  inputs.forEach((el) => (el.disabled = false));
  sendSystemMessage("Um estranho se conectou");
});

socket.on("message", (data) => {
  const messageElement = document.createElement("p");
  const liElement = document.createElement("li");

  messageElement.classList.add(
    data.id === socket.id ? "message__bubble" : "message__bubble--otherside",
  );
  liElement.classList.add("message__item");

  messageElement.textContent = data.text;

  liElement.appendChild(messageElement);
  messageList.appendChild(liElement);

  messageContainer.scrollTop = messageContainer.scrollHeight;
});
