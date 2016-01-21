module.exports = {
	socket: function (socket) {
		socket.setMaxListeners(20); 
		console.log('a user connected');

	}
}