document.addEventListener("DOMContentLoaded", function () {
    const productos = [
        { id: 1, nombre: 'Fideos al pesto', precio: 2700 },
        { id: 2, nombre: 'Bife de chorizo con pure ', precio: 3500 },
        { id: 3, nombre: 'Milanesas con papas fritas', precio: 3000 }
    ];

    const productosContainer = document.getElementById('productos');
    const carritoLista = document.getElementById('carrito-lista');
    const totalElemento = document.getElementById('total');

    function renderizarProductos() {
        productosContainer.innerHTML = '';
        productos.forEach(producto => {
            const li = document.createElement('li');
            li.innerHTML = `
        ${producto.nombre} - $${producto.precio.toFixed(2)}
        <button onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
        `;
            productosContainer.appendChild(li);
        });
    }

    window.agregarAlCarrito = function (productoId) {
        const producto = productos.find(p => p.id === productoId);

        if (producto) {
            carrito.push(producto);
            localStorage.setItem('carrito', JSON.stringify(carrito));
            renderizarCarrito();
        }
    };

    window.quitarDelCarrito = function (productoId) {
        const index = carrito.findIndex(p => p.id === productoId);

        if (index !== -1) {
            carrito.splice(index, 1);
            localStorage.setItem('carrito', JSON.stringify(carrito));
            renderizarCarrito();
        }
    };

    function renderizarCarrito() {
        carritoLista.innerHTML = '';
        let total = 0;

        carrito.forEach(producto => {
            const li = document.createElement('li');
            li.innerHTML = `
            ${producto.nombre} - $${producto.precio.toFixed(2)}
            <button onclick="quitarDelCarrito(${producto.id})">Quitar del carrito</button>
        `;
            carritoLista.appendChild(li);
            total += producto.precio;
        });

        totalElemento.textContent = total.toFixed(2);
    }

    const carritoJSON = localStorage.getItem('carrito');
    const carrito = carritoJSON ? JSON.parse(carritoJSON) : [];

    renderizarProductos();
    renderizarCarrito();
});