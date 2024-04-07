// Referencias HTML
const lblEscritorio = document.querySelector('h1');
const btnAtender = document.querySelector('button');
const atendiendo = document.querySelector('small');
const lblPendientes = document.querySelector('#lblPendientes');

// Tomo parametro de la url actual
const searchParams = new URLSearchParams(window.location.search);

// Verifico que en la url venga el parametro escritorio
if (!searchParams.has('escritorio')) {
  window.location = 'index.html';
  throw new Error('El escritorio es obligatorio');
}

// Obtengo informacion del escritorio
const escritorio = searchParams.get('escritorio');

// Asignamos el escritorio al DOM
lblEscritorio.innerText = escritorio.replace('e', 'E');

const socket = io();

socket.on('connect', () => {
  btnAtender.disabled = false;
});

socket.on('disconnect', () => {
  btnAtender.disabled = true;
});

// Recibo desde el server el ultimo ticket
socket.on('escritorio-actual', ultimo => {
  atendiendo.innerText = 'Ticket ' + ultimo;
});

btnAtender.addEventListener('click', () => {
  //   socket.emit('siguente-ticket', null, ticket => {
  //     lblNuevoTicket.innerText = ticket;
  //   });
});
