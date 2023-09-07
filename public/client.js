const socket = io();

const productForm = document.getElementById('product-form');

productForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const producto = {
    nombre: document.getElementById('nombre').value,
    precio: parseFloat(document.getElementById('precio').value),
  };

  socket.emit('nuevoProducto', producto);
});

socket.on('productoAgregado', (producto) => {
  const listaProductos = document.getElementById('lista-productos');
  const nuevoProducto = document.createElement('li');
  nuevoProducto.innerText = `Nombre: ${producto.nombre}, Precio: $${producto.precio}`;
  listaProductos.appendChild(nuevoProducto);
});
