const socket = io();

const addButton = document.querySelector("#addButton");
const inputField = document.querySelector("#notificationContent")

function render(content, sender, time) {
    var node = document.createElement("div");

    var senderNode = document.createElement("div");
    var senderText = document.createTextNode(sender);
    senderNode.appendChild(senderText);

    var messageNode = document.createElement("div");
    var messageText = document.createTextNode(content);
    messageNode.appendChild(messageText);

    var timeNode = document.createElement("div");
    var timeText = document.createTextNode(time);
    timeNode.appendChild(timeText);

    node.appendChild(senderNode);
    node.appendChild(messageNode);
    node.appendChild(timeNode);

    document.querySelector("#notifications").appendChild(node);
}

const user = {
    _id: "5f1bfd7a013be81930ab9a67",
    userName: "r",
    email: "r"
}



addButton.addEventListener("click", (e) => {

    if (!inputField.value) return;

    inputField.value = null;
})


socket.emit("connected", user._id)
socket.on("pushNotifications", (notifications) => {
    notifications.forEach((item) => {
        console.log(notifications.content)
    })
})


