const TicketsControl = require('../models/tickets');

const ticketControl = new TicketsControl();

const socketController = socket => {
  // Emito el ultimo ticket hacia el front
  socket.emit('ultimo-ticket', ticketControl.ultimo);

  socket.on('siguente-ticket', (payload, callback) => {
    const siguente = ticketControl.siguiente();
    callback(siguente);

    // Notificar que hay ticket pendiente
  });
};

module.exports = {
  socketController,
};
