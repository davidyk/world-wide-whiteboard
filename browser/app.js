var socket = io(window.location.origin);

whiteboard.on("draw", console.log);

socket.on("connect", function (){
  console.log("I have made a persistent two-way connection to the server!");
})
