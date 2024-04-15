const TicketsControl = require('../models/tickets');

const ticketControl = new TicketsControl();

const socketController = socket => {
  // Emito el ultimo ticket hacia el front
  socket.emit('ultimo-ticket', ticketControl.ultimo);

  // Emito los 4 ultimos tickets. broadcast para ver en todas las pantallas
  socket.emit('estado-actual', ticketControl.ultimos4);

  // Emito la Cantidad de tickets pendientes hacia el front
  socket.emit('tickets-pendientes', ticketControl.tickets.length);

  socket.on('siguente-ticket', (payload, callback) => {
    const siguente = ticketControl.siguiente();
    callback(siguente);

    socket.broadcast.emit('tickets-pendientes', ticketControl.tickets.length);
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

    socket.broadcast.emit('estado-actual', ticketControl.ultimos4);
    socket.emit('tickets-pendientes', ticketControl.tickets.length);
    socket.broadcast.emit('tickets-pendientes', ticketControl.tickets.length);

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
