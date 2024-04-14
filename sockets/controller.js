const TicketsControl = require('../models/tickets');

const ticketControl = new TicketsControl();

const socketController = socket => {
  // Emito el ultimo ticket hacia el front
  socket.emit('ultimo-ticket', ticketControl.ultimo);

  // Emito los 4 ultimos tickets
  socket.emit('estado-actual', ticketControl.ultimos4);

  socket.on('siguente-ticket', (payload, callback) => {
    const siguente = ticketControl.siguiente();
    callback(siguente);

    // Notificar que hay ticket pendiente
  });

  socket.on('atender-ticket', ({ escritorio }, callback) => {
    // Validar que haya escritorio
    if (!escritorio) {
      callback({
        ok: false,
        msg: 'Escritorio obligatorio',
      });
    }

    // Ticket que tengo que atender
    const ticket = ticketControl.atenderTicket(escritorio);

    // Validar que haya ticket
    if (!ticket) {
      callback({
        ok: false,
        msg: 'No hay ticket',
      });
    } else {
      callback({
        ok: true,
        ticket,
      });
    }
  });
};

module.exports = {
  socketController,
};
