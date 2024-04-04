const TicketsControl = require('../models/tickets');

const ticket = new TicketsControl();

const socketController = socket => {
  console.log('cliente conectado', socket.id);
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('enviar-mensaje', (payload, cb) => {
    const id = '123seba';
    // if (!cb) return;
    cb(id);
    socket.broadcast.emit('enviar-mensaje', payload);
  });
};

module.exports = {
  socketController,
};
