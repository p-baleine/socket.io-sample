(function() {

var socket = io.connect('http://localhost:3000')
  , messages = [];

function updateMessages() {
  $('#message-container').html(messages.join('<br />'));
}

function sendMessage(message) {
  socket.emit('message', { message: message });
}

socket.on('new-message', function (data) {
  messages.push(data.message);
  updateMessages();
});

$(function() {
  $('#new-message').keypress(function(ev) {
    var msg = $(this).val();

    if ((ev.which && ev.which === 13) || (ev.keyCode && ev.keyCode === 13)) {
      messages.push(msg);
      sendMessage(msg);
      updateMessages();
    }
  });

});

}());
