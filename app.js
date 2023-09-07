const express = require('express');
const exphbs = require('express-handlebars');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const expressHbs = require('express-handlebars');

app.engine('handlebars', expressHbs.engine({
    layoutsDir: 'views/layouts/',
    defaultLayout: null,
    extname: 'handlebars'
  })
);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

const productosData = JSON.parse(fs.readFileSync('products.json', 'utf8'));

const productos = [];

app.get('/', (req, res) => {
  res.render('home', { productos: productosData });
});

app.get('/realtimeproducts', (req, res) => {
  res.render('realTimeProducts', { productos });
});

io.on('connection', (socket) => {
  console.log('Usuario conectado');

  socket.on('nuevoProducto', (producto) => {
    productos.push(producto);
    io.emit('productoAgregado', producto);
  });

  socket.on('disconnect', () => {
    console.log('Usuario desconectado');
  });
});

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

module.exports = app;