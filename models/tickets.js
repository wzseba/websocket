const path = require('path');
const fs = require('fs');

// Clase para armar un ticket
class Ticket {
  constructor(numero, escritorio) {
    (this.numero = numero), (this.escritorio = escritorio);
  }
}

// Clase para el manejo de tickets
class TicketsControl {
  constructor() {
    this.ultimo = 0;
    this.hoy = new Date().getDate();
    this.tickets = [];
    this.ultimos4 = [];

    this.init();
  }

  get toJson() {
    // Propiedades que voy a grabar
    return {
      ultimo: this.ultimo,
      hoy: this.hoy,
      tickets: this.tickets,
      ultimos: this.ultimos4,
    };
  }

  init() {
    const { hoy, tickets, ultimo, ultimos4 } = require('../db/tickets.json');

    if (hoy === this.hoy) {
      this.tickets = tickets;
      this.ultimo = ultimo;
      this.ultimos4 = ultimos4;
    } else {
      this.guardarDB();
    }
  }

  guardarDB() {
    const dbPath = path.join(__dirname, '../db/tickets.json');
    fs.writeFileSync(dbPath, JSON.stringify(this.toJson));
  }

  siguiente() {
    // Construir nuevo ticket
    this.ultimo += 1;
    const ticket = new Ticket(this.ultimo, null);
    this.tickets.push(ticket);

    this.guardarDB();
    return 'Ticket ' + ticket.numero;
  }

  atenderTicket(escritorio) {
    // Si no hay hay tickets
    if (this.tickets.length === 0) return null;

    // Del arreglo saco el primer ticket, this.tickets[0]
    const ticket = this.tickets.shift();

    // Asigno el escritorio al ticket
    ticket.escritorio = escritorio;

    // Agrego el ticket al arreglo de 4 elementos que son los que se muestran en pantalla
    this.ultimos4.unshift(ticket);

    // Validar que siempre sean 4 tickets
    if (this.ultimos4 > 4) {
      // Elimino el ultimo elemento
      this.ultimos4.splice(-1, 1);
    }
  }
}

module.exports = TicketsControl;
