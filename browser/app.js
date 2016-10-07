var socket = io(window.location.origin);


socket.on("connect", function (){
  console.log("I have made a persistent two-way connection to the server!");
})

// whiteboard.on("draw", console.log);

whiteboard.on("draw", function(start, end, strokeColor){
  socket.emit("sentData", start, end, strokeColor);

});

socket.on("broadcastData", function(start, end, strokeColor) {
  whiteboard.draw(start, end, strokeColor, 0);

})
