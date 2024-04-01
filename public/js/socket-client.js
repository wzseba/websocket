//referencias html
const online = document.querySelector('#on');
const offline = document.querySelector('#off');
const msg = document.querySelector('#msg');
const btnEnviar = document.querySelector('#btnEnviar');
const socket = io();

socket.on('connect', () => {
  offline.style.display = 'none';
  online.style.display = '';
});

socket.on('disconnect', () => {
  offline.style.display = '';
  online.style.display = 'none';
});

socket.on('enviar-mensaje', payload => {
  console.log(payload);
});

btnEnviar.addEventListener('click', () => {
  const mensaje = msg.value;
  const payload = {
    mensaje,
    id: '123abc',
    fecha: new Date().toUTCString(),
  };
  socket.emit('enviar-mensaje', payload, id => {
    console.log('server', id);
  });
});
