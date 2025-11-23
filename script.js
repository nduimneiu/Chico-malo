// Productos
const productos = [
    {
        nombre: "iPhone 15 Pro",
        precio: 999,
        img: "https://i.imgur.com/2JYj5qs.png"
    },
    {
        nombre: "Samsung Galaxy A54",
        precio: 399,
        img: "https://i.imgur.com/i7zF2v3.png"
    },
    {
        nombre: "Xiaomi Redmi Note 13",
        precio: 299,
        img: "https://i.imgur.com/IX1jgAq.png"
    },
    {
        nombre: "Auriculares Bluetooth",
        precio: 25,
        img: "https://i.imgur.com/SB3xAQL.png"
    },
    {
        nombre: "Smartwatch Deportivo",
        precio: 39,
        img: "https://i.imgur.com/vIYwFDa.png"
    }
];

// Cargar carrito desde LocalStorage
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Mostrar productos
const contenedor = document.getElementById("productos");

function mostrarProductos(lista) {
    contenedor.innerHTML = "";
    lista.forEach((p, index) => {
        contenedor.innerHTML += `
        <div class="producto">
            <img src="${p.img}" alt="${p.nombre}">
            <h3>${p.nombre}</h3>
            <p>Precio: $${p.precio}</p>
            <button onclick="agregarCarrito(${index})">Agregar al Carrito</button>
        </div>`;
    });
}

mostrarProductos(productos);

// Buscador en tiempo real
document.getElementById("buscador").addEventListener("input", e => {
    const texto = e.target.value.toLowerCase();
    const filtrados = productos.filter(p =>
        p.nombre.toLowerCase().includes(texto)
    );
    mostrarProductos(filtrados);
});

// Agregar al carrito
function agregarCarrito(index) {
    carrito.push(productos[index]);
    guardarCarrito();
    mostrarCarrito();
}

// Guardar en localStorage
function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Mostrar carrito
function mostrarCarrito() {
    const lista = document.getElementById("carritoLista");
    const total = document.getElementById("total");

    lista.innerHTML = "";
    let suma = 0;

    carrito.forEach(item => {
        lista.innerHTML += `
        <div class="carrito-item">
            ${item.nombre} - $${item.precio}
        </div>`;
        suma += item.precio;
    });

    total.innerHTML = `<strong>Total: $${suma}</strong>`;
}

mostrarCarrito();
