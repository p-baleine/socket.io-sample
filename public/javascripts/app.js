(function() {

var socket = io.connect('http://localhost:3000')
  , news = ''
  , messages = [];

function updateMessages() {
  $('#message-container').html(messages.join('<br />'));
}

function sendMessage(message) {
  socket.emit('message', { message: message });
}

socket.on('new-message', function (data) {
  console.log(data);
  messages.push(data.message);
  updateMessages();
});

$(function() {
  $('#new-message').keypress(function(ev) {
		if ((ev.which && ev.which === 13) || (ev.keyCode && ev.keyCode === 13)) {
      sendMessage($(this).val());
    }
	});

});

}());
