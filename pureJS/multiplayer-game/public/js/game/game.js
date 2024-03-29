let socket = io();

let canvas = document.getElementById("canvas");
canvas.width = 800;
canvas.height = 600;
let ctx = canvas.getContext("2d");

movement = {
    up: false,
    down: false,
    left: false,
    right: false,
};

document.addEventListener("keydown", function (event) {
    switch (event.keyCode) {
        case 65: // A
            movement.left = true;
            break;
        case 87: // W
            movement.up = true;
            break;
        case 68: // D
            movement.right = true;
            break;
        case 83: // S
            movement.down = true;
            break;
    }
});

document.addEventListener("keyup", function (event) {
    switch (event.keyCode) {
        case 65: // A
            movement.left = false;
            break;
        case 87: // W
            movement.up = false;
            break;
        case 68: // D
            movement.right = false;
            break;
        case 83: // S
            movement.down = false;
            break;
    }
});

socket.emit("new player");

setInterval(function () {
    socket.emit("movement", movement);
}, 1000 / 60);

socket.on("state", function (players) {
    ctx.clearRect(0, 0, 800, 600);
    ctx.fillStyle = "green";

    for (let id in players) {
        let player = players[id];

        ctx.beginPath();
        ctx.arc(player.x, player.y, 10, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
        // console.log(players);
    }
});
