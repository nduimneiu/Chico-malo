// PRODUCTOS
const productos = [
    {
        nombre: "iPhone 15 Pro",
        precio: 999,
        img: "/mnt/data/0906006f-3198-4b68-89fd-3f334c29ed61.png"
    },
    {
        nombre: "Samsung Galaxy A54",
        precio: 399,
        img: "/mnt/data/4fcbb415-fda8-4947-a4c4-b3b2b5881c9f.png"
    },
    {
        nombre: "Xiaomi Redmi Note 13",
        precio: 299,
        img: "/mnt/data/cbadce23-510f-42c9-98fe-1401f88303e8.png"
    },
    {
        nombre: "Auriculares Bluetooth",
        precio: 25,
        img: "/mnt/data/e3c28cf1-6a55-4182-bb02-7e30c312f3ac.png"
    },
    {
        nombre: "Smartwatch Deportivo",
        precio: 39,
        img: "/mnt/data/3048bd41-838e-4304-96cd-8765e65bcbb5.png"
    }
];

// LOCALSTORAGE
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// MOSTRAR PRODUCTOS
const contenedor = document.getElementById("productos");

function mostrarProductos(lista) {
    contenedor.innerHTML = "";
    lista.forEach((p, index) => {
        const card = document.createElement("div");
        card.className = "producto";

        card.innerHTML = `
            <img src="${p.img}" alt="${p.nombre}">
            <h3>${p.nombre}</h3>
            <p>Precio: $${p.precio}</p>
            <button class="add-btn">Agregar al Carrito</button>
        `;

        // Animación
        card.querySelector(".add-btn").addEventListener("click", () => {
            agregarCarrito(index);
            card.classList.add("agregado");
            setTimeout(() => card.classList.remove("agregado"), 400);
        });

        contenedor.appendChild(card);
    });
}

mostrarProductos(productos);

// BUSCADOR
document.getElementById("buscador").addEventListener("input", e => {
    const texto = e.target.value.toLowerCase();
    const filtrados = productos.filter(p =>
        p.nombre.toLowerCase().includes(texto)
    );
    mostrarProductos(filtrados);
});

// AGREGAR AL CARRITO
function agregarCarrito(index) {
    const p = productos[index];
    const item = carrito.find(i => i.nombre === p.nombre);

    if (item) {
        item.cantidad += 1;
    } else {
        carrito.push({ ...p, cantidad: 1 });
    }

    guardarCarrito();
    mostrarCarrito();
}

// GUARDAR
function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// MOSTRAR CARRITO
function mostrarCarrito() {
    const lista = document.getElementById("carritoLista");
    const total = document.getElementById("total");

    lista.innerHTML = "";
    let suma = 0;

    carrito.forEach((item, i) => {
        suma += item.precio * item.cantidad;

        lista.innerHTML += `
            <div class="carrito-item">
                <div class="item-controls">
                    <strong>${item.nombre}</strong><br>
                    Cantidad: ${item.cantidad}
                    <div>
                        <button class="q-btn" onclick="cambiarCantidad(${i}, 1)">+</button>
                        <button class="q-btn" onclick="cambiarCantidad(${i}, -1)">-</button>
                        <button class="delete-btn" onclick="eliminar(${i})">X</button>
                    </div>
                </div>
                Precio: $${item.precio * item.cantidad}
            </div>`;
    });

    total.innerHTML = `<strong>Total: $${suma}</strong>`;
}

mostrarCarrito();

// CAMBIO DE CANTIDAD
function cambiarCantidad(i, op) {
    carrito[i].cantidad += op;
    if (carrito[i].cantidad <= 0) carrito.splice(i, 1);
    guardarCarrito();
    mostrarCarrito();
}

// ELIMINAR PRODUCTO
function eliminar(i) {
    carrito.splice(i, 1);
    guardarCarrito();
    mostrarCarrito();
}

// MODO OSCURO
const toggle = document.getElementById("toggleTheme");
toggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    toggle.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
});

mostrarCarrito();
