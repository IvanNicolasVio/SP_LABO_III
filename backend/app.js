const cors = require('cors'); // Importa el paquete cors
const express = require('express');
const app = express();
const port = 3000;
app.use(cors()); // Habilita CORS para todas las rutas
app.use(express.json());

let items = [
    {
      id: 1,
      nombre: "Bitcoin",
      simbolo: "BTC",
      fechaCreacion: "2009-01-03",
      precioActual: 35000,
      consenso: "prueba de trabajo",
      cantidadCirculacion: 18600000,
      algoritmo: "sha-256",
      sitioWeb: "https://bitcoin.org",
    },
    {
      id: 2,
      nombre: "Ethereum",
      simbolo: "ETH",
      fechaCreacion: "2015-07-30",
      precioActual: 2500,
      consenso: "prueba de participación",
      cantidadCirculacion: 115000000,
      algoritmo: "ethash",
      sitioWeb: "https://ethereum.org",
    },
    {
      id: 3,
      nombre: "Cardano",
      simbolo: "ADA",
      fechaCreacion: "2017-09-29",
      precioActual: 1.5,
      consenso: "prueba de participación",
      cantidadCirculacion: 32000000000,
      algoritmo: "ouroboros",
      sitioWeb: "https://cardano.org",
    },
    {
      id: 4,
      nombre: "Ripple",
      simbolo: "XRP",
      fechaCreacion: "2012-02-02",
      precioActual: 0.6,
      consenso: "acuerdo de consenso",
      cantidadCirculacion: 100000000000,
      algoritmo: "ripple protocol",
      sitioWeb: "https://ripple.com",
    },
    {
      id: 5,
      nombre: "Litecoin",
      simbolo: "LTC",
      fechaCreacion: "2011-10-13",
      precioActual: 150,
      consenso: "prueba de trabajo",
      cantidadCirculacion: 66000000,
      algoritmo: "scrypt",
      sitioWeb: "https://litecoin.org",
    },
  ];



// Middleware para simular una demora de 3 segundos
const simulateDelay = (req, res, next) => {
    setTimeout(next, 500);
};

/**
 * Obtiene todos los items
 */
app.get('/monedas', simulateDelay, (req, res) => {
    if (items.length === 0) {
        res.json([]);
    } else {
        res.json(items);
    }
});

/**
 * Crea una nuevo item
 */
app.post('/monedas', simulateDelay, (req, res) => {
    const nuevaCrypto = req.body;
    nuevaCrypto.id = obtenerNuevoID(items);
    items.push(nuevaCrypto);
    res.status(200).json(nuevaCrypto);
});

/**
 * Obtiene item por ID
 */
app.get('/monedas/:id', simulateDelay, (req, res) => {
    const id = parseInt(req.params.id);
    const crypto = items.find(p => p.id === id);
    if (crypto) {
        res.json(crypto);
    } else {
        res.status(404).send('crypto no encontrada');
    }
});

/**
 * Edita item por ID
 */
app.put('/monedas/:id', simulateDelay, (req, res) => {
    const id = parseInt(req.params.id);
    const index = items.findIndex(crypto => crypto.id === id);
    if (index !== -1) {
        const newObj = {
            id: id,
            ...req.body,
            fechaCreacion: items[index].fechaCreacion
        };
        items[index] = newObj;
        res.json(newObj);
    } else {
        res.status(404).send('crypto no encontrada');
    }
});

/**
 * Elimina item por ID
 */
app.delete('/monedas/:id', simulateDelay, (req, res) => {
    const id = parseInt(req.params.id);
    const index = items.findIndex(crypto => crypto.id === id);
    if (index !== -1) {
        items.splice(index, 1);
        res.status(200).send();
    } else {
        res.status(404).send('crypto no encontrada');
    }
});

/**
 * Elimina todas los item
 */
app.delete('/monedas', simulateDelay, (req, res) => {
    items = [];
    res.status(200).send('Todas las crypto han sido eliminadas');
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});



function obtenerNuevoID(items) {
    if (items.length === 0) {
      return 0;
    } else {
      var maxId = Math.max(...items.map(crypto => crypto.id));
      return maxId + 1;
    }
}